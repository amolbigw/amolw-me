/**
 * Section eyebrow: index, rule, icon, title.
 *
 * Icons are inline SVG rather than an icon package. There are twelve of them at
 * 14px, so a dependency would cost more in bundle weight and API surface than
 * the paths themselves, and hand-drawing them means the stroke weight can be
 * tuned to sit with 12px uppercase Inter instead of fighting a library's
 * default.
 *
 * They are decorative: the title carries the meaning, so each is aria-hidden
 * and the label reads identically to a screen reader as it did before.
 */

export type SectionIcon =
  | "person"
  | "path"
  | "mail"
  | "chat"
  | "press"
  | "pen"
  | "pulse"
  | "mic"
  | "tag"
  | "layers"
  | "help"
  | "calendar";

/**
 * Drawn on a 16px grid, rendered at 14px. Stroke-only and inheriting
 * currentColor so each icon picks up the label's muted tone, and so the accent
 * stays reserved for the index.
 */
const PATHS: Record<SectionIcon, React.ReactNode> = {
  person: (
    <>
      <circle cx="8" cy="5.5" r="2.5" />
      <path d="M2.75 13.5c0-2.9 2.35-4.75 5.25-4.75s5.25 1.85 5.25 4.75" />
    </>
  ),
  // A stepped ascent, for a career timeline.
  path: <path d="M2 13h4V8.5h4V4h4" />,
  mail: (
    <>
      <rect x="2" y="4" width="12" height="8" rx="1.25" />
      <path d="M2.75 5.25L8 9l5.25-3.75" />
    </>
  ),
  chat: <path d="M2.75 4.5A1.5 1.5 0 0 1 4.25 3h7.5a1.5 1.5 0 0 1 1.5 1.5v4.25a1.5 1.5 0 0 1-1.5 1.5H6.25L2.75 13.5z" />,
  press: (
    <>
      <rect x="2" y="3.5" width="12" height="9" rx="1.25" />
      <path d="M4.5 6.5h4M4.5 9.5h7M10.5 6.5h1" />
    </>
  ),
  pen: (
    <>
      <path d="M11.25 2.5l2.25 2.25-7.5 7.5-3 .75.75-3z" />
      <path d="M9.75 4l2.25 2.25" />
    </>
  ),
  // Activity trace, for what is happening now.
  pulse: <path d="M2 8.25h2.75l1.75-4 2.75 8 1.75-4H14" />,
  mic: (
    <>
      <rect x="6" y="2" width="4" height="7" rx="2" />
      <path d="M3.75 7.75a4.25 4.25 0 0 0 8.5 0M8 12v2M6 14h4" />
    </>
  ),
  tag: (
    <>
      <path d="M2.5 7.75L7.75 2.5H13.5v5.75L8.25 13.5z" />
      <circle cx="10.75" cy="5.25" r="1" />
    </>
  ),
  layers: (
    <>
      <path d="M8 2.5l5.5 2.75L8 8 2.5 5.25z" />
      <path d="M2.5 8.75L8 11.5l5.5-2.75" />
    </>
  ),
  help: (
    <>
      <circle cx="8" cy="8" r="5.75" />
      <path d="M6.4 6.4A1.6 1.6 0 1 1 8 8.25v.75" />
      <path d="M8 11.15h.01" />
    </>
  ),
  calendar: (
    <>
      <rect x="2.5" y="3.75" width="11" height="9.75" rx="1.25" />
      <path d="M2.5 6.75h11M5.5 2.25v2M10.5 2.25v2" />
    </>
  ),
};

export function SectionLabel({
  index,
  icon,
  children,
}: {
  index: string;
  icon: SectionIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
      <span className="text-[var(--accent)]">{index}</span>
      <span className="h-px w-8 bg-[var(--border)]" />
      {/* Icon and title read as one unit, so they sit closer than the gap-3
          separating them from the rule. */}
      <span className="flex items-center gap-2">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 flex-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {PATHS[icon]}
        </svg>
        <span>{children}</span>
      </span>
    </div>
  );
}
