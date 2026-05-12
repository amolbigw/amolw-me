import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Header } from "@/components/Header";
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
                href="https://www.linkedin.com/in/amolwaishampayan"
                target="_blank"
                rel="noopener noreferrer"
                className="-my-2 py-2 hover:text-[var(--accent)] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/amolw"
                target="_blank"
                rel="noopener noreferrer"
                className="-my-2 py-2 hover:text-[var(--accent)] transition-colors"
              >
                Instagram
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
