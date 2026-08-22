import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site, socialProfiles, absoluteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Pages set a short title; this template appends the name. Pages that want
  // the title verbatim use `title.absolute` (see src/lib/seo.ts).
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [...site.keywords],
  category: "technology",
  formatDetection: { telephone: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

/**
 * Rendered on every page so the `@id` references used by the per-page
 * BlogPosting / Blog / CollectionPage nodes always resolve.
 */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  url: site.url,
  image: absoluteUrl("/amol_waishampayan.jpg"),
  jobTitle: site.role,
  description: site.description,
  email: `mailto:${site.email}`,
  worksFor: {
    "@type": "Organization",
    name: site.company,
    url: site.companyUrl,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressRegion: site.region,
    addressCountry: site.country,
  },
  knowsAbout: [...site.knowsAbout],
  sameAs: socialProfiles,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: "en-US",
  author: { "@id": `${site.url}/#person` },
  publisher: { "@id": `${site.url}/#person` },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
        <ParticleBackground />
        <Header />

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[var(--border)] mt-32">
          <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="font-mono text-xs text-[var(--muted)]">
              © {new Date().getFullYear()} Amol Waishampayan ·
              <span className="text-[var(--foreground)]"> built from scratch</span>
            </div>
            <div className="flex gap-6 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="-my-2 py-2 hover:text-[var(--accent)] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:amolbigw@gmail.com"
                className="-my-2 py-2 hover:text-[var(--accent)] transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
