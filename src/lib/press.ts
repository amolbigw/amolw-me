export type PressItem = {
  publication: string;
  title: string;
  date?: string;
  year: number;
  url: string;
  logo?: string;
  logoTheme?: "light" | "dark";
};

const LOGOS = {
  theCurrent: "/logos/the-current.png",
  emarketer: "/logos/emarketer.png",
  adexchanger: "/logos/adexchanger.png",
  nexttv: "/logos/nexttv.png",
  businessJournals: "/logos/business-journals.jpg",
  iab: "/logos/iab.png",
  marketecture: "/logos/marketecture.png",
  advertisingWeek: "/logos/advertising-week.png",
  digiday: "/logos/digiday.jpg",
  martechSeries: "/logos/martech-series.png",
  rethinkResearch: "/logos/rethink-research.jpg",
  globeNewswire: "/logos/globe-newswire.png",
  abc27: "/logos/abc27.png",
  itvt: "/logos/itvt.jpg",
  prnewswire: "/logos/prnewswire.png",
  cbtNews: "/logos/cbt-news.png",
  mediapost: "/logos/mediapost.jpg",
  theMeasure: "/logos/the-measure.png",
  theOutcome: "/logos/the-outcome.png",
  nextInMedia: "/logos/next-in-media.png",
  dailyDealerLive: "/logos/daily-dealer-live.png",
};

export const press: PressItem[] = [
  {
    publication: "Advertising Week",
    title:
      "Audio Is a Critical Connection Point in Media and Planning, Yet Remains Disconnected Across Channels",
    year: 2026,
    url: "https://advertisingweek.com/audio-is-a-key-connection-point-to-consumers-but-it-remains-disconnected-from-the-rest-of-media-planning/",
    logo: LOGOS.advertisingWeek,
  },
  {
    publication: "Winner Circle by BIG",
    title: "AI-Powered Outcomes: Becoming the Easy Button for Modern Advertising",
    year: 2026,
    url: "https://youtu.be/7m7dOzhd3gM",
  },
  {
    publication: "PR Newswire",
    title:
      "fullthrottle.ai Partners with TelevisaUnivision to Integrate Premium Multicultural Digital and CTV Inventory",
    year: 2026,
    url: "https://www.prnewswire.com/news-releases/fullthrottleai-partners-with-televisaunivision-to-bring-premium-multicultural-and-national-inventory-into-its-self-service-platform-302743304.html",
    logo: LOGOS.prnewswire,
  },
  {
    publication: "AdExchanger",
    title: "TelevisaUnivision Joins The Streaming Self-Service Bandwagon",
    year: 2026,
    url: "https://www.adexchanger.com/tv/televisaunivision-joins-the-streaming-self-service-bandwagon/",
    logo: LOGOS.adexchanger,
  },
  {
    publication: "PR Newswire",
    title:
      "fullthrottle.ai Expands Into Audio With Premium Inventory, Streamlined Activation, and Unified Measurement",
    year: 2026,
    url: "https://www.prnewswire.com/news-releases/fullthrottleai-expands-into-audio-with-premium-inventory-streamlined-activation-and-unified-measurement-302735789.html",
    logo: LOGOS.prnewswire,
  },
  {
    publication: "CBT News",
    title:
      "Why dealer marketing just leveled up — agency-grade buying tools come to the showroom",
    date: "Mar 26, 2026",
    year: 2026,
    url: "https://www.cbtnews.com/dealer-marketing-shift-agency-grade-buying-tools/",
    logo: LOGOS.cbtNews,
  },
  {
    publication: "PR Newswire",
    title:
      "fullthrottle.ai Launches Enhanced SmartMail to Unify Identity-Based Campaigns With Automated Direct Mail Activation",
    year: 2026,
    url: "https://www.prnewswire.com/news-releases/fullthrottleai-launches-enhanced-smartmail-capabilities-to-unify-identity-based-campaigns-with-automated-self-service-direct-mail-activation-302711445.html",
    logo: LOGOS.prnewswire,
  },
  {
    publication: "Advertising Week",
    title:
      "From Fragmented Channels to Marketplaces: Why Automotive Media Is Finally Catching Up to How Buyers Actually Shop",
    year: 2026,
    url: "https://advertisingweek.com/from-fragmented-channels-to-marketplaces-why-automotive-media-is-finally-catching-up-to-how-buyers-actually-shop/",
    logo: LOGOS.advertisingWeek,
  },
  {
    publication: "GlobeNewswire",
    title:
      "fullthrottle.ai Collaborates With Experian Automotive to Power Smarter Audience Creation",
    date: "Mar 5, 2026",
    year: 2026,
    url: "https://www.globenewswire.com/news-release/2026/03/05/3250427/0/en/fullthrottle-ai-Collaborates-with-Experian-Automotive-to-Power-Smarter-Audience-Creation-With-Unified-First-and-Third-Party-Data.html",
    logo: LOGOS.globeNewswire,
  },
  {
    publication: "MediaPost",
    title:
      "Performance Engine Ties Experian to fullthrottle.ai for Automotive Audiences",
    year: 2026,
    url: "https://www.mediapost.com/publications/article/413239/performance-engine-ties-experian-to-fullthrottle.html",
    logo: LOGOS.mediapost,
  },
  {
    publication: "CBT News",
    title:
      "NADA Show 2026: Amol Waishampayan on fullthrottle.ai's Outcome-Driven DSP for Auto",
    date: "Feb 5, 2026",
    year: 2026,
    url: "https://www.cbtnews.com/nada-show-2026-amol-waishampayan-fullthrottle-ai/",
    logo: LOGOS.cbtNews,
  },
  {
    publication: "The Measure",
    title: "fullthrottle.ai Launches DSP to Accelerate Auto Campaigns",
    year: 2026,
    url: "https://www.themeasure.net/fullthrottle-ai-launches-dsp-to-accelerate-auto-campaigns/",
    logo: LOGOS.theMeasure,
    logoTheme: "dark",
  },
  {
    publication: "Next in Media",
    title:
      "At CES 2026, TV Finds Itself at an Identity Crossroads",
    year: 2026,
    url: "https://mikeshields.substack.com/p/at-ces-2026-tv-finds-itself-at-an",
    logo: LOGOS.nextInMedia,
  },
  {
    publication: "Advertising Week",
    title: "CTV's Measurement Problem Isn't Data — It's Usability",
    year: 2026,
    url: "https://advertisingweek.com/ctvs-measurement-problem-isnt-data-its-usability/",
    logo: LOGOS.advertisingWeek,
  },
  {
    publication: "The Outcome",
    title:
      "Why Transparency Will Define the Future of AI-Powered Advertising",
    year: 2026,
    url: "https://www.theoutcome.com/articles/ai-assisted-media-buying-exacerbates-existing-questions-about-transparency",
    logo: LOGOS.theOutcome,
    logoTheme: "dark",
  },
  {
    publication: "Daily Dealer Live",
    title:
      "Amol Waishampayan on New Ad Tech and Automotive DSP Precision",
    year: 2026,
    url: "https://www.dealershipguy.com/toothman-on-fleet-focus-waishampayan-on-new-ad-tech-lundy-on-salesbdc-split-daily-dealer-live/",
    logo: LOGOS.dailyDealerLive,
  },
  {
    publication: "eMarketer",
    title: "Ad Measurement Trends H1 2024",
    date: "Feb 29, 2024",
    year: 2024,
    url: "https://www.emarketer.com/content/ad-measurement-trends-h1-2024",
    logo: LOGOS.emarketer,
  },
  {
    publication: "The Current",
    title: "10 marketers weigh in on what's in store for 2024",
    year: 2024,
    url: "https://www.thecurrent.com/digital-marketer-2024-predictions-ai-retail-media",
    logo: LOGOS.theCurrent,
  },
  {
    publication: "The Current",
    title: "AI and streaming take center stage at CES 2024",
    year: 2024,
    url: "https://www.thecurrent.com/current-report-ai-streaming-ces-2024",
    logo: LOGOS.theCurrent,
  },
  {
    publication: "Advertising Week",
    title:
      "AI for Marketers: How AI is Bringing More Effectiveness and Efficiency to TV",
    year: 2023,
    url: "https://newyork2023.advertisingweek.com/aw/schedule",
    logo: LOGOS.advertisingWeek,
  },
  {
    publication: "AdExchanger",
    title: "fullthrottle.ai Puts Pedal To The Metal On CTV Attribution",
    year: 2023,
    url: "https://www.adexchanger.com/tv/fullthrottle-puts-pedal-to-the-metal-on-ctv-attribution/",
    logo: LOGOS.adexchanger,
  },
  {
    publication: "NextTV",
    title: "fullthrottle.ai Gets Second Patent For Ad Attribution",
    year: 2023,
    url: "https://www.nexttv.com/news/fullthrottleai-gets-second-patent-for-ad-attribution",
    logo: LOGOS.nexttv,
  },
  {
    publication: "Philadelphia Business Journal",
    title:
      "Diversity in Business Awards 2023: Amol Waishampayan, fullthrottle.ai",
    date: "Aug 24, 2023",
    year: 2023,
    url: "https://www.bizjournals.com/philadelphia/news/2023/08/24/diversity-in-business-awards-amol-waishampayan.html",
    logo: LOGOS.businessJournals,
  },
  {
    publication: "The Current",
    title:
      "'The industry isn't ready yet': A new report highlights flaws in Google's Privacy Sandbox",
    year: 2023,
    url: "https://www.thecurrent.com/report-google-privacy-sandbox-iab-tech-lab-data",
    logo: LOGOS.theCurrent,
  },
  {
    publication: "eMarketer",
    title: "Programmatic Advertising Trends Q2 2023",
    date: "May 10, 2023",
    year: 2023,
    url: "https://www.emarketer.com/content/programmatic-advertising-trends-q2-2023",
    logo: LOGOS.emarketer,
  },
  {
    publication: "Gizmodo",
    title:
      "A New Tracker Promises to Collect a Lot More of Your Data. Its Maker Says That's Better For Your Privacy.",
    year: 2023,
    url: "https://gizmodo.com/full-throttle-new-tracker-google-kills-cookies-1850051167",
  },
  {
    publication: "IAB",
    title:
      "Leveraging First-Party Data: Turning Data Scavengers into Data Harvesters",
    year: 2023,
    url: "https://www.iab.com/video/leveraging-first-party-data-turning-data-scavengers-into-data-harvesters/",
    logo: LOGOS.iab,
  },
  {
    publication: "Marketecture",
    title:
      "fullthrottle.ai — First-party data solutions and APIs for advertisers and publishers",
    year: 2023,
    url: "https://www.marketecture.tv/programs/fullthrottle-amol-waishampayan",
    logo: LOGOS.marketecture,
  },
  {
    publication: "Advertising Week",
    title: "AW360 Podcast: Amol Waishampayan, CPO, fullthrottle.ai",
    year: 2023,
    url: "https://advertisingweek.com/aw360-amol-waishampayan/",
    logo: LOGOS.advertisingWeek,
  },
  {
    publication: "Digiday",
    title:
      "Tech firm touts new way to generate first-party data for agencies, publishers without privacy-compliance issues",
    year: 2023,
    url: "https://digiday.com/marketing/this-tech-firm-found-a-new-way-to-generate-first-party-data-without-privacy-compliance-issues/",
    logo: LOGOS.digiday,
  },
  {
    publication: "AdExchanger",
    title:
      "Blockgraph Brings fullthrottle.ai's Cookieless Identity Strategy To TV",
    year: 2023,
    url: "https://www.adexchanger.com/tv-2/blockgraph-brings-fullthrottles-cookieless-identity-strategy-to-tv/",
    logo: LOGOS.adexchanger,
  },
  {
    publication: "MarTech Series",
    title:
      "MarTech Interview with Amol Waishampayan, Chief Product Officer at fullthrottle.ai",
    year: 2023,
    url: "https://martechseries.com/mts-insights/interviews/martech-interview-with-amol-waishampayan-chief-product-officer-at-fullthrottle/",
    logo: LOGOS.martechSeries,
  },
  {
    publication: "ABC27",
    title:
      "fullthrottle.ai Announces Issuance of Patent for Proprietary First-Party Data Technologies",
    date: "Jan 23, 2023",
    year: 2023,
    url: "https://www.globenewswire.com/en/news-release/2023/01/23/2593371/0/en/FullThrottle-Technologies-LLC-Announces-Issuance-of-Patent-for-Company-s-Proprietary-First-Party-Data-Technologies.html",
    logo: LOGOS.abc27,
  },
  {
    publication: "Rethink Research",
    title:
      "fullthrottle.ai lifts lid on fresh patent, MVPDs still scaling business",
    year: 2022,
    url: "https://rethinkresearch.biz/articles/full-throttle-lifts-lid-on-fresh-patent-mvpds-still-scaling-business/",
    logo: LOGOS.rethinkResearch,
  },
  {
    publication: "Globe Newswire",
    title:
      "fullthrottle.ai Announces Launch of Audience Flume to Offer Turnkey Access to Novel First-Party Data",
    date: "Oct 6, 2022",
    year: 2022,
    url: "https://www.globenewswire.com/news-release/2022/10/06/2529534/0/en/FullThrottle-Announces-Launch-of-Audience-Flume-to-Offer-Turnkey-Access-to-Novel-First-Party-Data.html",
    logo: LOGOS.globeNewswire,
  },
  {
    publication: "Globe Newswire",
    title:
      "Blockgraph and fullthrottle.ai Announce Integration to Unlock New Levels of Addressable Targeting for TV Advertisements",
    date: "Jun 9, 2022",
    year: 2022,
    url: "https://www.globenewswire.com/news-release/2022/06/09/2459819/0/en/Blockgraph-and-FullThrottle-Announce-Integration-to-Unlock-New-Levels-of-Addressable-Targeting-for-TV-Advertisements.html",
    logo: LOGOS.globeNewswire,
  },
  {
    publication: "Advertising Week",
    title:
      "Best practices for collecting, controlling and capitalizing on first-party data assets",
    year: 2022,
    url: "https://advertisingweek.com/why-brands-need-to-become-data-farmers/",
    logo: LOGOS.advertisingWeek,
  },
  {
    publication: "ITVT",
    title:
      "Televisionation: fullthrottle.ai's Waishampayan on First-Party Data and More",
    year: 2022,
    url: "https://itvt.com/televisionation/televisionation-fullthrottles-waishampayan-on-first-party-data-and-more/",
    logo: LOGOS.itvt,
  },
  {
    publication: "Digiday",
    title:
      "The eventual disappearance of cookies will be transformative for digital marketing",
    year: 2022,
    url: "https://digiday.com/",
    logo: LOGOS.digiday,
  },
];
