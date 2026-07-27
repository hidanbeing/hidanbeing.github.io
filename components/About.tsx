import Section from './Section';
import { about, education, hobbies } from '@/data/profile';

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="어떤 개발자인가">
      <dl className="divide-y divide-rule border-y border-rule">
        {about.map((a) => (
          <div key={a.k} className="grid gap-x-8 gap-y-2 py-6 sm:grid-cols-[168px_minmax(0,1fr)]">
            <dt className="text-[14px] font-semibold leading-relaxed text-ink">{a.k}</dt>
            <dd className="max-w-prose text-[15px] leading-[1.75] text-muted">{a.v}</dd>
          </div>
        ))}

        <div className="grid gap-x-8 gap-y-2 py-6 sm:grid-cols-[168px_minmax(0,1fr)]">
          <dt className="text-[14px] font-semibold leading-relaxed text-ink">학력</dt>
          <dd className="text-[15px] leading-[1.75] text-muted">
            <span className="text-ink">{education.school}</span>
            <span className="ml-2 font-mono text-[12px] text-faint">{education.period}</span>
            <span className="mt-1 block font-mono text-[12px] text-faint">{education.gpa}</span>
          </dd>
        </div>

        <div className="grid gap-x-8 gap-y-2 py-6 sm:grid-cols-[168px_minmax(0,1fr)]">
          <dt className="text-[14px] font-semibold leading-relaxed text-ink">취미</dt>
          <dd className="text-[15px] leading-[1.75] text-muted">{hobbies}</dd>
        </div>
      </dl>
    </Section>
  );
}
