import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";
import { thoughts } from "@/lib/thoughts";

export const metadata: Metadata = {
  title: "Thoughts · Amol Waishampayan",
  description: "Essays, comics, and short writing on AI, data, and product.",
};

export default function ThoughtsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="pt-20 pb-16">
        <SectionLabel index="02">Thoughts</SectionLabel>
        <h1 className="mt-6 font-sans text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight font-medium">
          Writing &<br />
          <span className="text-[var(--accent)]">experiments</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--muted)]">
          Essays, AI-generated fables, and the occasional take on where this is
          all going. Most posts live on the legacy site for now — new writing
          will land here.
        </p>
      </section>

      <section className="pb-32">
        <div className="border-t border-[var(--border)]">
          {thoughts.map((t) => (
            <a
              key={t.slug}
              href={t.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-b border-[var(--border)] py-8 transition-colors hover:bg-white/[0.02]"
            >
              <div className="grid grid-cols-12 gap-6 items-baseline">
                <div className="col-span-12 sm:col-span-2 font-mono text-xs uppercase tracking-widest text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                  {new Date(t.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </div>
                <div className="col-span-12 sm:col-span-9">
                  <h2 className="text-xl sm:text-2xl leading-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {t.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[var(--muted)] max-w-2xl">
                    {t.excerpt}
                  </p>
                </div>
                <div className="col-span-12 sm:col-span-1 sm:text-right font-mono text-xs text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                  ↗
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
