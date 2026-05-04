"use client";

import { useEffect, useRef } from "react";

type VantaInstance = { destroy: () => void };

export function VantaGlobe() {
  const ref = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<VantaInstance | null>(null);

  useEffect(() => {
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
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: 0xc7ff3d,
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
  }, []);

  return <div ref={ref} aria-hidden className="absolute inset-0" />;
}
