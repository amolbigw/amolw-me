import Image from "next/image";
import { accolades } from "@/lib/accolades";

/* Sits in the right half of the hero, on top of the globe. The globe draws in
   --accent and a mid grey, so the wall needs its own plate to stay legible;
   the plate is translucent and blurred rather than solid, which keeps the
   globe reading behind it. Marks are flex-wrapped at their natural widths —
   a grid would force a 5:1 wordmark and a 1:1 seal into the same cell. */
export function Accolades() {
  return (
    <div className="w-full xl:max-w-[420px]">
      <div className="border border-[var(--border)] bg-[var(--background)]/70 px-6 py-6 backdrop-blur-sm">
        <h2 className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
          Awards &amp; accolades
        </h2>
        <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-6">
          {accolades.map((item) => (
            <li key={item.src} title={item.name} className="leading-none">
              <Image
                src={item.src}
                alt={item.name}
                width={item.width}
                height={item.height}
                style={{ height: item.display, width: "auto" }}
                className="max-w-full opacity-70 transition-opacity duration-300 hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
