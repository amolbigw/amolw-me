import type { Thought } from "@/lib/thoughts-types";

import { thought as dataEmpire } from "@/content/thoughts/did-you-build-a-data-empire-just-to-send-personalized-emails";
import { thought as fitnessApp } from "@/content/thoughts/i-built-a-fitness-app-in-4-hours-using-ai";
import { thought as wolves } from "@/content/thoughts/when-wolves-teach-sheep-to-build-their-own-kitchen";
import { thought as durability } from "@/content/thoughts/core-business-durability-in-the-age-of-ai";
import { thought as cfoPlaybook } from "@/content/thoughts/mid-market-agency-cfo-playbook-2026";
import { thought as fiveYearOld } from "@/content/thoughts/the-5-year-olds-guide-to-ai-part-i";
import { thought as inHouse } from "@/content/thoughts/agency-services-to-in-house-or-not-to-in-house";
import { thought as cookiesNotCanceled } from "@/content/thoughts/cookies-arent-canceled-heres-why-that-doesnt-matter";
import { thought as demystifying } from "@/content/thoughts/demystifying-ais-role-in-product-development";
import { thought as thirdParty } from "@/content/thoughts/whats-going-to-happen-to-third-party-data-assets";
import { thought as pirates } from "@/content/thoughts/pirates-wanted";
import { thought as takeBack } from "@/content/thoughts/adtech-take-back-your-data-control";
import { thought as cookiesSimplified } from "@/content/thoughts/cookies-simplified-who-and-how";

export type { Thought } from "@/lib/thoughts-types";

export const thoughts: Thought[] = [
  dataEmpire,
  fitnessApp,
  wolves,
  durability,
  cfoPlaybook,
  fiveYearOld,
  inHouse,
  cookiesNotCanceled,
  demystifying,
  thirdParty,
  pirates,
  takeBack,
  cookiesSimplified,
].sort((a, b) => (a.date < b.date ? 1 : -1));

/** Strip the markdown emphasis and line wrapping that `body` carries. */
function normalize(text: string): string {
  return text.replace(/\*+/g, "").replace(/\s+/g, " ").trim();
}

/**
 * Google requires FAQ rich-result markup to match text a visitor can actually
 * see -- both halves of the pair. Every `faqs[].q` must therefore match a
 * heading in `body`, and every `faqs[].a` a verbatim run of its prose. Running
 * this at module scope means drift fails `next build` rather than silently
 * shipping non-compliant structured data.
 */
function assertFaqsAreVisible(all: Thought[]): void {
  const problems = all.flatMap((t) => {
    const body = normalize(t.body);
    return (t.faqs ?? []).flatMap((f) =>
      (["q", "a"] as const)
        .filter((side) => !body.includes(normalize(f[side])))
        .map(
          (side) =>
            `  ${t.slug}: ${side === "q" ? "question" : "answer"} not found in body -> "${f[side].slice(0, 60)}..."`,
        ),
    );
  });

  if (problems.length > 0) {
    throw new Error(
      `FAQ answers must appear verbatim in the essay body:\n${problems.join("\n")}`,
    );
  }
}

assertFaqsAreVisible(thoughts);

export function getThought(slug: string): Thought | undefined {
  return thoughts.find((t) => t.slug === slug);
}

export function getAllThoughtSlugs(): string[] {
  return thoughts.map((t) => t.slug);
}
