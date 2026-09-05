export type Accolade = {
  /** Full name of the award or outlet. Alt text and hover title. */
  name: string;
  src: string;
  /** Intrinsic size of the mono asset in public/logos/hero. */
  width: number;
  height: number;
  /** Rendered height in px. Set per mark, not per row: a 1:1 seal and a 5:1
      wordmark at the same height read as wildly different weights, so each one
      is sized until it carries the same presence as its neighbours. */
  display: number;
};

/* One flat wall. Assets are pre-flattened to white-on-transparent (see
   public/logos/hero) so nine marks read as one, instead of nine competing
   brand palettes on a black hero. */
export const accolades: Accolade[] = [
  {
    name: "Inc. 5000",
    src: "/logos/hero/inc-5000.png",
    width: 420,
    height: 420,
    display: 62,
  },
  {
    name: "Stratus Award 2026",
    src: "/logos/hero/stratus-award.png",
    width: 420,
    height: 613,
    display: 74,
  },
  {
    name: "MarTech Breakthrough Awards",
    src: "/logos/hero/martech-breakthrough.png",
    width: 420,
    height: 385,
    display: 66,
  },
  {
    name: "Philadelphia Business Journal Diversity in Business Awards",
    src: "/logos/hero/diversity-in-business.png",
    width: 420,
    height: 403,
    display: 62,
  },
  {
    name: "Digiday Technology Awards",
    src: "/logos/hero/digiday-technology-awards.png",
    width: 560,
    height: 168,
    display: 44,
  },
  {
    name: "AdExchanger",
    src: "/logos/hero/adexchanger.png",
    width: 474,
    height: 106,
    display: 26,
  },
  {
    name: "Advertising Week",
    src: "/logos/hero/advertising-week.png",
    width: 496,
    height: 88,
    display: 24,
  },
  {
    name: "IAB",
    src: "/logos/hero/iab.png",
    width: 274,
    height: 138,
    display: 26,
  },
];
