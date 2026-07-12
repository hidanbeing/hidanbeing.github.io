export default function Architecture({ layers }: { layers: { layer: string; nodes: string[] }[] }) {
  return (
    <div className="card overflow-x-auto p-6">
      <div className="min-w-[520px] space-y-3">
        {layers.map((l, i) => (
          <div key={l.layer}>
            <div className="flex items-center gap-4">
              <div className="w-28 shrink-0 text-right font-mono text-xs uppercase tracking-wider text-neutral-400">
                {l.layer}
              </div>
              <div className="flex flex-1 flex-wrap gap-2">
                {l.nodes.map((n) => (
                  <span
                    key={n}
                    className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-[13px] font-medium dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
            {i < layers.length - 1 && (
              <div className="ml-28 mt-3 flex items-center gap-2 pl-4 text-neutral-300 dark:text-neutral-600" aria-hidden>
                <svg width="10" height="14" viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 0v11M1 8l4 4 4-4" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
