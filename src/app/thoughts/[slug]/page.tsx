import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SectionLabel } from "@/components/SectionLabel";
import { getThought, getAllThoughtSlugs } from "@/lib/thoughts";

export function generateStaticParams() {
  return getAllThoughtSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/thoughts/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const t = getThought(slug);
  if (!t) return {};
  return {
    title: `${t.title} · Amol Waishampayan`,
    description: t.excerpt,
    openGraph: {
      title: t.title,
      description: t.excerpt,
      images: t.coverImage ? [t.coverImage] : undefined,
      type: "article",
      publishedTime: t.date,
    },
  };
}

export default async function ThoughtPage(
  props: PageProps<"/thoughts/[slug]">,
) {
  const { slug } = await props.params;
  const t = getThought(slug);
  if (!t) notFound();

  const formattedDate = new Date(t.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto max-w-3xl px-6">
      <div className="pt-16 pb-8">
        <Link
          href="/thoughts"
          className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          ← All thoughts
        </Link>
      </div>

      <header className="pb-10 border-b border-[var(--border)]">
        <SectionLabel index="—">{formattedDate}</SectionLabel>
        <h1 className="mt-6 font-sans text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-tight font-medium">
          {t.title}
        </h1>
        <a
          href={t.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          Originally published on LinkedIn
          <span aria-hidden>↗</span>
        </a>
      </header>

      {t.coverImage && (
        <div className="relative my-12 aspect-[1200/627] overflow-hidden border border-[var(--border)]">
          <Image
            src={t.coverImage}
            alt={t.coverAlt || t.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="prose prose-invert mx-auto my-12 max-w-none
          prose-headings:font-sans prose-headings:font-medium prose-headings:tracking-tight
          prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl sm:prose-h2:text-3xl
          prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-xl sm:prose-h3:text-2xl
          prose-h4:mt-8 prose-h4:mb-3 prose-h4:text-lg
          prose-p:text-[var(--foreground)] prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg
          prose-li:text-[var(--foreground)] prose-li:leading-relaxed
          prose-strong:text-[var(--foreground)] prose-strong:font-medium
          prose-em:text-[var(--muted)]
          prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4
          prose-blockquote:border-l-2 prose-blockquote:border-[var(--accent)] prose-blockquote:not-italic
          prose-blockquote:text-[var(--foreground)] prose-blockquote:font-medium
          prose-blockquote:pl-6 prose-blockquote:py-1 prose-blockquote:my-8
          prose-hr:border-[var(--border)]"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{t.body}</ReactMarkdown>
      </div>

      <footer className="mt-16 mb-32 border-t border-[var(--border)] pt-8">
        <a
          href={t.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
            Read & discuss on LinkedIn
          </div>
          <div className="mt-2 text-base text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
            {t.linkedinUrl.replace(/^https?:\/\//, "")} ↗
          </div>
        </a>
      </footer>
    </article>
  );
}
