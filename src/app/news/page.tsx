import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";
import { PressRow } from "@/components/PressRow";
import { JsonLd } from "@/components/JsonLd";
import { press } from "@/lib/press";
import { pageMeta } from "@/lib/seo";
import { site, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "In the News: Press & Media Coverage",
  description:
    "Interviews, features, and quotes in AdExchanger, Digiday, MediaPost, NextTV, and more, mostly on first-party data, CTV attribution, and the post-cookie web.",
  path: "/news",
});

const pressSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  url: absoluteUrl("/news"),
  name: `In the News: Press & Media Coverage · ${site.name}`,
  about: { "@id": `${site.url}/#person` },
  hasPart: press.map((item) => ({
    "@type": "NewsArticle",
    headline: item.title,
    url: item.url,
    publisher: { "@type": "Organization", name: item.publication },
    ...(item.date ? { datePublished: item.date } : {}),
  })),
};

export default function NewsPage() {
  const byYear = press.reduce<Record<number, typeof press>>((acc, item) => {
    (acc[item.year] ??= []).push(item);
    return acc;
  }, {});

  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="mx-auto max-w-6xl px-6">
      <JsonLd data={pressSchema} />
      <section className="pt-20 pb-16">
        <SectionLabel icon="press" index="01">Press</SectionLabel>
        <h1 className="mt-6 font-sans text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight font-medium">
          In the <span className="text-[var(--accent)]">news</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--muted)]">
          Interviews, features, and quotes — mostly on first-party data, CTV
          attribution, and the post-cookie web.
        </p>
      </section>

      {years.map((year) => (
        <section key={year} className="pb-20">
          <div className="mb-6 flex items-baseline gap-4">
            <div className="text-xs uppercase tracking-widest text-[var(--muted)]">
              {year}
            </div>
            <div className="h-px flex-1 bg-[var(--border)]" />
            <div className="text-xs text-[var(--muted)]">
              {byYear[year].length.toString().padStart(2, "0")}
            </div>
          </div>
          <div>
            {byYear[year].map((item) => (
              <PressRow key={item.url} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
