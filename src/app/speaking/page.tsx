import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Talks & Interviews",
  description:
    "Keynotes, panels, and podcasts on first-party data, CTV attribution, AI for marketers, and the post-cookie web. Talks from an operator, not a theorist.",
  path: "/speaking",
});

const topics = [
  {
    title: "The post-cookie web",
    body: "Why the cookie's slow death is actually a forcing function for better identity — and what brands should be building right now.",
  },
  {
    title: "First-party data, in practice",
    body: "Moving past the buzzword: what a real first-party data strategy looks like inside a media buyer or publisher org.",
  },
  {
    title: "CTV attribution & measurement",
    body: "How addressable TV closes the loop between household data and outcome — and the patent work behind it.",
  },
  {
    title: "AI for marketers",
    body: "Where AI is genuinely moving the needle on creative, targeting, and measurement — and where it's still mostly theatre.",
  },
];

const formats = [
  "Keynote",
  "Panel",
  "Fireside chat",
  "Podcast",
  "Workshop",
  "Press interview",
];

export default function SpeakingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="pt-20 pb-16">
        <SectionLabel index="03">Speaking</SectionLabel>
        <h1 className="mt-6 font-sans text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight font-medium">
          Talks &<br />
          <span className="text-[var(--accent)]">interviews</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--muted)]">
          I speak at industry events, on podcasts, and to press on the topics
          below, from the operator&apos;s seat: I run fullthrottle.ai day to day, so
          the examples come from live decisions across revenue, product,
          engineering, and operations rather than theory. If you&apos;re putting something together, I&apos;d love to
          hear about it.
        </p>
      </section>

      <section className="pb-20">
        <SectionLabel index="04">Topics</SectionLabel>
        <div className="mt-8 grid gap-px bg-[var(--border)] sm:grid-cols-2">
          {topics.map((t, i) => (
            <div key={t.title} className="bg-[var(--background)] p-6 sm:p-8">
              <div className="font-mono text-xs text-[var(--muted)] mb-3">
                {(i + 1).toString().padStart(2, "0")}
              </div>
              <h3 className="text-xl leading-snug">{t.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <SectionLabel index="05">Formats</SectionLabel>
        <div className="mt-8 flex flex-wrap gap-2">
          {formats.map((f) => (
            <span
              key={f}
              className="inline-flex items-center border border-[var(--border)] px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-[var(--muted)]"
            >
              {f}
            </span>
          ))}
        </div>
      </section>

      <section className="pb-32">
        <SectionLabel index="06">Get in touch</SectionLabel>
        <div className="mt-8 border border-[var(--border)] p-6 sm:p-12">
          <p className="text-lg sm:text-2xl leading-snug max-w-2xl">
            Send a brief — date, audience, format, and anything specific you&apos;d
            want covered. I&apos;ll get back within a few days.
          </p>
          <a
            href="mailto:amolbigw@gmail.com?subject=Speaking inquiry"
            className="mt-8 inline-flex min-h-11 items-center font-mono text-base sm:text-sm text-[var(--accent)] underline-offset-4 hover:underline break-all"
          >
            amolbigw@gmail.com →
          </a>
        </div>
      </section>
    </div>
  );
}
