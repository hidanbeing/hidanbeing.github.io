/**
 * 판독 스트립.
 * 이 값들은 돌아가는 시스템에서 측정된 수치라, 떠 있는 스탯 카드가 아니라
 * 헤어라인으로 나뉜 계기판 한 덩어리로 읽히게 한다. 숫자는 전부 자리폭 고정 모노.
 */
export default function Metrics({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="panel grid divide-y divide-rule sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {items.map((m) => (
        <div key={m.label} className="px-5 py-6">
          <div className="font-mono text-[26px] font-medium leading-none tracking-display text-signal">
            {m.value}
          </div>
          <div className="mt-3 text-[13px] leading-snug text-muted">{m.label}</div>
        </div>
      ))}
    </div>
  );
}
