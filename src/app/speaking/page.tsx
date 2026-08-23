import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

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

/**
 * Rendered on the page and used to build the FAQPage schema below, so the
 * markup can never claim a question the page does not actually answer.
 */
const faqs = [
  {
    q: "What topics does Amol Waishampayan speak on?",
    a: "Four core topics: the post-cookie web, first-party data in practice, CTV attribution and measurement, and AI for marketers. Each one comes from running an AdTech business day to day rather than from research, so talks lean on live decisions and real numbers.",
  },
  {
    q: "What speaking formats are available?",
    a: "Keynote, panel, fireside chat, podcast, workshop, and press interview. Sessions can be tailored to a keynote slot, a moderated panel, or a working session with a smaller team.",
  },
  {
    q: "What should a speaking request include?",
    a: "Send a brief with the date, the audience, the format, and anything specific you want covered. Knowing who is in the room matters more than the topic label, since the same subject lands differently for a CFO, a media buyer, and a publisher.",
  },
  {
    q: "How quickly will I hear back about a speaking inquiry?",
    a: "Within a few days. Email is the fastest route and reaches Amol directly rather than a booking desk.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: absoluteUrl("/speaking"),
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function SpeakingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <JsonLd data={faqSchema} />
      <section className="pt-20 pb-16">
        <SectionLabel icon="mic" index="03">Speaking</SectionLabel>
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
        <SectionLabel icon="tag" index="04">Topics</SectionLabel>
        <div className="mt-8 grid gap-px bg-[var(--border)] sm:grid-cols-2">
          {topics.map((t, i) => (
            <div key={t.title} className="bg-[var(--background)] p-6 sm:p-8">
              <div className="text-xs text-[var(--muted)] mb-3">
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
        <SectionLabel icon="layers" index="05">Formats</SectionLabel>
        <div className="mt-8 flex flex-wrap gap-2">
          {formats.map((f) => (
            <span
              key={f}
              className="inline-flex items-center border border-[var(--border-strong)] px-4 py-2.5 text-xs uppercase tracking-widest text-[var(--muted)]"
            >
              {f}
            </span>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <SectionLabel icon="help" index="06">Questions</SectionLabel>
        <div className="mt-8 border-t border-[var(--border)]">
          {faqs.map((f) => (
            <div
              key={f.q}
              className="grid grid-cols-12 gap-x-6 gap-y-3 border-b border-[var(--border)] py-8"
            >
              <h3 className="col-span-12 sm:col-span-5 text-lg leading-snug text-[var(--foreground)]">
                {f.q}
              </h3>
              <p className="col-span-12 sm:col-span-7 text-base leading-relaxed text-[var(--muted)]">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-32">
        <SectionLabel icon="mail" index="07">Get in touch</SectionLabel>
        <div className="mt-8 border border-[var(--border)] p-6 sm:p-12">
          <p className="text-lg sm:text-2xl leading-snug max-w-2xl">
            Send a brief — date, audience, format, and anything specific you&apos;d
            want covered. I&apos;ll get back within a few days.
          </p>
          <a
            href="mailto:amolbigw@gmail.com?subject=Speaking inquiry"
            className="mt-8 inline-flex min-h-11 items-center text-base sm:text-sm text-[var(--accent)] underline-offset-4 hover:underline break-all"
          >
            amolbigw@gmail.com →
          </a>
        </div>
      </section>
    </div>
  );
}
