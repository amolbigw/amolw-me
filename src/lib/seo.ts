import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * The generated 1200x630 card from src/app/opengraph-image.tsx. Referenced
 * explicitly because Next.js merges metadata shallowly: a page that defines
 * `openGraph` drops the image the file convention injects from the layout.
 */
const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} \u00b7 ${site.role}, ${site.company}`,
};

type PageMetaInput = {
  /** Page title, run through the root `%s · Amol Waishampayan` template. */
  title: string;
  description: string;
  /** Root-relative path, used for the canonical URL and og:url. */
  path: string;
  /** Set for article pages so Open Graph emits article:* tags. */
  article?: { publishedTime: string; modifiedTime?: string; images?: string[] };
  /** Use the title verbatim, ignoring the root title template. */
  absoluteTitle?: boolean;
};

/**
 * Next.js merges metadata shallowly, so a page that defines `openGraph` or
 * `twitter` replaces the root layout's version wholesale. Every page therefore
 * builds a complete object here rather than relying on inheritance.
 */
export function pageMeta({
  title,
  description,
  path,
  article,
  absoluteTitle,
}: PageMetaInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: article ? "article" : "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title,
      description,
      images: article?.images ?? [defaultOgImage],
      ...(article
        ? {
            publishedTime: article.publishedTime,
            ...(article.modifiedTime
              ? { modifiedTime: article.modifiedTime }
              : {}),
            authors: [site.name],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: article?.images ?? [defaultOgImage],
    },
  };
}
