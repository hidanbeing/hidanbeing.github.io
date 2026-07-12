export default function Metrics({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((m) => (
        <div key={m.label} className="rounded-xl border border-brand/20 bg-brand-soft/60 p-5 dark:border-brand-dark/25 dark:bg-brand/20">
          <div className="text-2xl font-bold tracking-tight text-brand dark:text-brand-dark">{m.value}</div>
          <div className="mt-1 text-[13px] text-neutral-600 dark:text-neutral-400">{m.label}</div>
        </div>
      ))}
    </div>
  );
}
