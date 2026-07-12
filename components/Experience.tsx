import Section from './Section';
import { experience } from '@/data/profile';

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="경력">
      {experience.map((e) => (
        <div key={e.company} className="card p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-lg font-bold">{e.company}</h3>
            <span className="text-sm text-neutral-500">{e.team}</span>
            <span className="ml-auto font-mono text-xs text-neutral-500">{e.period}</span>
          </div>
          <ul className="mt-5 space-y-2">
            {e.tasks.map((t) => (
              <li key={t} className="flex gap-3 text-[15px] text-neutral-700 dark:text-neutral-300">
                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-brand dark:bg-brand-dark" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {e.stack.map((s) => (
              <span key={s} className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">{s}</span>
            ))}
          </div>
        </div>
      ))}
    </Section>
  );
}
