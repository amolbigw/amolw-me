/**
 * Single source of truth for site-wide identity, used by metadata, JSON-LD,
 * the sitemap, robots.txt, and the RSS feed.
 */
export const site = {
  url: "https://www.amolw.me",
  name: "Amol Waishampayan",
  role: "Co-founder",
  company: "fullthrottle.ai",
  companyUrl: "https://fullthrottle.ai",
  locality: "Philadelphia",
  region: "PA",
  country: "US",
  email: "amolbigw@gmail.com",
  linkedin: "https://www.linkedin.com/in/amolw",
  instagram: "https://www.instagram.com/amolw",
  wikidata: "https://www.wikidata.org/entity/Q141311145",
  title: "Amol Waishampayan · Co-founder, fullthrottle.ai",
  description:
    "Co-founder of fullthrottle.ai, running the business across revenue, sales, customer success, product, engineering, and operations. Three patents, one exit.",
  keywords: [
    "Amol Waishampayan",
    "fullthrottle.ai",
    "first-party data",
    "CTV attribution",
    "AdTech",
    "household identity resolution",
    "AI in marketing",
    "post-cookie advertising",
  ],
  knowsAbout: [
    "First-party data",
    "AdTech",
    "Connected TV advertising",
    "Marketing attribution",
    "Household identity resolution",
    "Artificial intelligence in marketing",
  ],
} as const;

/** Feeds `sameAs` on the Person node. Wikidata is an authority record
    rather than a social profile, but `sameAs` is where it belongs. */
export const socialProfiles = [site.linkedin, site.instagram, site.wikidata];

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}
