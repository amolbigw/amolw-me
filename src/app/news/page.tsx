import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";
import { PressRow } from "@/components/PressRow";
import { press } from "@/lib/press";

export const metadata: Metadata = {
  title: "Press · Amol Waishampayan",
  description: "Selected media coverage and interviews.",
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
      <section className="pt-20 pb-16">
        <SectionLabel index="01">Press</SectionLabel>
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
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
              {year}
            </div>
            <div className="h-px flex-1 bg-[var(--border)]" />
            <div className="font-mono text-xs text-[var(--muted)]">
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
