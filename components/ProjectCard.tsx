import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/data/projects';

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}/`}
      className="panel group flex flex-col overflow-hidden transition-colors hover:border-signal/55"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-rule bg-sunken">
        {p.cover ? (
          <Image
            src={p.cover}
            alt=""
            aria-hidden
            fill
            sizes="(max-width:768px) 100vw, 520px"
            className="object-cover object-top"
          />
        ) : (
          /* 화면 비공개 — 그라디언트 대신 눈금면으로 채운다 */
          <div className="tickline grid h-full place-items-center opacity-90">
            <span className="label bg-sunken px-3 py-1">화면 비공개 · 사내 시스템</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span
            className={`font-mono text-[11px] uppercase tracking-technical ${
              p.type === 'work' ? 'text-signal' : 'text-faint'
            }`}
          >
            {p.type === 'work' ? '현업' : '개인 · 팀'}
          </span>
          <span className="ml-auto font-mono text-[11px] text-faint">{p.period}</span>
        </div>

        <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-display transition-colors group-hover:text-signal">
          {p.title}
        </h3>
        <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">{p.subtitle}</p>

        <div className="mt-5 flex items-baseline gap-2 border-t border-rule pt-4">
          <span className="font-mono text-[17px] font-medium tracking-display text-signal">
            {p.metrics[0].value}
          </span>
          <span className="text-[13px] text-muted">{p.metrics[0].label}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 5).map((s) => (
            <span key={s} className="font-mono text-[11px] text-faint">
              {s}
            </span>
          ))}
          {p.stack.length > 5 && (
            <span className="font-mono text-[11px] text-faint">+{p.stack.length - 5}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
