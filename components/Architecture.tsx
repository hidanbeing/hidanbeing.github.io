/**
 * 파이프라인 다이어그램.
 * 레이어는 순서가 의미를 갖는 실제 흐름이라, 좌측 스파인에 노드 마커를 찍어
 * 위에서 아래로 흐르는 걸 보이게 한다.
 */
export default function Architecture({ layers }: { layers: { layer: string; nodes: string[] }[] }) {
  return (
    <div className="panel overflow-x-auto p-6 sm:p-8">
      <ol className="min-w-[480px] space-y-0">
        {layers.map((l, i) => {
          const last = i === layers.length - 1;
          return (
            <li key={l.layer} className="grid grid-cols-[100px_20px_minmax(0,1fr)] gap-x-3">
              {/* 레이어 라벨 */}
              <span className="label pt-2.5 text-right">{l.layer}</span>

              {/* 스파인 */}
              <span className="relative flex justify-center" aria-hidden>
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-signal ring-4 ring-paper" />
                {!last && <span className="absolute top-3 h-full w-px bg-rule" />}
              </span>

              {/* 노드 */}
              <div className={`flex flex-wrap gap-1.5 ${last ? '' : 'pb-5'}`}>
                {l.nodes.map((n) => (
                  <span
                    key={n}
                    className="rounded border border-rule bg-sunken px-2.5 py-1.5 text-[13px] leading-snug text-ink"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
