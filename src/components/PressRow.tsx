import Image from "next/image";
import type { PressItem } from "@/lib/press";

export function PressRow({ item }: { item: PressItem }) {
  const dateLabel = item.date ?? item.year;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border-b border-[var(--border)] py-5 transition-colors hover:bg-white/[0.02]"
    >
      {/* Mobile layout */}
      <div className="flex items-start gap-4 sm:hidden">
        {item.logo ? (
          <div
            className={`flex h-14 w-20 flex-shrink-0 items-center justify-center rounded-md px-2 py-1 ${
              item.logoTheme === "dark"
                ? "bg-[#1a1a1a] ring-1 ring-[var(--border)]"
                : "bg-white"
            }`}
          >
            <Image
              src={item.logo}
              alt={`${item.publication} logo`}
              width={120}
              height={48}
              className="max-h-full w-auto object-contain"
            />
          </div>
        ) : (
          <div className="flex h-14 w-20 flex-shrink-0 items-center justify-center font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
            {item.publication}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="text-base leading-snug text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
            {item.title}
          </div>
          <div className="mt-2 flex items-center gap-2 font-mono text-xs text-[var(--muted)]">
            <span>{dateLabel}</span>
            <span
              aria-hidden
              className="inline-flex h-5 w-5 items-center justify-center border border-[var(--border)] text-[10px] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors"
            >
              ↗
            </span>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:grid grid-cols-12 gap-6 items-center">
        <div className="sm:col-span-3 md:col-span-2">
          {item.logo ? (
            <div
              className={`flex h-16 w-full max-w-[160px] items-center justify-center rounded-md px-3 py-2 ${
                item.logoTheme === "dark"
                  ? "bg-[#1a1a1a] ring-1 ring-[var(--border)]"
                  : "bg-white"
              }`}
            >
              <Image
                src={item.logo}
                alt={`${item.publication} logo`}
                width={160}
                height={64}
                className="max-h-full w-auto object-contain"
              />
            </div>
          ) : (
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
              {item.publication}
            </div>
          )}
        </div>
        <div className="sm:col-span-7 md:col-span-8 text-base sm:text-[17px] leading-snug text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
          {item.title}
        </div>
        <div className="sm:col-span-2 md:col-span-2 text-right font-mono text-xs text-[var(--muted)]">
          {dateLabel}
          <span className="ml-2 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
            ↗
          </span>
        </div>
      </div>
    </a>
  );
}
