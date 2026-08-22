import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { thoughts } from "@/lib/thoughts";

export default function sitemap(): MetadataRoute.Sitemap {
  // thoughts is sorted newest first, so the first entry dates the index pages.
  const latestThought = new Date(thoughts[0].date);

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latestThought,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: latestThought,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/thoughts"),
      lastModified: latestThought,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/news"),
      lastModified: latestThought,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/speaking"),
      lastModified: latestThought,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...thoughts.map((t) => ({
      url: absoluteUrl(`/thoughts/${t.slug}`),
      lastModified: new Date(t.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
