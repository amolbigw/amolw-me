import { Segment } from "./Trajectory";

/**
 * Where the signal ends.
 *
 * A last stretch of rail that comes down out of the Scale sequence and stops in
 * a node directly above the `01` of Ask Amol — the rail's x is the centre of
 * that `0` glyph, so the line lands on the number rather than beside it.
 *
 * Arrival is the payoff of the whole run: `01` fills to full opacity and the
 * Ask Amol input's border ticks once. Both of those are handled in CSS off the
 * `data-signal-arrived` flag SignalRoot sets here, which is why AskAmol.tsx
 * needs no changes at all.
 */
export function SignalTerminus() {
  return (
    <div
      className="signal-terminus"
      data-signal-row
      data-signal-terminus
      aria-hidden
    >
      <Segment />
      <span className="signal-node signal-node-end" />
    </div>
  );
}
