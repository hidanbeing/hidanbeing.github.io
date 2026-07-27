import Section from './Section';
import { awards, certificates } from '@/data/profile';

function List({ heading, items }: { heading: string; items: { when: string; name: string; org: string }[] }) {
  return (
    <div>
      <p className="label border-b border-rule pb-3">{heading}</p>
      <ul className="divide-y divide-rule">
        {items.map((it) => (
          <li key={it.name} className="flex gap-4 py-4">
            <span className="w-[60px] shrink-0 pt-0.5 font-mono text-[12px] text-faint">{it.when}</span>
            <span>
              <span className="block text-[15px] font-medium leading-snug">{it.name}</span>
              <span className="mt-0.5 block text-[13px] text-muted">{it.org}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Awards() {
  return (
    <Section id="awards" eyebrow="Awards & Certs" title="수상 · 자격">
      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        <List heading="수상" items={awards.map((a) => ({ when: a.year, name: a.name, org: a.org }))} />
        <List heading="자격 · 어학" items={certificates.map((c) => ({ when: c.date, name: c.name, org: c.org }))} />
      </div>
    </Section>
  );
}
