# Solo easter egg

## Goal
A hidden feature on amolw.me. Typing the Konami sequence
(Up, Up, Down, Down, Left, Right, Left, Right, B, A, Enter) summons Solo,
Amol's treeing coonhound, rendered as the particle-mesh dog from the Claude
Design handoff. Solo trots across the bottom of the viewport on top of every
page. When the mouse approaches him he bolts away at high speed. He can never
be clicked.

## Behaviour
- Trigger: `keydown` on `window`. The last 11 keys are buffered and compared
  on Enter. Keys typed inside inputs, textareas, or contenteditable elements
  are ignored so the Ask Amol field cannot trigger it by accident.
- Toggle: entering the sequence again dismisses Solo. Escape also dismisses.
  Dismissal fades the layer out over 400 ms, then unmounts it.
- Overlay: a `position: fixed; inset: 0; pointer-events: none` layer above
  everything (z-index 2147483000). Because the layer ignores pointer events the
  dog is physically unclickable; the page beneath stays fully interactive.
- Trot: the handoff gait, unchanged. Turns at each viewport edge with a
  particle burst.
- Flee: each frame the engine measures the pointer's distance to the dog's
  body centre. Inside a threat radius (about 110 model units, roughly 280 px at
  size 300) the dog panics: it faces away from the pointer and its speed ramps
  to five times the trot speed with a particle burst. Panic decays over about
  a second once the pointer leaves the radius.
- Cornered: if the dog is panicking and the escape direction would carry it
  past a viewport edge, or the pointer is on top of it, the swarm scatters and
  re-forms on the far side of the viewport, facing inward. A short cooldown
  prevents thrashing.
- Colour: the site accent (`#009ef0`) rather than the handoff's `#00C2FF`,
  so the site keeps its single blue.
- Mobile: no keyboard, so no trigger. Nothing to do.

## Architecture
- `src/components/solo/solo-engine.ts`: the handoff `solo.js` converted to a
  TypeScript module. Skeleton, particle model, physics and rendering are kept
  as designed. The custom element wrapper is replaced with `mountSolo(host,
  opts)` returning `{ setPointer, remove }`. Flee steering is added to the
  frame loop.
- `src/components/solo/SoloEasterEgg.tsx`: client component. Owns the key
  buffer, the active flag, the host `div`, pointer tracking, and the
  mount/unmount lifecycle.
- `src/app/layout.tsx`: renders `<SoloEasterEgg />` once.

## Testing
Manual, in the browser: trigger on the home page and an inner page, confirm
the trot, chase with the mouse, corner it against an edge, dismiss with the
sequence and with Escape, confirm typing the sequence inside Ask Amol does
nothing, confirm links beneath the dog still click. `tsc`, `eslint` and
`next build` must pass.
