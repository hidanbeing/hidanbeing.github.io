import Section from './Section';
import { about, education } from '@/data/profile';

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="어떤 개발자인가">
      <div className="grid gap-4 md:grid-cols-2">
        {about.map((a) => (
          <div key={a.k} className="card p-6">
            <h3 className="text-sm font-bold text-brand dark:text-brand-dark">{a.k}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">{a.v}</p>
          </div>
        ))}
      </div>
      <div className="card mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 p-6">
        <span className="text-sm font-bold text-brand dark:text-brand-dark">학력</span>
        <span className="text-[15px] font-medium">{education.school}</span>
        <span className="text-sm text-neutral-500">{education.period}</span>
        <span className="text-sm text-neutral-500">· {education.gpa}</span>
      </div>
    </Section>
  );
}
