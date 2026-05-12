"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

type VantaInstance = { destroy: () => void };

const REDUCE_MOTION = "(prefers-reduced-motion: reduce)";
const SMALL_SCREEN = "(max-width: 640px)";

const subscribeMedia = (cb: () => void) => {
  const m1 = window.matchMedia(REDUCE_MOTION);
  const m2 = window.matchMedia(SMALL_SCREEN);
  m1.addEventListener("change", cb);
  m2.addEventListener("change", cb);
  return () => {
    m1.removeEventListener("change", cb);
    m2.removeEventListener("change", cb);
  };
};
const getEnabledSnapshot = () =>
  !window.matchMedia(REDUCE_MOTION).matches &&
  !window.matchMedia(SMALL_SCREEN).matches;
const getEnabledServerSnapshot = () => false;

export function VantaGlobe() {
  const ref = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<VantaInstance | null>(null);
  const enabled = useSyncExternalStore(
    subscribeMedia,
    getEnabledSnapshot,
    getEnabledServerSnapshot,
  );

  useEffect(() => {
    if (!enabled) return;
    if (!ref.current) return;

    let cancelled = false;

    (async () => {
      const THREE = await import("three");
      const { default: GLOBE } = await import("vanta/dist/vanta.globe.min");

      if (cancelled || !ref.current) return;

      instanceRef.current = GLOBE({
        el: ref.current,
        THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: 0x009ef0,
        color2: 0x8a8a86,
        size: 1,
        backgroundColor: 0x0a0a0b,
      });
    })();

    return () => {
      cancelled = true;
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [enabled]);

  if (!enabled) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,158,240,0.18),transparent_55%)]"
      />
    );
  }

  return <div ref={ref} aria-hidden className="absolute inset-0" />;
}
