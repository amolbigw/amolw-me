"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The one moving artifact in the trajectory.
 *
 * `preload="none"` plus play-on-visible is the whole point: the file is 1.8MB
 * and sits eight screens down, so it is only fetched by someone who actually
 * scrolls to the thesis. Out of view it pauses again, which keeps a laptop
 * from decoding a loop nobody is looking at.
 *
 * Under reduced motion it never autoplays. It keeps its poster and gains
 * controls instead, so the content is still reachable — a request not to
 * animate is not a request to hide the thing.
 */
export function SignalVideo({
  src,
  poster,
  label,
  width,
  height,
}: {
  src: string;
  poster: string;
  label: string;
  width: number;
  height: number;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          /* Autoplay can still be refused (Low Power Mode, a per-site block).
             Nothing to recover here — the poster stays up and the controls
             below are the way in. */
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={width}
      height={height}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      controls={reduced}
    />
  );
}
