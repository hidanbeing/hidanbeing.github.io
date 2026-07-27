import Section from './Section';
import { experience } from '@/data/profile';

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="경력">
      <div className="space-y-10">
        {experience.map((e) => (
          <div key={e.company}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-rule pb-4">
              <h3 className="text-[19px] font-semibold tracking-display">{e.company}</h3>
              <span className="text-[14px] text-muted">{e.team}</span>
              <span className="ml-auto font-mono text-[12px] text-faint">{e.period}</span>
            </div>

            <ul className="mt-5 space-y-2.5">
              {e.tasks.map((t) => (
                <li key={t} className="flex gap-3.5 text-[15px] leading-relaxed">
                  <span className="mt-[9px] h-px w-3 shrink-0 bg-signal" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
              {e.stack.map((s) => (
                <span key={s} className="font-mono text-[12px] text-faint">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
