import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { PressRow } from "@/components/PressRow";
import { VantaGlobe } from "@/components/VantaGlobe";
import { AskAmol } from "@/components/AskAmol";
import { Accolades } from "@/components/Accolades";
import { SignalRoot } from "@/components/signal/SignalRoot";
import { SignalOrigin } from "@/components/signal/SignalOrigin";
import { SignalTerminus } from "@/components/signal/SignalTerminus";
import { Trajectory } from "@/components/signal/Trajectory";
import { ScaleSequence } from "@/components/signal/ScaleSequence";
import { press } from "@/lib/press";
import { thoughts } from "@/lib/thoughts";
import { pageMeta } from "@/lib/seo";
import { site, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta({
    title: site.title,
    description: site.description,
    path: "/",
    absoluteTitle: true,
  }),
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": absoluteUrl("/thoughts/rss.xml") },
  },
};

export default function Home() {
  const featuredPress = press.slice(0, 5);
  const featuredThoughts = thoughts.slice(0, 3);

  return (
    <>
      {/* Hero — full-bleed Vanta globe behind, content layered above */}
      <section className="relative overflow-hidden">
        <div className="hero-backdrop absolute inset-0">
          <VantaGlobe />
        </div>
        {/* Right-edge vignette only. The copy column is protected by the mask
            on .hero-backdrop, not by dimming the text's own backdrop. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[var(--background)] to-transparent to-25%"
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-16 sm:pt-28 sm:pb-28">
          <div className="reveal">
          <div className="relative text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-8">
            <SignalOrigin />
            <span className="ml-3">Co-founder · Running fullthrottle.ai</span>
          </div>

          <h1 className="font-sans text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-tight font-medium">
            Amol
            <br />
            <span className="text-[var(--accent)]">Waishampayan</span>
          </h1>

          {/* Below the headline the hero splits: copy keeps its measure on the
              left, the accolade wall takes the space the globe was using on the
              right. Above xl there is no room beside the paragraph, so the wall
              drops underneath it and widens. */}
          <div className="mt-10 flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-between xl:gap-16">
          <div className="max-w-2xl">
          <p className="text-lg sm:text-xl leading-relaxed text-[var(--muted)]">
            {/* Lead-in earns --foreground: it is the claim the accolade wall
                beside it backs up, and in --muted it reads as throat-clearing. */}
            <span className="text-[var(--foreground)]">
              Award-winning operator
            </span>
            . I run{" "}
            <a
              href="https://www.fullthrottle.ai/who-we-are/team/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--foreground)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
            >
              fullthrottle.ai
            </a>{" "}
            day to day:{" "}
            <span className="text-[var(--foreground)]">
              revenue, sales, and customer success
            </span>{" "}
            on one side,{" "}
            <span className="text-[var(--foreground)]">
              product, engineering, and operations
            </span>{" "}
            on the other, board meetings in between. Three patents, one exit, a
            100-person company, and roughly a decade spent seeing around
            corners, challenging conventional wisdom, rallying people around a
            different vision, and building until the market caught up.
          </p>

          <div className="mt-10 flex flex-wrap gap-3 text-xs uppercase tracking-widest">
            <Link
              href="/about"
              className="inline-flex min-h-11 items-center border border-[var(--border-strong)] bg-[var(--background)]/70 px-4 py-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              About →
            </Link>
            <Link
              href="/thoughts"
              className="inline-flex min-h-11 items-center border border-[var(--border-strong)] bg-[var(--background)]/70 px-4 py-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              Read writing
            </Link>
            <a
              href="mailto:amolbigw@gmail.com"
              className="inline-flex min-h-11 items-center border border-[var(--border-strong)] bg-[var(--background)]/70 px-4 py-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              Get in touch
            </a>
          </div>
          </div>

          <Accolades />
          </div>
          </div>
        </div>
      </section>

      {/* Two unnumbered interludes. The signal born at the hero drives both,
          then terminates on the 01 below. Server components inside a client
          wrapper, so only the scroll clock ships as JavaScript. */}
      <SignalRoot>
      <Trajectory />
      <ScaleSequence />

      <div className="mx-auto max-w-6xl px-6">
      {/* Ask Amol — where the signal lands */}
      <section className="pb-32">
        <SignalTerminus />
        <SectionLabel icon="chat" index="01">Ask Amol</SectionLabel>
        <div className="mt-10">
          <AskAmol />
        </div>
      </section>

      {/* Press */}
      <section className="pb-32">
        <div className="flex items-end justify-between mb-10">
          <SectionLabel icon="press" index="02">Selected press</SectionLabel>
          <Link
            href="/news"
            className="text-xs uppercase tracking-widest text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
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
          <SectionLabel icon="pen" index="03">Recent writing</SectionLabel>
          <Link
            href="/thoughts"
            className="text-xs uppercase tracking-widest text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            All →
          </Link>
        </div>
        <div className="grid gap-px bg-[var(--border)] sm:grid-cols-3">
          {featuredThoughts.map((t) => (
            <Link
              key={t.slug}
              href={`/thoughts/${t.slug}`}
              className="group bg-[var(--background)] p-6 flex flex-col gap-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="text-xs text-[var(--muted)]">
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
              <div className="mt-auto pt-2 text-xs uppercase tracking-widest text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                Read →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Currently */}
      <section className="pb-32">
        <SectionLabel icon="pulse" index="04">Currently</SectionLabel>
        <div className="mt-10 grid gap-px bg-[var(--border)] sm:grid-cols-3">
          <div className="bg-[var(--background)] p-8">
            <div className="text-xs uppercase tracking-widest text-[var(--muted)] mb-3">
              Running
            </div>
            <p className="text-base leading-relaxed">
              <a
                href="https://fullthrottle.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] underline-offset-4 hover:underline"
              >
                fullthrottle.ai
              </a>
              , end to end: revenue, sales, customer success, product,
              engineering, operations, and the board.
            </p>
          </div>
          <div className="bg-[var(--background)] p-8">
            <div className="text-xs uppercase tracking-widest text-[var(--muted)] mb-3">
              Building
            </div>
            <p className="text-base leading-relaxed">
              Identity, attribution, and AI tooling for marketers. Three issued
              patents to date.
            </p>
          </div>
          <div className="bg-[var(--background)] p-8">
            <div className="text-xs uppercase tracking-widest text-[var(--muted)] mb-3">
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
      </SignalRoot>
    </>
  );
}
