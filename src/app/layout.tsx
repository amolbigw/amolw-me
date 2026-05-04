import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { ParticleBackground } from "@/components/ParticleBackground";
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
  title: "Amol Waishampayan",
  description:
    "Co-founder & CPO at fullthrottle.ai. Writing about AI, identity, and the next era of marketing.",
  metadataBase: new URL("https://amolw.me"),
  openGraph: {
    title: "Amol Waishampayan",
    description:
      "Co-founder & CPO at fullthrottle.ai. Writing about AI, identity, and the next era of marketing.",
    url: "https://amolw.me",
    siteName: "Amol Waishampayan",
    type: "website",
  },
};

const nav = [
  { href: "/", label: "Index" },
  { href: "/news", label: "Press" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/speaking", label: "Speaking" },
  { href: "/about", label: "About" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ParticleBackground />
        <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <Link
              href="/"
              className="font-mono text-sm tracking-tight text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
            >
              <span className="text-[var(--accent)]">/</span>amolw
            </Link>
            <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
              {nav.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[var(--border)] mt-32">
          <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="font-mono text-xs text-[var(--muted)]">
              © {new Date().getFullYear()} Amol Waishampayan ·
              <span className="text-[var(--foreground)]"> built from scratch</span>
            </div>
            <div className="flex gap-5 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
              <a
                href="https://www.linkedin.com/in/amolwaishampayan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/amolw"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors"
              >
                Instagram
              </a>
              <a
                href="mailto:amolbigw@gmail.com"
                className="hover:text-[var(--accent)] transition-colors"
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
