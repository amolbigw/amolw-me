"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { mountSolo } from "./solo-engine";

/**
 * Up, Up, Down, Down, Left, Right, Left, Right, B, A, Enter summons Solo.
 * The same sequence, or Escape, sends him home.
 */
const SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
  "enter",
];

const FADE_MS = 400;

/** e.key, lower-cased, with a code fallback so numpad Enter counts too. */
function keyName(e: KeyboardEvent) {
  if (e.code === "Enter" || e.code === "NumpadEnter") return "enter";
  return e.key.toLowerCase();
}

function isEditable(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

export function SoloEasterEgg() {
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const buffer = useRef<string[]>([]);
  const hostRef = useRef<HTMLDivElement | null>(null);

  const dismiss = useCallback(() => {
    setLeaving(true);
    window.setTimeout(() => {
      setActive(false);
      setLeaving(false);
    }, FADE_MS);
  }, []);

  // Sequence listener. Lives for the life of the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isEditable(e.target)) return;
      if (e.key === "Escape") {
        if (active && !leaving) dismiss();
        return;
      }
      const buf = buffer.current;
      buf.push(keyName(e));
      if (buf.length > SEQUENCE.length) buf.splice(0, buf.length - SEQUENCE.length);
      if (buf.length !== SEQUENCE.length) return;
      if (!buf.every((k, i) => k === SEQUENCE[i])) return;
      buf.length = 0;
      if (leaving) return;
      if (active) dismiss();
      else setActive(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, leaving, dismiss]);

  // Mount the dog and feed it the pointer while active.
  useEffect(() => {
    if (!active) return;
    const host = hostRef.current;
    if (!host) return;
    const accent =
      getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() ||
      "#009ef0";
    const dog = mountSolo(host, { color: accent, size: 300, speed: 140, bottom: 24 });
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      dog.setPointer(e.clientX - r.left, e.clientY - r.top);
    };
    const onLeave = () => dog.clearPointer();
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      dog.remove();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={hostRef}
      aria-hidden
      data-solo
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 2147483000,
        opacity: leaving ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
      }}
    />
  );
}
