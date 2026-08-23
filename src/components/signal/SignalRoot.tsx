"use client";

import { useLayoutEffect, useRef } from "react";

import { pacing } from "@/lib/signal.config";

/**
 * The one thing that moves the signal.
 *
 * Every part of the system — the trajectory's drawn segments, the Scale
 * sequence's beats, the terminus at Ask Amol, the number echoes below it — is
 * driven from this single rAF-throttled read of `window.scrollY`. That is
 * deliberate: an IntersectionObserver per part would be less code but the
 * parts would each fire on their own schedule, and a node lighting up a frame
 * before or after the line reaches it is exactly the stutter the brief rules
 * out. One clock, one narrative.
 *
 * Nothing here goes through React state. The loop measures once (and on
 * resize), then only writes custom properties and `data-` attributes straight
 * to the DOM. Those feed `stroke-dashoffset`, `opacity` and `transform` and
 * nothing that triggers layout.
 *
 * Progressive enhancement runs the other way round from the usual: the server
 * markup is the *finished* state, fully legible with no JavaScript at all, and
 * this effect is what winds it back to the pre-activation state. It sets
 * `data-signal-motion="on"` to do so, which is also the switch the
 * reduced-motion branch simply never flips. Both interludes sit well below the
 * fold, so the wind-back is never on screen when it happens.
 */
export function SignalRoot({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Reduced motion: leave the markup in its finished state and never start
    // the loop. CSS drops the moving trace and holds the static dim track.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.dataset.signalMotion = "on";

    type Row = { el: HTMLElement; top: number; height: number; last: number };
    type Scale = {
      el: HTMLElement;
      beats: HTMLElement[];
      top: number;
      travel: number;
      last: number;
      lastApproach: number;
    };
    type Echo = { el: HTMLElement; top: number; on: boolean };

    let rows: Row[] = [];
    let terminus: Row | null = null;
    let scale: Scale | null = null;
    let echoes: Echo[] = [];
    let arrived = false;
    let measured = false;
    let frame = 0;

    const clamp = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

    /**
     * Cache document-space geometry. Called on mount and on resize only — the
     * scroll loop must never touch the layout, so it reads nothing but
     * `scrollY` and `innerHeight`.
     */
    function measure() {
      const sy = window.scrollY;

      terminus = null;
      rows = Array.from(
        root!.querySelectorAll<HTMLElement>("[data-signal-row]"),
      ).map((el) => {
        const r = el.getBoundingClientRect();
        const row = { el, top: r.top + sy, height: r.height || 1, last: -1 };
        if (el.hasAttribute("data-signal-terminus")) terminus = row;
        return row;
      });

      const section = root!.querySelector<HTMLElement>("[data-signal-scale]");
      const panel = section?.querySelector<HTMLElement>("[data-signal-panel]");
      if (section && panel) {
        const r = section.getBoundingClientRect();
        // The section is `panel + beats * beat + tail`, so the distance it
        // stays stuck for is `beats * beat + tail`. Progress runs over the
        // beats alone; the tail is the hold on the final beat.
        const stuck = section.offsetHeight - panel.offsetHeight;
        const beatEls = Array.from(
          section.querySelectorAll<HTMLElement>("[data-signal-beat]"),
        );
        const n = beatEls.length;
        scale = {
          el: section,
          beats: beatEls,
          top: r.top + sy,
          travel: Math.max(1, (stuck * n) / (n + pacing.tailRatio)),
          last: -1,
          lastApproach: -1,
        };
      }

      echoes = Array.from(
        root!.querySelectorAll<HTMLElement>("[data-signal-index]"),
      ).map((el) => {
        const r = el.getBoundingClientRect();
        // Only the very first pass winds these back; a resize must not blink
        // an echo that has already fired.
        if (!measured) el.dataset.on = "0";
        return { el, top: r.top + sy, on: el.dataset.on === "1" };
      });

      measured = true;
    }

    function tick() {
      frame = 0;
      const sy = window.scrollY;
      const vh = window.innerHeight;
      const head = sy + vh * pacing.activation;
      const tail = sy + vh * pacing.recede;

      for (const row of rows) {
        const p = clamp((head - row.top) / row.height);
        // Only the stroke write is worth skipping when nothing moved. The
        // state below must not sit inside that guard: p pins at 1 once the row
        // is fully drawn, so anything gated on p changing can never fire
        // afterwards — which is what used to strand the artifact recede.
        if (p !== row.last) {
          row.last = p;
          row.el.style.setProperty("--draw", p.toFixed(4));
        }
        // 0 waiting · 1 active · 2 passed, artifact receding
        const state =
          (tail - row.top) / row.height >= 1 ? "2" : p > 0.02 ? "1" : "0";
        if (row.el.dataset.on !== state) row.el.dataset.on = state;
      }

      if (scale) {
        const p = clamp((sy - scale.top) / scale.travel);
        // How far the panel has risen into view, 0 → 1, finishing exactly as it
        // sticks. The first beat resolves over this instead of over its own
        // scroll window: p is pinned at 0 for the whole approach, so without it
        // a viewport rises through the screen with nothing in it.
        //
        // Which is also why the guard below has to watch both. p not changing
        // is precisely the condition during the approach, so guarding on p
        // alone skipped every frame of it and the figure only appeared once the
        // panel had already stuck.
        const approach = clamp((sy - (scale.top - vh)) / vh);
        if (p !== scale.last || approach !== scale.lastApproach) {
          scale.last = p;
          scale.lastApproach = approach;
          scale.el.style.setProperty("--p", p.toFixed(4));

          const n = scale.beats.length;
          const bp = p * n;
          for (let i = 0; i < n; i++) {
            const lp = bp - i;
            // Enter and exit windows do not overlap between neighbours, so two
            // figures are never on screen together. The gap between them reads
            // as a cut, which is the intent.
            // First and last beats are the boundary cases and mirror each
            // other: the first arrives with the panel, the last leaves with it.
            const enter =
              i === 0
                ? Math.max(clamp(lp / 0.13), clamp((approach - 0.34) / 0.22))
                : clamp(lp / 0.13);
            // The last beat never fades: it has to still be there as the panel
            // releases and the page carries on to Ask Amol.
            const exit = i === n - 1 ? 1 : clamp((1 - lp) / 0.13);
            const wordEnter =
              i === 0
                ? Math.max(
                    clamp((lp - 0.06) / 0.13),
                    clamp((approach - 0.42) / 0.22),
                  )
                : clamp((lp - 0.06) / 0.13);
            const el = scale.beats[i];
            el.style.setProperty("--o", Math.min(enter, exit).toFixed(3));
            el.style.setProperty("--wo", Math.min(wordEnter, exit).toFixed(3));
            el.style.setProperty("--ty", `${((1 - enter) * 16).toFixed(2)}px`);
            el.style.setProperty("--wty", `${((1 - wordEnter) * 12).toFixed(2)}px`);
          }
        }
      }

      // Sections 02 to 04 get a quiet echo as they arrive: number to full
      // opacity, one underline drawn once. Section 01 is skipped here — it is
      // the terminus, and it fills when the line actually reaches it.
      for (let i = 1; i < echoes.length; i++) {
        const echo = echoes[i];
        const on = echo.top < sy + vh * 0.86;
        if (on !== echo.on) {
          echo.on = on;
          echo.el.dataset.on = on ? "1" : "0";
        }
      }

      // The line lands on section 01. That is the whole point of the run, so
      // it is a one-way latch: it never un-fires on scroll back up.
      if (!arrived && terminus && terminus.last >= 0.98) {
        arrived = true;
        root!.dataset.signalArrived = "1";
        if (echoes[0]) {
          echoes[0].on = true;
          echoes[0].el.dataset.on = "1";
        }
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    tick();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Fires when a lazily-loaded artifact settles and shifts everything below
    // it, which would otherwise leave every cached offset stale.
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="signal-root">
      {children}
    </div>
  );
}
