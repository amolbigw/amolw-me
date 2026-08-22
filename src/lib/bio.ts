/**
 * Career timeline and at-a-glance facts.
 *
 * Extracted from the /about page so the Ask Amol corpus and the rendered page
 * read from one source. Anything the corpus states about Amol's remit, path,
 * patents, exit, or location has to be traceable to something published, and
 * the only way to keep that true over time is to not have a second copy.
 */

export type TimelineEntry = {
  period: string;
  role: string;
  org: string;
  body: string;
};

export type Fact = {
  label: string;
  value: string;
};

export const timeline: TimelineEntry[] = [
  {
    period: "2020 — Now",
    role: "Co-founder",
    org: "fullthrottle.ai",
    body: "Run the business day to day: revenue, sales, and customer success; product, engineering, and operations; and the board. Three issued patents help protect the core methodologies the platform is built on.",
  },
  {
    period: "2016 — 2020",
    role: "VP, Platform Marketing",
    org: "Stream Companies",
    body: "Joined post-acquisition. US Top 50 privately owned integrated agency, Philadelphia.",
  },
  {
    period: "2012 — 2016",
    role: "Founder",
    org: "Maiden Media Group",
    body: "Built and ran for 4 years. Successfully acquired by Stream Companies.",
  },
  {
    period: "Earlier",
    role: "Digital Marketing",
    org: "Unilever",
    body: "Worked on Axe, Suave, and Ben & Jerry's inside Unilever's Digital Marketing Services group.",
  },
];

export const facts: Fact[] = [
  { label: "Patents", value: "3 issued" },
  { label: "Exits", value: "1" },
  { label: "Based", value: "Philadelphia" },
  { label: "Remit", value: "Revenue · Sales · CS · Product · Eng · Ops · Board" },
  { label: "Focus", value: "AI · CTV · first-party data" },
];
