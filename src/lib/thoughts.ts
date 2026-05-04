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

export function getThought(slug: string): Thought | undefined {
  return thoughts.find((t) => t.slug === slug);
}

export function getAllThoughtSlugs(): string[] {
  return thoughts.map((t) => t.slug);
}
