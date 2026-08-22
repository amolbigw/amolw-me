export type FaqPair = {
  /** Question as it appears as a heading on the page. */
  q: string;
  /**
   * Answer, which MUST be a verbatim run of prose from `body`. Google requires
   * FAQ markup to match visible text; assertFaqsAreVisible() in lib/thoughts.ts
   * fails the build if this drifts.
   */
  a: string;
};

export type Thought = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  /** 40-60 word direct answer rendered under the H1, before the narrative. */
  answer?: string;
  /** Question/answer pairs surfaced as FAQPage schema. Pillar essays only. */
  faqs?: FaqPair[];
  linkedinUrl: string;
  coverImage: string;
  coverAlt: string;
  body: string;
};
