/**
 * Where the signal is born.
 *
 * The hero's existing `●` status dot, unchanged, with a short stroke hanging
 * from its centre. It draws once on load and then waits for scroll — the only
 * animation this build adds above the fold.
 *
 * Absolutely positioned, so it contributes nothing to layout and cannot move
 * the hero paragraph that carries LCP.
 */
export function SignalOrigin() {
  return (
    <span className="signal-origin text-[var(--signal)]">
      ●
      <svg
        className="signal-origin-line"
        width="8"
        height="34"
        viewBox="0 0 8 34"
        aria-hidden="true"
        focusable="false"
      >
        <line x1="4" y1="0" x2="4" y2="34" pathLength="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}
