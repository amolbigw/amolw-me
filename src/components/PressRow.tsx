import Image from "next/image";
import type { PressItem } from "@/lib/press";

export function PressRow({ item }: { item: PressItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border-b border-[var(--border)] py-5 transition-colors hover:bg-white/[0.02]"
    >
      <div className="grid grid-cols-12 gap-4 sm:gap-6 items-center">
        <div className="col-span-12 sm:col-span-3 md:col-span-2">
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
