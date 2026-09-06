/**
 * The signal system: one config for the two cinematic interludes between the
 * hero and section 01.
 *
 * Everything a non-engineer would want to correct lives here — chronology,
 * label wording, artifact paths and alt text, and the scroll pacing of both
 * sequences. The components read from this file and hold no copy of their own.
 *
 * Amol is the first-named inventor on all three patents (verified against the
 * published documents), which is what "lead inventor" in the note rests on.
 *
 * FACT PROVENANCE — every milestone below traces to something already
 * published on this site, so the interlude cannot drift from /about:
 *   - Maiden Media Group, Stream Companies, dates, roles  → src/lib/bio.ts
 *   - Three issued patents, one exit, 100-person company  → hero copy, src/app/page.tsx
 *   - "roughly a decade"                                  → hero copy
 * TO CONFIRM BEFORE LAUNCH: the exact ordering of the patents relative to the
 * headcount milestone, and whether "100-person" is current or a peak figure.
 *
 * ARTIFACT PROVENANCE — these are public files on a public site, served at
 * full resolution and indexed.
 *
 * The Maiden Media team photo shows former colleagues, and the certificates
 * they are holding carry their names. At the 448px the artifact renders those
 * names are not readable, but the 900px file behind it is fetchable and they
 * are. That is the same trade the platform screenshot makes and it is a
 * deliberate call, not an oversight — the photo is Amol's own team and was
 * already public before it landed here. Replacing it with a group shot of
 * anyone outside that team needs its own clearance.
 *
 * The platform screenshot shows a real account. Its spend, delivery and
 * attribution figures are that client's actual numbers, published with their
 * permission — Amol confirmed clearance before this went up. Only the account
 * name, URL and the two campaign titles are replaced, so the page reads as a
 * product shot rather than a named case study. The ad creative is as captured
 * and carries the client's own branding, which means the file identifies them
 * at full resolution even though the header does not; that was a deliberate
 * call, not an oversight.
 *
 * A REFRESH DOES NOT INHERIT THAT CLEARANCE. A new capture, or the same view
 * for a different client, needs its own permission before it can ship. With no
 * clearance, run the script at --scope full, which also blurs the creative and
 * masks every figure:
 *
 *   cd public/trajectory && python3 ../../scripts/anonymise-platform-screenshot.py --scope full The patent drawings are
 * The patent artifacts are the real figures redrawn as schematics in the
 * signal blue, not reproductions of the scans: at the size these render, a
 * scan's type smears and the boxes grey out, and black-on-white line art reads
 * as a photocopy dropped on the page. Geometry, dotted rules and leader lines
 * are faithful to the source figures; the body text is stood in for by rules,
 * since type would only smear. All three patents share one 16-figure family,
 * so each figure genuinely appears in the patent it is captioned with.
 *
 * PATENT COPY — captions carry the number and issue date and nothing else, and
 * the milestone note stays at the approved "helps protect the core
 * methodologies" level. Never state that a product or the platform is
 * patented, and never characterise what a patent covers.
 */

export type SignalArtifact = {
  src: string;
  /**
   * Optional source the artifact links to. Only set it where a reader would
   * reasonably want to check the claim — the patents link to their
   * announcements. Each one adds a tab stop inside the trajectory, so it is
   * not free.
   */
  href?: string;
  /** Real alt text. Read by screen readers and by search. Not decorative. */
  alt: string;
  caption: string;
  /** Intrinsic dimensions. Required — they are what keep CLS at zero. */
  width: number;
  height: number;
  /**
   * Drop the frame. The border reads as the edge of a photograph, which is
   * right for a screenshot and wrong for a shape on transparency — there it
   * draws a rectangle around mostly empty page.
   */
  bare?: boolean;
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
    artifacts: [
      {
        src: "/trajectory/maiden-team.jpg",
        alt: "The Maiden Media team outside the Philadelphia office, holding up internal awards certificates.",
        caption: "The team",
        width: 900,
        height: 450,
      },
      {
        /* Moved up from `exit` so the pair reads as one row. The caption drops
           the acquisition, which is a 2016 fact and would misdate the 2012
           milestone it now sits on — `exit` still carries it in its note. */
        src: "/trajectory/maidenmedia.jpg",
        alt: "The Maiden Media Group page, describing the agency as a strategic creative agency acquired by Stream Companies",
        caption: "The agency",
        width: 900,
        height: 449,
      },
    ],
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
        /* Stream Companies' own cover art, feathered into the page at both
           ends rather than cropped: the useful width varies by band, so a
           hard crop would either clip the tagline or leave dead building
           beside the award rows. `bare` because a frame would box the fade. */
        src: "/trajectory/stream-companies.webp",
        alt: "Stream Companies branding: Inc. 5000 winner nineteen times, Best Places to Work in PA winner five times, an award-winning full-service tech-enabled ad agency.",
        caption: "Stream Companies",
        width: 900,
        height: 351,
        bare: true,
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
        /* Real client figures, published with permission; account name
           replaced. See the artifact note above before refreshing this. */
        src: "/trajectory/ftplatform.jpg",
        alt: "The fullthrottle.ai platform showing two campaigns with delivery pacing against budget, first-party audience counts, channel tactics, and attributed sales and service outcomes.",
        caption: "The platform",
        width: 1400,
        height: 796,
      },
    ],
  },
  {
    id: "patents",
    label: "Three patents",
    /* No meta line here: the note already carries both the count and the
       status, and "Issued" above "3 issued patents" said it twice running. */
    note: "3 issued patents as lead inventor, helping protect the core methodologies the platform is built on.",
    artifacts: [
      {
        src: "/trajectory/patent-01.svg",
        href: "https://www.globenewswire.com/news-release/2023/01/23/2593371/0/en/fullthrottle-technologies-llc-announces-issuance-of-patent-for-company-s-proprietary-first-party-data-technologies.html",
        alt: "Figure 1 of US patent 11,556,947, redrawn as a schematic: a system diagram: a network, a processor and its peripherals inside a system boundary.",
        caption: "US 11,556,947",
        width: 200,
        height: 250,
      },
      {
        src: "/trajectory/patent-02.svg",
        href: "https://www.globenewswire.com/news-release/2024/02/20/2832133/0/en/fullthrottle-ai-secures-second-patent-to-power-unrivaled-attribution-insights-for-audio-and-video-advertising.html",
        alt: "Figure 14 of US patent 11,823,219, redrawn as a schematic: a branching decision flow with two decision points and a loop back to the start.",
        caption: "US 11,823,219",
        width: 200,
        height: 250,
      },
      {
        src: "/trajectory/patent-03.svg",
        href: "https://www.globenewswire.com/news-release/2024/10/07/2959012/0/en/fullthrottle-ai-%EF%B8%8F-Secures-Patent-for-SafeMatch-%EF%B8%8F-Privacy-First-Attribution-Connecting-Ad-Exposures-to-Outcomes.html",
        alt: "Figure 9 of US patent 12,051,083, redrawn as a schematic: a linear process chain running from start to end through five steps.",
        caption: "US 12,051,083",
        width: 200,
        height: 250,
      },
    ],
  },
  {
    id: "scale",
    label: "100-person company",
    meta: "Today",
    note: "Revenue, sales, customer success, product, engineering, operations, board.",
    artifacts: [
      {
        src: "/trajectory/ft-team.webp",
        alt: "The fullthrottle.ai team: staff headshots tiled as hexagons into the shape of the company mark.",
        caption: "The people",
        width: 900,
        height: 997,
        bare: true,
      },
    ],
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
   *
   * It does not need to carry the whole hold: once the panel releases, the
   * statement stays on screen while the rest of the panel scrolls past, which
   * is most of a viewport of dwell on its own.
   */
  tailRatio: 0.32,
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
