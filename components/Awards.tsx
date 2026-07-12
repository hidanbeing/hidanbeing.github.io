import Section from './Section';
import { awards, certificates } from '@/data/profile';

export default function Awards() {
  return (
    <Section id="awards" eyebrow="Awards & Certificates" title="수상 · 자격">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="mb-4 text-sm font-bold text-brand dark:text-brand-dark">수상</h3>
          <ul className="space-y-3">
            {awards.map((a) => (
              <li key={a.name} className="flex gap-4">
                <span className="shrink-0 font-mono text-xs text-neutral-400">{a.year}</span>
                <span className="text-[15px]">
                  <b className="font-semibold">{a.name}</b>
                  <span className="block text-sm text-neutral-500">{a.org}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="mb-4 text-sm font-bold text-brand dark:text-brand-dark">자격 · 어학</h3>
          <ul className="space-y-3">
            {certificates.map((c) => (
              <li key={c.name} className="flex gap-4">
                <span className="shrink-0 font-mono text-xs text-neutral-400">{c.date}</span>
                <span className="text-[15px]">
                  <b className="font-semibold">{c.name}</b>
                  <span className="block text-sm text-neutral-500">{c.org}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
