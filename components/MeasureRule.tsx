import { lifeline } from '@/data/profile';

/**
 * 시그니처 — 생애 눈금선.
 * "장애를 구간으로 나눠 좁혀 들어간다"는 이 포트폴리오의 논지를 형태로 쓴 것이라,
 * 균등 간격 스테퍼가 아니라 실제 연도 스케일로 그린다.
 * 학업과 경력을 각각의 트랙으로 두면 재학 중 입사한 구간이 겹쳐 보인다.
 */

/** 'YYYY.MM' → 소수 연도. 빈 문자열이면 null. */
function toYear(v: string): number | null {
  if (!v) return null;
  const [y, m] = v.split('.').map(Number);
  return y + ((m || 1) - 1) / 12;
}

const TONE: Record<string, string> = {
  faint: 'bg-ink/15',
  ink: 'bg-ink/40',
  signal: 'bg-signal',
};

export default function MeasureRule({ className = '' }: { className?: string }) {
  const now = new Date();
  const nowY = now.getFullYear() + now.getMonth() / 12;

  const birth = toYear(lifeline.birth);
  const starts = lifeline.tracks.flatMap((t) => t.segments.map((s) => toYear(s.start)!));
  const axisFrom = birth ?? Math.min(...starts);
  const span = nowY - axisFrom;
  const pct = (v: number) => ((v - axisFrom) / span) * 100;

  const step = span > 12 ? 5 : span > 6 ? 2 : 1;
  const ticks: number[] = [];
  for (let y = Math.ceil(axisFrom / step) * step; y < nowY; y += step) ticks.push(y);

  return (
    <figure className={className}>
      {/* 축 */}
      <div className="grid grid-cols-[38px_minmax(0,1fr)] gap-x-3">
        <span />
        <div>
          <div className="flex items-baseline justify-between font-mono text-[11px] tracking-technical text-faint">
            <span>{birth ? `출생 ${lifeline.birth}` : lifeline.birth}</span>
            <span className="text-signal">현재</span>
          </div>
          <div className="relative mt-2 h-2.5">
            <span className="absolute inset-x-0 top-2 h-px origin-left animate-draw bg-rule" aria-hidden />
            {ticks.map((t) => (
              <span key={t} className="absolute top-1 h-1.5 w-px bg-rule" style={{ left: `${pct(t)}%` }} aria-hidden />
            ))}
            <span className="absolute left-0 top-0 h-2.5 w-px bg-signal" aria-hidden />
            <span className="absolute right-0 top-0 h-2.5 w-px bg-signal" aria-hidden />
          </div>
        </div>
      </div>

      {/* 트랙 */}
      {lifeline.tracks.map((t) => (
        <div key={t.label} className="mt-3 grid grid-cols-[38px_minmax(0,1fr)] items-center gap-x-3">
          <span className="label text-right">{t.label}</span>
          <div className="relative h-2.5">
            <span className="absolute inset-x-0 top-1 h-px bg-rule/60" aria-hidden />
            {t.segments.map((s) => {
              const from = toYear(s.start)!;
              const to = toYear(s.end) ?? nowY;
              return (
                <span
                  key={s.name}
                  title={`${s.name} ${s.start}–${s.end || '현재'}`}
                  className={`absolute top-0 h-2.5 min-w-[3px] rounded-[2px] ${TONE[s.tone]}`}
                  style={{ left: `${pct(from)}%`, width: `${pct(to) - pct(from)}%` }}
                />
              );
            })}
          </div>
        </div>
      ))}

      <figcaption className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-faint">
        {lifeline.tracks
          .flatMap((t) => t.segments)
          .filter((s) => s.tone !== 'faint')
          .map((s) => (
            <span key={s.name}>
              {s.name} {s.start}–{s.end || '현재'}
            </span>
          ))}
      </figcaption>
    </figure>
  );
}
