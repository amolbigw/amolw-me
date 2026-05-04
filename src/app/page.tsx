import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { PressRow } from "@/components/PressRow";
import { press } from "@/lib/press";
import { thoughts } from "@/lib/thoughts";

export default function Home() {
  const featuredPress = press.slice(0, 5);
  const featuredThoughts = thoughts.slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Hero */}
      <section className="pt-20 pb-32 sm:pt-28 sm:pb-40">
        <div className="reveal">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-8">
            <span className="text-[var(--accent)]">●</span>
            <span className="ml-3">Co-founder · CPO · fullthrottle.ai</span>
          </div>

          <h1 className="font-sans text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-tight font-medium">
            Amol
            <br />
            <span className="text-[var(--accent)]">Waishampayan</span>
          </h1>

          <p className="mt-10 max-w-2xl text-lg sm:text-xl leading-relaxed text-[var(--muted)]">
            I build product at the seam between{" "}
            <span className="text-[var(--foreground)]">first-party data</span>,{" "}
            <span className="text-[var(--foreground)]">AI</span>, and{" "}
            <span className="text-[var(--foreground)]">television</span>. Two
            patents, one exit, and roughly a decade convincing brands that the
            household — not the cookie — is the unit of attention.
          </p>

          <div className="mt-10 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-widest">
            <Link
              href="/about"
              className="border border-[var(--border)] px-4 py-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              About →
            </Link>
            <Link
              href="/thoughts"
              className="border border-[var(--border)] px-4 py-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              Read writing
            </Link>
            <a
              href="mailto:amolbigw@gmail.com"
              className="border border-[var(--border)] px-4 py-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="pb-32">
        <div className="flex items-end justify-between mb-10">
          <SectionLabel index="01">Selected press</SectionLabel>
          <Link
            href="/news"
            className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            All →
          </Link>
        </div>
        <div>
          {featuredPress.map((item) => (
            <PressRow key={item.url} item={item} />
          ))}
        </div>
      </section>

      {/* Thoughts */}
      <section className="pb-32">
        <div className="flex items-end justify-between mb-10">
          <SectionLabel index="02">Recent writing</SectionLabel>
          <Link
            href="/thoughts"
            className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            All →
          </Link>
        </div>
        <div className="grid gap-px bg-[var(--border)] sm:grid-cols-3">
          {featuredThoughts.map((t) => (
            <a
              key={t.slug}
              href={t.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[var(--background)] p-6 flex flex-col gap-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="font-mono text-xs text-[var(--muted)]">
                {new Date(t.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <h3 className="text-lg leading-snug text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                {t.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--muted)] line-clamp-3">
                {t.excerpt}
              </p>
              <div className="mt-auto pt-2 font-mono text-xs uppercase tracking-widest text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                Read ↗
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Currently */}
      <section className="pb-32">
        <SectionLabel index="03">Currently</SectionLabel>
        <div className="mt-10 grid gap-px bg-[var(--border)] sm:grid-cols-2">
          <div className="bg-[var(--background)] p-8">
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-3">
              Building
            </div>
            <p className="text-base leading-relaxed">
              Identity, attribution, and AI tooling for marketers at{" "}
              <a
                href="https://fullthrottle.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] underline-offset-4 hover:underline"
              >
                fullthrottle.ai
              </a>
              . Two issued patents to date.
            </p>
          </div>
          <div className="bg-[var(--background)] p-8">
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-3">
              Open to
            </div>
            <p className="text-base leading-relaxed">
              Speaking on first-party data, CTV, and the post-cookie web.
              Podcasts, panels, and the occasional keynote.{" "}
              <Link
                href="/speaking"
                className="text-[var(--accent)] underline-offset-4 hover:underline"
              >
                Topics →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
