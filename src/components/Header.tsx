"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/news", label: "Press" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/speaking", label: "Speaking" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:py-5">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <span className="text-[var(--accent)]">/</span>amolw
        </Link>

        <nav className="hidden sm:flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "text-[var(--foreground)] transition-colors"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden -mr-2 inline-flex h-11 w-11 items-center justify-center text-[var(--foreground)]"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-px w-5 bg-current transition-transform ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="sm:hidden border-t border-[var(--border)] bg-[var(--background)]"
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-6 py-2 font-mono text-sm uppercase tracking-widest">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between border-b border-[var(--border)] py-4 last:border-b-0 transition-colors ${
                  active
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden
                  className={active ? "text-[var(--accent)]" : "text-[var(--muted)]"}
                >
                  →
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
