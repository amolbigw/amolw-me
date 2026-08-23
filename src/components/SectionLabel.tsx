export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
      <span className="text-[var(--accent)]">{index}</span>
      <span className="h-px w-8 bg-[var(--border)]" />
      <span>{children}</span>
    </div>
  );
}
