import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { AskAmol } from "@/components/AskAmol";
import { JsonLd } from "@/components/JsonLd";
import { thoughts } from "@/lib/thoughts";
import { pageMeta } from "@/lib/seo";
import { site, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Writing & Experiments: AI, Identity & First-Party Data",
    description: `Essays on AI, identity, first-party data, and the next era of marketing. ${thoughts.length} pieces by ${site.name}, mirrored from LinkedIn.`,
    path: "/thoughts",
  }),
  alternates: {
    canonical: "/thoughts",
    types: { "application/rss+xml": absoluteUrl("/thoughts/rss.xml") },
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${site.url}/thoughts#blog`,
  url: absoluteUrl("/thoughts"),
  name: `Thoughts · ${site.name}`,
  description:
    "Essays on AI, identity, first-party data, and the next era of marketing.",
  inLanguage: "en-US",
  author: { "@id": `${site.url}/#person` },
  blogPost: thoughts.map((t) => ({
    "@type": "BlogPosting",
    headline: t.title,
    description: t.excerpt,
    url: absoluteUrl(`/thoughts/${t.slug}`),
    datePublished: t.date,
    author: { "@id": `${site.url}/#person` },
  })),
};

export default function ThoughtsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <JsonLd data={blogSchema} />
      <section className="pt-20 pb-16">
        <SectionLabel index="02">Thoughts</SectionLabel>
        <h1 className="mt-6 font-sans text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight font-medium">
          Writing &<br />
          <span className="text-[var(--accent)]">experiments</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--muted)]">
          Essays on AI, identity, first-party data, and the next era of
          marketing. Each piece is mirrored here from LinkedIn — a permanent
          home for thinking that tends to disappear into the feed.
        </p>
        <div className="mt-12">
          <AskAmol />
        </div>
      </section>

      <section className="pb-32">
        <div className="border-t border-[var(--border)]">
          {thoughts.map((t) => (
            <Link
              key={t.slug}
              href={`/thoughts/${t.slug}`}
              className="group block border-b border-[var(--border)] py-8 transition-colors hover:bg-white/[0.02]"
            >
              <div className="grid grid-cols-12 gap-x-6 gap-y-2 items-start">
                <div className="col-span-12 sm:col-span-2 font-mono text-xs uppercase tracking-widest text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors sm:pt-1 flex items-center gap-2">
                  <span>
                    {new Date(t.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </span>
                  <span aria-hidden className="sm:hidden">·</span>
                  <span aria-hidden className="sm:hidden">↗</span>
                </div>
                <div className="col-span-12 sm:col-span-7">
                  <h2 className="text-xl sm:text-2xl leading-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {t.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[var(--muted)] max-w-2xl">
                    {t.excerpt}
                  </p>
                </div>
                <div className="hidden sm:block sm:col-span-2">
                  {t.coverImage ? (
                    <div className="relative aspect-[1200/627] overflow-hidden border border-[var(--border)] bg-[var(--border)]">
                      <Image
                        src={t.coverImage}
                        alt={t.coverAlt || t.title}
                        fill
                        sizes="(min-width: 640px) 16vw, 100vw"
                        className="object-cover transition-opacity group-hover:opacity-90"
                      />
                    </div>
                  ) : null}
                </div>
                <div className="hidden sm:block sm:col-span-1 sm:text-right font-mono text-xs text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors sm:pt-1">
                  ↗
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
