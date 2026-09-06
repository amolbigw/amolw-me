import { milestones } from "@/lib/signal.config";
import { SignalVideo } from "./SignalVideo";

/**
 * Experience A. A visual account of what got built, not a résumé.
 *
 * The rail is the spine: one 1px plumb line down the left edge of the content
 * column, at the same x as the hero's status dot and every section number on
 * the page. Each milestone owns the stretch of line beside it and draws its own
 * segment as it passes, so the segments chain into one continuous stroke
 * without any of them needing to know the height of the others.
 *
 * Deliberately straight rather than drifting. The brief allows a drift, but the
 * rail has to read the same on a phone as on a desktop, and a plumb line at the
 * exact x of the `●` and the `01` is what makes the through-line legible at
 * all. Instrument, not decoration.
 *
 * A server component. Every label is real text, so the markup ships as HTML.
 * The only JavaScript is the shared scroll clock in SignalRoot and, on the one
 * milestone that carries video, SignalVideo — which exists so a 1.8MB file
 * eight screens down is not fetched by someone who never reaches it.
 */
export function Trajectory() {
  return (
    <section className="mx-auto max-w-6xl px-6" aria-labelledby="trajectory-heading">
      <h2 id="trajectory-heading" className="sr-only">
        Trajectory
      </h2>

      {/* Lead-in. The signal was born at the hero; this is where it picks back
          up. Its own row so it draws on scroll like everything else. */}
      <div className="signal-lead" data-signal-row aria-hidden>
        <Segment />
      </div>

      <ol className="signal-track">
        {milestones.map((m) => (
          <li
            key={m.id}
            className="signal-row"
            data-signal-row
            data-artifacts={m.artifacts ? m.artifacts.length : undefined}
            data-span={m.artifacts?.[0].span ? "" : undefined}
          >
            <span className="signal-rail" aria-hidden>
              <Segment />
              <span className="signal-node" />
            </span>

            <div className="signal-body">
              <h3 className="signal-label">{m.label}</h3>
              {m.meta && <p className="signal-meta">{m.meta}</p>}
              {m.note && <p className="signal-note">{m.note}</p>}
            </div>

            {m.artifacts && (
              <div
                className="signal-artifacts"
                style={
                  m.artifacts[0].scale
                    ? ({
                        "--artifact-scale": m.artifacts[0].scale,
                      } as React.CSSProperties)
                    : undefined
                }
              >
                {m.artifacts.map((a, i) => {
                  {/* Plain <img>: the manifest holds intrinsic dimensions, so
                      the box is reserved before the file lands and CLS stays at
                      zero. The video branch reserves its box the same way. */}
                  const img = a.video ? (
                    <SignalVideo
                      src={a.src}
                      poster={a.poster ?? ""}
                      label={a.alt}
                      width={a.width}
                      height={a.height}
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={a.src}
                      alt={a.alt}
                      width={a.width}
                      height={a.height}
                      loading="lazy"
                      decoding="async"
                    />
                  );
                  return (
                    <figure
                      key={a.src}
                      className={[
                        "signal-artifact",
                        a.bare && "signal-artifact--bare",
                        a.span && "signal-artifact--span",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      {a.href ? (
                        <a
                          href={a.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          /* The caption goes in the link text rather than the
                             image alt, so the accessible name reads as the
                             destination ("US 11,556,947, announcement") instead
                             of a description of the drawing. */
                          className="signal-artifact-link"
                        >
                          {img}
                          <figcaption>
                            {a.caption}
                            <span className="sr-only"> — announcement</span>
                          </figcaption>
                        </a>
                      ) : (
                        <>
                          {img}
                          <figcaption>{a.caption}</figcaption>
                        </>
                      )}
                    </figure>
                  );
                })}
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * One stretch of rail: a dim track that is always there, and the bright trace
 * drawn over it.
 *
 * `pathLength="1"` normalises the dash maths, so the draw is a plain 1 → 0 on
 * `stroke-dashoffset` no matter how tall the row turns out to be — no
 * measurement, no re-render when the height changes. `preserveAspectRatio` is
 * off so the 8px-wide box stretches vertically only, which leaves a vertical
 * line exactly vertical, and `vector-effect` holds the stroke at 1px through
 * it.
 */
function Segment() {
  return (
    <svg
      className="signal-seg"
      viewBox="0 0 8 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <line className="signal-seg-track" x1="4" y1="0" x2="4" y2="100" vectorEffect="non-scaling-stroke" />
      <line
        className="signal-seg-trace"
        x1="4"
        y1="0"
        x2="4"
        y2="100"
        pathLength="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export { Segment };
