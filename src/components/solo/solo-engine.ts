/**
 * Solo: a particle-mesh treeing coonhound that trots across the page.
 *
 * Ported from the Claude Design handoff (`solo.js`). The skeleton, particle
 * model, spring physics and rendering are the handoff's, unchanged. What is
 * added here: pointer awareness. The dog bolts away from a mouse that comes
 * near, and dissolves to the far side of the viewport when it is cornered.
 *
 * The host element the caller passes in must ignore pointer events; the dog is
 * unclickable because nothing on this layer receives clicks at all.
 */

const TAU = Math.PI * 2;
const PI = Math.PI;
/** Model length, tail tip to nose, in model units. */
const UNITS = 118;

type Bone = [number, number, number, number];
type Skeleton = Record<string, Bone>;

type Particle = {
  part: string;
  u: number;
  v: number;
  depth: number;
  size: number;
  tw: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type Edge = [number, number, number];

export type SoloOptions = {
  /** Hex colour of the swarm. */
  color?: string;
  /** Nose-to-tail length in px. */
  size?: number;
  /** Trot speed in px/s. */
  speed?: number;
  /** Particle multiplier, 0.5 to 2. */
  density?: number;
  /** Px from the bottom of the host to the paws. */
  bottom?: number;
  /** Multiplier applied to `speed` while fleeing the pointer. */
  fleeFactor?: number;
};

export type SoloHandle = {
  /** Pointer position in host-relative px, or null when the pointer is away. */
  setPointer: (x: number, y: number) => void;
  clearPointer: () => void;
  remove: () => void;
};

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Forward kinematics for one leg: returns [upper, lower, paw] bones. */
function legFK(
  jx: number,
  jy: number,
  L1: number,
  L2: number,
  L3: number,
  phi: number,
  hind: boolean,
): [Bone, Bone, Bone] {
  const lift = Math.max(0, Math.sin(phi + 0.5));
  let t1: number, t2: number, t3: number;
  if (!hind) {
    t1 = 0.55 * Math.sin(phi);
    t2 = t1 - 1.0 * lift;
    t3 = t2 + 0.9 + 0.6 * lift;
  } else {
    t1 = 0.2 + 0.5 * Math.sin(phi);
    t2 = t1 - 0.55 - 0.9 * lift;
    t3 = t2 + 1.1 + 0.5 * lift;
  }
  const kx = jx + L1 * Math.sin(t1),
    ky = jy + L1 * Math.cos(t1);
  const wx = kx + L2 * Math.sin(t2),
    wy = ky + L2 * Math.cos(t2);
  const px = wx + L3 * Math.sin(t3),
    py = wy + L3 * Math.cos(t3);
  return [
    [jx, jy, kx, ky],
    [kx, ky, wx, wy],
    [wx, wy, px, py],
  ];
}

/** Skeleton pose. Model space: dog faces +x, y down, ground at y = 0. */
function pose(phi: number, t: number): Skeleton {
  const bob = 1.1 * Math.sin(2 * phi);
  const hb = 0.7 * Math.sin(2 * phi + 1);
  const B: Skeleton = {};
  B.body = [-28, -40 + bob, 22, -37 + bob];
  B.neck = [18, -42 + bob, 38, -60 + bob];
  B.head = [36, -64 + bob + hb, 50, -62 + bob + hb];
  B.muzzle = [48, -62 + bob + hb, 60, -58.5 + bob + hb];
  B.ear = [
    41,
    -69 + bob + hb,
    33 + 1.8 * Math.sin(2 * phi + 0.5),
    -56 + bob + hb + 1.2 * Math.sin(2 * phi + 1.5),
  ];
  let tx = -31,
    ty = -44 + bob,
    ang = -PI * 0.94 + 0.16 * Math.sin(3 * phi + t * 0.7);
  for (let i = 0; i < 3; i++) {
    const nx = tx + 8 * Math.cos(ang),
      ny = ty + 8 * Math.sin(ang);
    B["tail" + i] = [tx, ty, nx, ny];
    tx = nx;
    ty = ny;
    ang += 0.3;
  }
  const fn = legFK(16, -32 + bob, 15, 15, 5, phi, false);
  const hn = legFK(-24, -32 + bob, 15, 14, 6, phi + PI, true);
  const ff = legFK(13, -33 + bob, 15, 15, 5, phi + PI, false);
  const hf = legFK(-27, -33 + bob, 15, 14, 6, phi, true);
  B.fnU = fn[0];
  B.fnL = fn[1];
  B.fnP = fn[2];
  B.hnU = hn[0];
  B.hnL = hn[1];
  B.hnP = hn[2];
  B.ffU = ff[0];
  B.ffL = ff[1];
  B.ffP = ff[2];
  B.hfU = hf[0];
  B.hfL = hf[1];
  B.hfP = hf[2];
  return B;
}

/** [bone, r0, r1, count, depth] */
const PARTS: [string, number, number, number, number][] = [
  ["ffU", 4, 3, 12, 0.45],
  ["ffL", 3, 2.2, 10, 0.45],
  ["ffP", 2.5, 2, 6, 0.45],
  ["hfU", 4.5, 3, 12, 0.45],
  ["hfL", 3, 2.2, 10, 0.45],
  ["hfP", 2.5, 2, 6, 0.45],
  ["body", 12, 14.5, 110, 1],
  ["neck", 7, 6, 28, 1],
  ["head", 8, 7, 36, 1],
  ["muzzle", 4.5, 3, 20, 1],
  ["ear", 3.5, 3, 16, 1],
  ["tail0", 2.8, 2.2, 9, 1],
  ["tail1", 2.2, 1.6, 8, 1],
  ["tail2", 1.6, 1, 7, 1],
  ["fnU", 4, 3, 14, 1],
  ["fnL", 3, 2.2, 12, 1],
  ["fnP", 2.5, 2, 8, 1],
  ["hnU", 4.5, 3, 14, 1],
  ["hnL", 3, 2.2, 12, 1],
  ["hnP", 2.5, 2, 8, 1],
];

function bonePoint(b: Bone, u: number, v: number): [number, number] {
  const dx = b[2] - b[0],
    dy = b[3] - b[1],
    L = Math.hypot(dx, dy) || 1;
  return [b[0] + dx * u - (dy / L) * v, b[1] + dy * u + (dx / L) * v];
}

function buildModel(density: number): { pts: Particle[]; edges: Edge[] } {
  const rand = rng(7);
  const pts: Particle[] = [];
  PARTS.forEach((P) => {
    const n = Math.max(3, Math.round(P[3] * density));
    for (let i = 0; i < n; i++) {
      const u = -0.1 + rand() * 1.2;
      const r = P[1] + (P[2] - P[1]) * Math.min(1, Math.max(0, u));
      const cap =
        u < 0
          ? Math.sqrt(Math.max(0, 1 - (u / 0.1) * (u / 0.1)))
          : u > 1
            ? Math.sqrt(Math.max(0, 1 - ((u - 1) / 0.1) * ((u - 1) / 0.1)))
            : 1;
      const v = (rand() < 0.5 ? -1 : 1) * Math.sqrt(rand()) * r * cap;
      pts.push({
        part: P[0],
        u,
        v,
        depth: P[4],
        size: 1,
        tw: rand() * TAU,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
      });
    }
  });
  // eye
  pts.push({ part: "head", u: 0.7, v: -2.2, depth: 1, size: 2.4, tw: 0, x: 0, y: 0, vx: 0, vy: 0 });
  // nose
  pts.push({ part: "muzzle", u: 1.02, v: -0.5, depth: 1, size: 2.2, tw: 1, x: 0, y: 0, vx: 0, vy: 0 });

  // Rest-pose neighbours give stable mesh edges.
  const B = pose(0, 0);
  const rest = pts.map((q) => bonePoint(B[q.part], q.u, q.v));
  const edges: Edge[] = [];
  const seen: Record<number, 1> = {};
  for (let i = 0; i < pts.length; i++) {
    const cand: [number, number][] = [];
    for (let j = 0; j < pts.length; j++) {
      if (j === i) continue;
      const d = Math.hypot(rest[i][0] - rest[j][0], rest[i][1] - rest[j][1]);
      if (d < 6.5 && pts[i].depth === pts[j].depth) cand.push([d, j]);
    }
    cand.sort((a, b) => a[0] - b[0]);
    for (let k = 0; k < Math.min(4, cand.length); k++) {
      const j2 = cand[k][1];
      const key = Math.min(i, j2) * 100000 + Math.max(i, j2);
      if (!seen[key]) {
        seen[key] = 1;
        edges.push([i, j2, pts[i].depth]);
      }
    }
  }
  edges.sort((a, b) => a[2] - b[2]);
  // Spawn scattered so the swarm converges on load.
  pts.forEach((q, i) => {
    q.x = rest[i][0] + (rand() - 0.5) * 160;
    q.y = rest[i][1] + (rand() - 0.5) * 160;
  });
  return { pts, edges };
}

/** Threat radius in model units. About 280 px at size 300. */
const THREAT_R = 110;
/** Pointer this close (model units) counts as "on the dog": vanish. */
const CONTACT_R = 34;
/** Seconds of full flight after the last threat, before panic starts to fade. */
const HOLD_SECONDS = 0.8;
/** Seconds for panic to fade once the hold has run out. */
const CALM_SECONDS = 1.1;
/** Seconds after a vanish during which the dog cannot vanish again. */
const VANISH_COOLDOWN = 0.7;

export function mountSolo(host: HTMLElement, options: SoloOptions = {}): SoloHandle {
  const o = {
    color: options.color ?? "#00C2FF",
    size: options.size ?? 300,
    speed: options.speed ?? 140,
    density: options.density ?? 1,
    bottom: options.bottom ?? 24,
    fleeFactor: options.fleeFactor ?? 5,
  };
  const rgb = hexRgb(o.color);
  const col = rgb[0] + "," + rgb[1] + "," + rgb[2];

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none";
  host.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const model = buildModel(o.density);
  const pts = model.pts;
  const edges = model.edges;

  let W = 0,
    H = 0,
    dpr = 1;
  let dir = 1;
  let phi = 0;
  let t = 0;
  let x: number | null = null;
  let last: number | null = null;
  let raf = 0;

  // Pointer state, host-relative px.
  let px: number | null = null,
    py: number | null = null;
  /** 0 = calm trot, 1 = full flight. */
  let panic = 0;
  let panicHold = 0;
  let vanishCooldown = 0;

  const resize = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    const r = host.getBoundingClientRect();
    W = r.width;
    H = r.height;
    canvas.width = Math.max(1, Math.round(W * dpr));
    canvas.height = Math.max(1, Math.round(H * dpr));
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  const burst = (amt: number) => {
    for (const q of pts) {
      q.vx += (Math.random() - 0.5) * amt;
      q.vy += (Math.random() - 0.5) * amt;
    }
  };

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (!W || !H || !ctx) return;
    const dt = last == null ? 1 / 60 : Math.min(0.05, (now - last) / 1000);
    last = now;
    t += dt;

    const s = o.size / UNITS;
    if (x == null) x = -70 * s;
    if (vanishCooldown > 0) vanishCooldown -= dt;

    // --- Flee steering -------------------------------------------------
    // Body centre in host px. The dog faces `dir`, so the body sits a little
    // behind the translate origin and about 38 units above the paws.
    const cx = x + dir * 8 * s;
    const cy = H - o.bottom - 38 * s;
    const margin = 70 * s;
    // Dissolve the swarm and re-form it, calm, at the given wall facing inward.
    const vanishTo = (wall: 1 | -1) => {
      burst(60);
      x = wall > 0 ? W - margin : margin;
      dir = -wall;
      panic = 0;
      panicHold = 0;
      vanishCooldown = VANISH_COOLDOWN;
    };
    let threatened = false;
    if (px != null && py != null) {
      const d = Math.hypot(px - cx, py - cy) / s;
      if (d < THREAT_R) {
        threatened = true;
        const away = px < cx ? 1 : -1;
        if (panic < 0.5) burst(6); // the startle
        panic = 1;
        panicHold = HOLD_SECONDS;
        if (away !== dir) {
          dir = away;
          burst(5);
        }
        // The pointer is on top of the dog: vanish to whichever wall is
        // farther from it.
        if (d < CONTACT_R && vanishCooldown <= 0) vanishTo(px < W / 2 ? 1 : -1);
      }
    }
    if (!threatened && panic > 0) {
      if (panicHold > 0) panicHold -= dt;
      else panic = Math.max(0, panic - dt / CALM_SECONDS);
    }

    const speed = o.speed * (1 + (o.fleeFactor - 1) * panic);

    // --- Travel, turn at edges -------------------------------------------
    x += dir * speed * dt;
    phi += ((dt * speed) / (44 * s)) * TAU;
    const hitRight = dir > 0 && x + 62 * s > W;
    const hitLeft = dir < 0 && x - 62 * s < 0;
    if (hitRight || hitLeft) {
      // A calm dog turns around. A fleeing dog is cornered: turning would run
      // it back at the pointer, so it dissolves to the opposite wall instead.
      if (panic > 0.5 && vanishCooldown <= 0) vanishTo(hitLeft ? 1 : -1);
      else {
        dir = hitRight ? -1 : 1;
        burst(9);
      }
    }

    // --- Particle springs --------------------------------------------------
    const B = pose(phi, t);
    const k = 1 - Math.pow(0.86, dt * 60);
    const damp = Math.pow(0.72, dt * 60);
    for (let i = 0; i < pts.length; i++) {
      const q = pts[i];
      const tp = bonePoint(B[q.part], q.u, q.v);
      q.vx += (tp[0] - q.x) * k;
      q.vy += (tp[1] - q.y) * k;
      q.vx *= damp;
      q.vy *= damp;
      q.x += q.vx + (Math.random() - 0.5) * 0.12;
      q.y += q.vy + (Math.random() - 0.5) * 0.12;
    }

    // --- Draw ----------------------------------------------------------------
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.translate(x, H - o.bottom);
    ctx.scale(dir * s, s);
    ctx.lineCap = "round";

    // mesh edges
    ctx.lineWidth = 1.1 / s;
    let lastD = -1;
    for (let i = 0; i < edges.length; i++) {
      const e = edges[i];
      const a = pts[e[0]],
        b = pts[e[1]];
      if (e[2] !== lastD) {
        if (lastD !== -1) ctx.stroke();
        ctx.beginPath();
        lastD = e[2];
        ctx.strokeStyle = "rgba(" + col + "," + 0.42 * e[2] + ")";
      }
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
    }
    ctx.stroke();

    // matrix flicker: transient long-range links
    ctx.beginPath();
    ctx.strokeStyle = "rgba(" + col + ",0.14)";
    for (let i = 0; i < 7; i++) {
      const a2 = pts[(Math.random() * pts.length) | 0];
      const b2 = pts[(Math.random() * pts.length) | 0];
      if (Math.hypot(a2.x - b2.x, a2.y - b2.y) < 26) {
        ctx.moveTo(a2.x, a2.y);
        ctx.lineTo(b2.x, b2.y);
      }
    }
    ctx.stroke();

    // nodes: soft halo then core
    for (let i = 0; i < pts.length; i++) {
      const q = pts[i];
      const tw = 0.65 + 0.35 * Math.sin(t * 3 + q.tw);
      const r = (1.3 * q.size) / s;
      ctx.fillStyle = "rgba(" + col + "," + 0.1 * q.depth + ")";
      ctx.beginPath();
      ctx.arc(q.x, q.y, r * 3, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "rgba(" + col + "," + 0.95 * q.depth * tw + ")";
      ctx.beginPath();
      ctx.arc(q.x, q.y, r, 0, TAU);
      ctx.fill();
    }
  };
  raf = requestAnimationFrame(frame);

  return {
    setPointer(nx, ny) {
      px = nx;
      py = ny;
    },
    clearPointer() {
      px = null;
      py = null;
    },
    remove() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.remove();
    },
  };
}
