import { createHash } from "node:crypto";

import { thoughts } from "@/lib/thoughts";
import { press } from "@/lib/press";
import { timeline, facts } from "@/lib/bio";
import { site, absoluteUrl } from "@/lib/site";

/**
 * The Ask Amol grounding corpus: every published essay, the press index, and
 * the bio, assembled into one string that goes in front of every request.
 *
 * WHY THERE IS NO VECTOR DATABASE
 *
 * The whole corpus is ~40k tokens against a ~1.05M token context window, so
 * retrieval would buy nothing and cost a retrieval-miss failure mode. The
 * model sees everything on every question instead of the top-k chunks.
 * Revisit only past ~150k tokens.
 *
 * WHY THIS IS NOT A GENERATED FILE
 *
 * OpenAI caches on the longest shared prompt prefix, so this string has to be
 * byte-identical across every request or the cache misses and each call pays
 * full rate. The usual way to guarantee that is a build step emitting a
 * generated module. That is not needed here, and is worse:
 *
 *   - Every input is already a static TS module (`thoughts`, `press`, `bio`,
 *     `site`). This builder is a pure function of them, so it cannot vary
 *     between requests within a process, and cannot vary between processes
 *     built from the same commit.
 *   - A generated file adds the one failure mode this design cannot tolerate:
 *     drift between the committed artifact and the content it was built from.
 *   - Node 20 with no TS runner in this repo means a `.ts` build script would
 *     need a new toolchain dependency to import the content modules at all.
 *
 * What actually matters is the discipline, enforced by assertIsCacheable()
 * below at module scope, the same way lib/thoughts.ts fails the build on FAQ
 * drift: no timestamps, no build IDs, no Date.now(), no locale-dependent
 * formatting, no unstable sort. A single varying byte costs real money.
 *
 * Server-only. Imports node:crypto and must never reach a client bundle.
 */

/** Newest first, then slug, so equal dates cannot reorder between processes. */
function sortedThoughts() {
  return [...thoughts].sort((a, b) =>
    a.date === b.date ? a.slug.localeCompare(b.slug, "en") : a.date < b.date ? 1 : -1,
  );
}

/** Newest first, then publication, then title. Never relies on input order. */
function sortedPress() {
  return [...press].sort(
    (a, b) =>
      b.year - a.year ||
      a.publication.localeCompare(b.publication, "en") ||
      a.title.localeCompare(b.title, "en"),
  );
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function buildCorpus(): string {
  const parts: string[] = [];

  parts.push(
    "<bio>",
    `Name: ${site.name}`,
    `Role: ${site.role}, ${site.company} (${site.companyUrl})`,
    `Based: ${site.locality}, ${site.region}, ${site.country}`,
    `Contact for anything official: ${site.email}`,
    "",
    "At a glance:",
    ...facts.map((f) => `- ${f.label}: ${f.value}`),
    "",
    "Career path:",
    ...timeline.map((t) => `- ${t.period} — ${t.role}, ${t.org}. ${t.body}`),
    "</bio>",
    "",
  );

  parts.push("<press>");
  for (const item of sortedPress()) {
    parts.push(`- ${item.year} · ${item.publication} · "${item.title}" · ${item.url}`);
  }
  parts.push("</press>", "");

  for (const t of sortedThoughts()) {
    parts.push(
      `<post slug="${escapeAttr(t.slug)}"`,
      `      title="${escapeAttr(t.title)}"`,
      `      url="${escapeAttr(absoluteUrl(`/thoughts/${t.slug}`))}"`,
      `      published="${t.date}">`,
      t.excerpt,
      "",
      t.body,
      "</post>",
      "",
    );
  }

  return parts.join("\n");
}

/**
 * Fails the build if anything in the corpus could differ between two
 * processes built from the same commit. Cheap to run, and the failure it
 * prevents is silent: the cache just stops hitting and the bill goes up.
 */
function assertIsCacheable(text: string): void {
  const problems: string[] = [];

  // A rebuild inside the same process must produce the identical string. Catches
  // any non-pure input reached through the content modules.
  if (buildCorpus() !== text) {
    problems.push("buildCorpus() is not deterministic across calls");
  }

  // ISO timestamps and epoch-millis are the two shapes a stray Date leaves
  // behind. Post dates are plain YYYY-MM-DD and do not match either.
  const isoTimestamp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
  if (isoTimestamp.test(text)) {
    problems.push("contains an ISO timestamp, which will vary per build");
  }

  if (text.length < 10_000) {
    problems.push(`suspiciously short at ${text.length} chars; content may be missing`);
  }

  // The delimiter contract the system prompt tells the model to cite against.
  const openTags = (text.match(/<post /g) ?? []).length;
  const closeTags = (text.match(/<\/post>/g) ?? []).length;
  if (openTags !== thoughts.length || closeTags !== thoughts.length) {
    problems.push(
      `expected ${thoughts.length} <post> blocks, found ${openTags} open / ${closeTags} close`,
    );
  }

  if (problems.length > 0) {
    throw new Error(
      `Ask Amol corpus is not safely cacheable:\n${problems.map((p) => `  - ${p}`).join("\n")}`,
    );
  }
}

const built = buildCorpus();
assertIsCacheable(built);

/** The full grounding corpus. Frozen: mutation would invalidate the cache. */
export const CORPUS: string = Object.freeze(built) as string;

/** SHA-256 of CORPUS. Versions the prompt_cache_key so content edits rotate it. */
export const CORPUS_HASH: string = createHash("sha256").update(CORPUS, "utf8").digest("hex");

/**
 * Rough token count. Deliberately not a real tokenizer: this exists for
 * observability and the ~272k long-context surcharge guard rail, and is not
 * worth a tiktoken dependency at 4 chars/token accuracy.
 */
export const CORPUS_TOKENS_APPROX: number = Math.ceil(CORPUS.length / 4);

/** Stable across all visitors, so any request warms the cache for the next. */
export const PROMPT_CACHE_KEY = `ask-amol-${CORPUS_HASH.slice(0, 12)}`;

export const corpusStats = {
  chars: CORPUS.length,
  approxTokens: CORPUS_TOKENS_APPROX,
  hash: CORPUS_HASH,
  posts: thoughts.length,
  pressItems: press.length,
  cacheKey: PROMPT_CACHE_KEY,
} as const;
