import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/data/projects';

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}/`}
      className="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:border-brand/50 dark:hover:border-brand-dark/50"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {p.cover ? (
          <Image src={p.cover} alt={p.title} fill sizes="(max-width:768px) 100vw, 520px" className="object-cover object-top" />
        ) : (
          <div className="grid h-full place-items-center bg-gradient-to-br from-brand to-brand-light">
            <span className="px-6 text-center font-mono text-xs uppercase tracking-widest text-white/80">
              사내 시스템 · 화면 비공개
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center gap-2">
          <span className={`rounded px-2 py-0.5 text-[11px] font-bold ${
            p.type === 'work'
              ? 'bg-brand text-white dark:bg-brand-light'
              : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
          }`}>
            {p.type === 'work' ? '현업' : '개인 · 팀'}
          </span>
          <span className="ml-auto font-mono text-xs text-neutral-500">{p.period}</span>
        </div>

        <h3 className="text-lg font-bold tracking-tight group-hover:text-brand dark:group-hover:text-brand-dark">
          {p.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{p.subtitle}</p>

        <div className="mt-4 rounded-lg bg-brand-soft/70 px-3 py-2 text-sm font-bold text-brand dark:bg-brand/20 dark:text-brand-dark">
          {p.metrics[0].value} <span className="font-medium text-neutral-500 dark:text-neutral-400">· {p.metrics[0].label}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 5).map((s) => (
            <span key={s} className="rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-[11px] text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">{s}</span>
          ))}
        </div>

        <span className="mt-5 text-sm font-medium text-brand dark:text-brand-dark">상세 보기 →</span>
      </div>
    </Link>
  );
}
