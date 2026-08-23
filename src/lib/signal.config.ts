/**
 * The signal system: one config for the two cinematic interludes between the
 * hero and section 01.
 *
 * Everything a non-engineer would want to correct lives here — chronology,
 * label wording, artifact paths and alt text, and the scroll pacing of both
 * sequences. The components read from this file and hold no copy of their own.
 *
 * FACT PROVENANCE — every milestone below traces to something already
 * published on this site, so the interlude cannot drift from /about:
 *   - Maiden Media Group, Stream Companies, dates, roles  → src/lib/bio.ts
 *   - Three issued patents, one exit, 100-person company  → hero copy, src/app/page.tsx
 *   - "roughly a decade"                                  → hero copy
 * TO CONFIRM BEFORE LAUNCH: the exact ordering of the patents relative to the
 * headcount milestone, and whether "100-person" is current or a peak figure.
 *
 * ARTIFACT PROVENANCE — these are public files on a public site, so nothing
 * that identifies a client can go in one. The platform screenshot was
 * anonymised before it was committed: client name, URL, campaign titles and ad
 * creative replaced, and every spend, delivery and attribution figure masked.
 * The figures are masked rather than replaced with plausible ones on purpose —
 * invented numbers on a public page read as a performance claim. Re-anonymise
 * the same way if that screenshot is ever refreshed. The patent drawings are
 * still labelled placeholders.
 */

export type SignalArtifact = {
  src: string;
  /** Real alt text. Read by screen readers and by search. Not decorative. */
  alt: string;
  caption: string;
  /** Intrinsic dimensions. Required — they are what keep CLS at zero. */
  width: number;
  height: number;
};

export type Milestone = {
  id: string;
  /** The all-caps line that sits on the rail. Keep it to three words. */
  label: string;
  /** Period or year. Optional: NOW deliberately has none. */
  meta?: string;
  /** One line. Two at the very most. */
  note?: string;
  /**
   * Three or four milestones carry artifacts, never all of them. The restraint
   * is what makes the ones that do land.
   */
  artifacts?: SignalArtifact[];
};

export const milestones: Milestone[] = [
  {
    id: "maiden",
    label: "Maiden Media",
    meta: "2012",
    note: "First company. Founded in Philadelphia.",
  },
  {
    id: "built",
    label: "Built",
    meta: "2012 — 2016",
    note: "Four years turning an agency from an idea into a business.",
  },
  {
    id: "exit",
    label: "Exit",
    meta: "2016",
    note: "Acquired by Stream Companies.",
    artifacts: [
      {
        src: "/trajectory/maidenmedia.jpg",
        alt: "The Maiden Media Group page, describing the agency as a strategic creative agency acquired by Stream Companies",
        caption: "Acquired by Stream Companies",
        width: 900,
        height: 449,
      },
    ],
  },
  {
    id: "stream",
    label: "Stream Companies",
    meta: "2016 — 2020",
    note: "VP, Platform Marketing at a US top-50 privately owned integrated agency.",
  },
  {
    id: "fullthrottle",
    label: "fullthrottle.ai",
    meta: "2020",
    note: "Co-founded. Identity, attribution, and media in one platform.",
    artifacts: [
      {
        /* Anonymised before publication — see the artifact note above. */
        src: "/trajectory/ftplatform.jpg",
        alt: "The fullthrottle.ai platform showing two campaigns with delivery pacing, audience tactics, and sales and service attribution. Client details and performance figures are redacted.",
        caption: "The platform",
        width: 1400,
        height: 796,
      },
    ],
  },
  {
    id: "patents",
    label: "Three patents",
    meta: "Issued",
    note: "Protecting the core methodologies the platform runs on.",
    artifacts: [
      {
        src: "/trajectory/patent-01.svg",
        alt: "Placeholder for the first issued patent drawing",
        caption: "PLACEHOLDER · figure 1",
        width: 800,
        height: 1000,
      },
      {
        src: "/trajectory/patent-02.svg",
        alt: "Placeholder for the second issued patent drawing",
        caption: "PLACEHOLDER · figure 2",
        width: 800,
        height: 1000,
      },
      {
        src: "/trajectory/patent-03.svg",
        alt: "Placeholder for the third issued patent drawing",
        caption: "PLACEHOLDER · figure 3",
        width: 800,
        height: 1000,
      },
    ],
  },
  {
    id: "scale",
    label: "100-person company",
    meta: "Today",
    note: "Revenue, sales, customer success, product, engineering, operations, board.",
  },
  {
    id: "thesis",
    label: "AI / Identity / Media",
    meta: "The thesis",
    note: "The household is the durable unit. Everything else is a proxy for it.",
  },
  {
    /* Deliberately bare. No year, no note, no end cap — the line leaves this
       milestone still drawing. */
    id: "now",
    label: "Now",
  },
];

export type ScaleBeat = {
  /** The enormous figure. One per viewport moment, never two. */
  value: string;
  /** The supporting word, which lands a beat after the figure. */
  word: string;
  /** How the pair should be read aloud, since "03" is not "three". */
  readAs: string;
  /**
   * Set on a beat that is a sentence rather than a figure and its unit.
   *
   * The other beats are `03` + `PATENTS`: the figure is the fact and the word
   * labels it, so the size split between them is the point. STILL BUILDING. is
   * one statement, and splitting it the same way breaks the phrase in half and
   * leaves the closing line reading as a caption. A statement beat sets both
   * lines at display size instead.
   */
  statement?: boolean;
};

export const scaleBeats: ScaleBeat[] = [
  { value: "03", word: "Patents", readAs: "Three patents" },
  { value: "01", word: "Exit", readAs: "One exit" },
  { value: "100", word: "People", readAs: "One hundred people" },
  { value: "10+", word: "Years building", readAs: "Ten plus years building" },
  { value: "Still", word: "Building.", readAs: "Still building.", statement: true },
];

/**
 * Scroll pacing. These are the only numbers to touch if the interlude feels
 * long or rushed.
 *
 * Both sequences are driven by native scroll, so these set *distance*, not
 * duration: a visitor who flicks covers the whole run in a gesture or two, a
 * visitor who reads gets the full choreography out of the same values.
 */
export const pacing = {
  /**
   * Scroll distance each Scale beat occupies, as a fraction of the viewport.
   *
   * This is the main lever on how far Ask Amol sits below the fold. At 0.46
   * the two interludes together put it around seven screens down — two
   * trackpad flicks, or two thumb flicks on a phone. Drop this to 0.35 to pull
   * it up by roughly a screen; the choreography still reads, the beats just
   * turn over sooner.
   */
  beatVh: 0.46,
  /**
   * Extra distance after the final beat, so STILL BUILDING. holds on screen
   * before the panel releases instead of snapping away.
   */
  tailRatio: 0.42,
  /**
   * Where down the viewport the signal's drawing head sits. 0.68 puts it just
   * below centre, so the line arrives at a milestone slightly before the
   * reader's eye does.
   */
  activation: 0.68,
  /**
   * Second, higher line. Once a row's foot passes it the row is on its way off
   * screen and its artifact recedes.
   */
  recede: 0.15,
} as const;
