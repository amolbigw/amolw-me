import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { thoughts, thoughtLastModified, latestThoughtDate } from "@/lib/thoughts";
import { pressLastModified } from "@/lib/press";
import { LAST_UPDATED as aboutLastModified } from "@/app/about/page";
import { LAST_UPDATED as speakingLastModified } from "@/app/speaking/page";

/**
 * Every entry carries a date-only <lastmod> (YYYY-MM-DD, valid per the sitemap
 * spec) sourced from the content that actually dates the page. Deliberately
 * absent:
 *
 * - changefreq and priority. Google ignores both.
 * - Any build or deploy timestamp. A lastmod that moves on every deploy is
 *   read as inaccurate and gets the field discounted across the whole site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), lastModified: latestThoughtDate },
    { url: absoluteUrl("/about"), lastModified: aboutLastModified },
    { url: absoluteUrl("/thoughts"), lastModified: latestThoughtDate },
    { url: absoluteUrl("/news"), lastModified: pressLastModified },
    { url: absoluteUrl("/speaking"), lastModified: speakingLastModified },
    ...thoughts.map((t) => ({
      url: absoluteUrl(`/thoughts/${t.slug}`),
      lastModified: thoughtLastModified(t),
    })),
  ];
}
