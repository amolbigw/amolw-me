export type Thought = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  externalUrl?: string;
};

export const thoughts: Thought[] = [
  {
    slug: "ai-tale-elara-garlic",
    title: "AI Tale — The Culinary Odyssey of Elara",
    date: "2023-08-14",
    excerpt:
      "A village woman discovers garlic and turns it into a regional sensation. A short fable about distribution, taste, and the slow spread of new ingredients.",
    externalUrl:
      "https://amolw.me/thoughts/2023/8/ai-tale-the-culinary-odyssey-of-elara-unearthing-the-secret-of-garlic",
  },
  {
    slug: "ai-comic-kael-watermelon",
    title: "AI Comic — Whispers of the Desert: Kael's Watermelon Discovery",
    date: "2023-08-12",
    excerpt:
      "A nomadic hunter finds a watermelon in the desert and brings it home. A comic about discovery economics in tight communities.",
    externalUrl:
      "https://amolw.me/thoughts/2023/8/ai-comic-whispers-of-the-desert-kaels-watermelon-discovery",
  },
  {
    slug: "alex-worker-2045",
    title: "AI Comic — Alex, Worker of 2045. A day in the life.",
    date: "2023-06-26",
    excerpt:
      "A speculative day-in-the-life: blockchain, NFTs, and Web3 woven into ordinary work. What does the boring middle of the future look like?",
    externalUrl:
      "https://amolw.me/thoughts/2023/6/alex-worker-of-the-future-a-day-in-the-life-of-2045",
  },
  {
    slug: "ai-product-development",
    title: "Demystifying AI's Role in Product Development",
    date: "2023-06-04",
    excerpt:
      "AI holds significant potential, but the human creative loop is still doing the heavy lifting. A balanced look at where AI helps and where it doesn't — yet.",
    externalUrl:
      "https://amolw.me/thoughts/2023/6/demystifying-ais-role-in-product-development-a-balanced-perspective",
  },
  {
    slug: "third-party-data-assets",
    title: "What's Going To Happen To Third-Party Data Assets?",
    date: "2022-07-28",
    excerpt:
      "Privacy regulation is reshaping the third-party market. The play isn't to mourn the cookie — it's to convert third-party audiences into first-party household relationships.",
    externalUrl:
      "https://amolw.me/thoughts/2022/7/whats-going-to-happen-to-third-party-data-assets",
  },
];
