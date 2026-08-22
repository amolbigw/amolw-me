import type { Metadata } from "next";
import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "About · Amol Waishampayan",
  description:
    "Co-founder at fullthrottle.ai, running the business day to day across revenue, sales, customer success, product, engineering, and operations. One exit, two issued patents.",
};

const timeline = [
  {
    period: "2020 — Now",
    role: "Co-founder",
    org: "fullthrottle.ai",
    body: "Run the business day to day: revenue, sales, and customer success; product, engineering, and operations; and the board. Two issued patents help protect the core methodologies the platform is built on.",
  },
  {
    period: "2016 — 2020",
    role: "VP, Platform Marketing",
    org: "Stream Companies",
    body: "Joined post-acquisition. US Top 50 privately owned integrated agency, Philadelphia.",
  },
  {
    period: "2012 — 2016",
    role: "Founder",
    org: "Maiden Media Group",
    body: "Built and ran for 4 years. Successfully acquired by Stream Companies.",
  },
  {
    period: "Earlier",
    role: "Digital Marketing",
    org: "Unilever",
    body: "Worked on Axe, Suave, and Ben & Jerry's inside Unilever's Digital Marketing Services group.",
  },
];

const facts = [
  { label: "Patents", value: "2 issued" },
  { label: "Exits", value: "1" },
  { label: "Based", value: "Philadelphia" },
  { label: "Remit", value: "Revenue · Product · Eng · Ops · Board" },
  { label: "Focus", value: "AI · CTV · first-party data" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="pt-20 pb-20">
        <SectionLabel index="00">About</SectionLabel>
        <div className="mt-6 grid gap-10 sm:grid-cols-12 sm:items-end sm:gap-12">
          <h1 className="sm:col-span-8 font-sans text-[clamp(2rem,4.5vw,4rem)] leading-[1.02] tracking-tight font-medium">
            Lifelong{" "}
            <span className="text-[var(--accent)]">entrepreneur</span>,
            currently running a company at the seam of AI and addressable TV.
          </h1>
          <div className="sm:col-span-4 relative aspect-[4/5] w-full max-w-[260px] mx-auto sm:max-w-none overflow-hidden border border-[var(--border)]">
            <Image
              src="/amol_waishampayan.jpg"
              alt="Amol Waishampayan"
              fill
              sizes="(min-width: 1280px) 384px, (min-width: 640px) 33vw, 260px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="grid gap-12 sm:grid-cols-3">
          <div className="sm:col-span-2 space-y-6 text-lg leading-relaxed text-[var(--foreground)]">
            <p>
              I co-founded{" "}
              <a
                href="https://fullthrottle.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] underline-offset-4 hover:underline"
              >
                fullthrottle.ai
              </a>{" "}
              and I run it day to day. In any given week that means revenue and
              pipeline, sales and customer success, the product roadmap, the
              engineering org, day-to-day operations, and the board.
            </p>
            <p>
              As a lifelong entrepreneur, my path includes a successful exit
              with my first start-up and more than a decade on both the agency
              and client side of global brands.
            </p>
            <p>
              I&apos;m driven by the relentless pursuit of first-party-data-powered
              AdTech — the kind of work that moves brand outcomes forward
              without trading off on consumer privacy. I enjoy speaking about
              it at industry events, and writing about it here.
            </p>
            <p className="text-[var(--muted)]">
              Outside of work: family, photography, and the slow accumulation
              of half-built side projects.
            </p>
          </div>

          <aside className="border-t border-[var(--border)] pt-6 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6 grid grid-cols-2 gap-x-6 gap-y-6 sm:flex sm:flex-col sm:gap-0 sm:space-y-6">
            {facts.map((f) => (
              <div key={f.label}>
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
                  {f.label}
                </div>
                <div className="mt-1 text-base text-[var(--foreground)]">
                  {f.value}
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="pb-32">
        <SectionLabel index="01">Path</SectionLabel>
        <div className="mt-10 border-t border-[var(--border)]">
          {timeline.map((t) => (
            <div
              key={t.period + t.org}
              className="grid grid-cols-12 gap-6 border-b border-[var(--border)] py-8"
            >
              <div className="col-span-12 sm:col-span-3 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
                {t.period}
              </div>
              <div className="col-span-12 sm:col-span-9">
                <div className="text-xl">
                  {t.role}{" "}
                  <span className="text-[var(--muted)]">· {t.org}</span>
                </div>
                <p className="mt-2 text-base leading-relaxed text-[var(--muted)] max-w-2xl">
                  {t.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-32">
        <SectionLabel index="02">Reach out</SectionLabel>
        <div className="mt-8 grid gap-px bg-[var(--border)] sm:grid-cols-3">
          <a
            href="mailto:amolbigw@gmail.com"
            className="bg-[var(--background)] p-6 hover:bg-white/[0.02] transition-colors group flex flex-col"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] group-hover:text-[var(--accent)]">
              Email
            </div>
            <div className="mt-2 text-base break-all">amolbigw@gmail.com</div>
          </a>
          <a
            href="https://www.linkedin.com/in/amolwaishampayan"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--background)] p-6 hover:bg-white/[0.02] transition-colors group flex flex-col"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] group-hover:text-[var(--accent)]">
              LinkedIn
            </div>
            <div className="mt-2 text-base">/in/amolwaishampayan</div>
          </a>
          <a
            href="https://www.instagram.com/amolw"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--background)] p-6 hover:bg-white/[0.02] transition-colors group flex flex-col"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] group-hover:text-[var(--accent)]">
              Instagram
            </div>
            <div className="mt-2 text-base">@amolw</div>
          </a>
        </div>
      </section>
    </div>
  );
}
