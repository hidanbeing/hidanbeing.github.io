import Section from './Section';
import { stackGroups } from '@/data/stack';

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

export default function TechStack() {
  return (
    <Section id="stack" eyebrow="Tech Stack" title="사용 기술" desc="실제 제품·서비스에 적용해 본 기술만 표기했습니다.">
      <div className="space-y-6">
        {stackGroups.map((g) => (
          <div key={g.group}>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-400">{g.group}</p>
            <div className="flex flex-wrap gap-2">
              {g.items.map((t) => (
                <span
                  key={t.name + g.group}
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium dark:border-neutral-800 dark:bg-neutral-900"
                >
                  {t.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`${CDN}/${t.icon}.svg`} alt="" aria-hidden width={18} height={18} className="h-[18px] w-[18px]" loading="lazy" />
                  ) : (
                    <span aria-hidden className="grid h-[18px] w-[18px] place-items-center rounded bg-brand text-[10px] font-bold text-white dark:bg-brand-light">
                      {t.name[0]}
                    </span>
                  )}
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
