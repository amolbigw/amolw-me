import { pacing, scaleBeats } from "@/lib/signal.config";

import { Segment } from "./Trajectory";

/**
 * Experience B. The trajectory's output, stripped to one fact at a time.
 *
 * No scroll hijacking, by construction rather than by restraint: the section is
 * simply tall, and a single `position: sticky` panel holds still inside it
 * while the page scrolls past underneath. Scroll input is never captured,
 * intercepted or re-timed, so a hard trackpad flick and a slow read produce the
 * same sequence at different speeds and both land cleanly on Ask Amol.
 *
 * The section's height is `panel + beats × beat + tail`, all in `svh` so a
 * collapsing mobile URL bar cannot resize the run mid-scroll. The tail is the
 * hold on STILL BUILDING. before the panel releases.
 *
 * With motion off — reduced-motion, or no JavaScript at all — the CSS unsticks
 * the panel and the beats become five plainly stacked full-height sections, in
 * order, at full opacity.
 */
export function ScaleSequence() {
  return (
    <section
      className="signal-scale"
      data-signal-scale
      style={
        {
          "--beats": scaleBeats.length,
          "--beat": `${(pacing.beatVh * 100).toFixed(2)}svh`,
          "--tail-ratio": pacing.tailRatio,
        } as React.CSSProperties
      }
      aria-labelledby="scale-heading"
    >
      <h2 id="scale-heading" className="sr-only">
        By the numbers
      </h2>

      <div className="signal-scale-panel" data-signal-panel>
        <div className="signal-scale-inner mx-auto max-w-6xl px-6">
          {/* The plotter head. The rail fills as the sequence advances and the
              node rides its drawn end, which is what visibly connects one beat
              to the next. */}
          <div className="signal-scale-rail" aria-hidden>
            <Segment />
            <span className="signal-scale-head" />
          </div>

          <ol className="signal-beats">
            {scaleBeats.map((b) => (
              <li
                key={b.value + b.word}
                className="signal-beat"
                data-signal-beat
                data-statement={b.statement ? "" : undefined}
                aria-label={b.readAs}
              >
                <span className="signal-beat-value" aria-hidden>
                  {b.value}
                </span>
                <span className="signal-beat-word" aria-hidden>
                  {b.word}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
