import Section from './Section';
import { stackGroups } from '@/data/stack';

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

export default function TechStack() {
  return (
    <Section
      id="stack"
      eyebrow="Tech Stack"
      title="사용 기술"
      desc="실제 제품·서비스에 적용해 본 기술만 표기했습니다."
    >
      <div className="divide-y divide-rule border-y border-rule">
        {stackGroups.map((g) => (
          <div key={g.group} className="grid gap-x-8 gap-y-3 py-6 sm:grid-cols-[168px_minmax(0,1fr)]">
            <p className="label pt-1.5">{g.group}</p>
            <div className="flex flex-wrap gap-2">
              {g.items.map((t) => (
                <span key={t.name + g.group} className="chip gap-2 text-ink">
                  {t.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`${CDN}/${t.icon}.svg`}
                      alt=""
                      aria-hidden
                      width={15}
                      height={15}
                      className="h-[15px] w-[15px]"
                      loading="lazy"
                    />
                  ) : (
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
                  )}
                  {t.name}
                  {t.note && <span className="text-faint">{t.note}</span>}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
