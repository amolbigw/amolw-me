import type { PressItem } from "@/lib/press";

export function PressRow({ item }: { item: PressItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border-b border-[var(--border)] py-5 transition-colors hover:bg-white/[0.02]"
    >
      <div className="grid grid-cols-12 gap-4 items-baseline">
        <div className="col-span-12 sm:col-span-3 md:col-span-2 font-mono text-xs uppercase tracking-widest text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
          {item.publication}
        </div>
        <div className="col-span-12 sm:col-span-7 md:col-span-8 text-base sm:text-[17px] leading-snug text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
          {item.title}
        </div>
        <div className="col-span-12 sm:col-span-2 md:col-span-2 sm:text-right font-mono text-xs text-[var(--muted)]">
          {item.date ?? item.year}
          <span className="ml-2 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
            ↗
          </span>
        </div>
      </div>
    </a>
  );
}
