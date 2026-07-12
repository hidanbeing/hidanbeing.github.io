import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projects, getProject } from '@/data/projects';
import Metrics from '@/components/Metrics';
import Architecture from '@/components/Architecture';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.subtitle,
    openGraph: { title: p.title, description: p.subtitle, images: p.cover ? [p.cover] : ['/og.png'] },
  };
}

/** **강조** 문법만 굵게 처리 */
function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return <>{parts.map((s, i) => (i % 2 ? <b key={i} className="font-semibold text-neutral-900 dark:text-neutral-100">{s}</b> : s))}</>;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <article className="pb-20">
      {/* header */}
      <div className="border-b border-neutral-200 py-12 dark:border-neutral-800">
        <div className="container-x">
          <Link href="/#projects" className="font-mono text-xs text-neutral-500 hover:text-brand dark:hover:text-brand-dark">
            ← 프로젝트 목록
          </Link>
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{p.title}</h1>
          <p className="mt-3 max-w-3xl text-lg text-neutral-600 dark:text-neutral-400">{p.subtitle}</p>

          <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-3 text-sm">
            <div><dt className="font-mono text-xs uppercase tracking-wider text-neutral-400">기간</dt><dd className="mt-0.5 font-medium">{p.period}</dd></div>
            <div><dt className="font-mono text-xs uppercase tracking-wider text-neutral-400">역할</dt><dd className="mt-0.5 font-medium">{p.role}</dd></div>
            {p.contribution && <div><dt className="font-mono text-xs uppercase tracking-wider text-neutral-400">기여도</dt><dd className="mt-0.5 font-medium">{p.contribution}</dd></div>}
          </dl>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span key={s} className="rounded-md border border-neutral-200 px-2.5 py-1 font-mono text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">{s}</span>
            ))}
          </div>

          {(p.github || p.live) && (
            <div className="mt-6 flex gap-2">
              {p.live && <a className="btn-solid" href={p.live} target="_blank" rel="noopener noreferrer">Live ↗</a>}
              {p.github && <a className="btn" href={p.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
            </div>
          )}
        </div>
      </div>

      <div className="container-x space-y-14 pt-12">
        {/* 성과 */}
        <section>
          <h2 className="eyebrow mb-4">성과</h2>
          <Metrics items={p.metrics} />
        </section>

        {/* 개요 */}
        <section>
          <h2 className="eyebrow mb-4">Overview</h2>
          <p className="max-w-3xl text-[17px] leading-relaxed text-neutral-700 dark:text-neutral-300">{p.overview}</p>
          {p.confidential && (
            <p className="mt-4 border-l-2 border-neutral-200 pl-4 text-sm text-neutral-500 dark:border-neutral-700">
              사내 시스템이므로 화면과 코드는 공개하지 않고, 문제 정의와 해결 방식만 기술했습니다.
            </p>
          )}
        </section>

        {/* 아키텍처 */}
        {p.architecture && (
          <section>
            <h2 className="eyebrow mb-4">Architecture</h2>
            <Architecture layers={p.architecture} />
          </section>
        )}

        {/* 주요 기능 */}
        <section>
          <h2 className="eyebrow mb-4">주요 기능</h2>
          <ul className="max-w-3xl space-y-2.5">
            {p.features.map((f) => (
              <li key={f} className="flex gap-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                <span className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-brand dark:bg-brand-dark" />
                <span><Rich text={f} /></span>
              </li>
            ))}
          </ul>
        </section>

        {/* 문제 해결 */}
        <section>
          <h2 className="eyebrow mb-4">문제 해결</h2>
          <div className="space-y-4">
            {p.troubles.map((t, i) => (
              <div key={i} className="card p-6 sm:p-7">
                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-red-500">Problem</p>
                    <p className="mt-2 text-[15px] leading-relaxed">{t.problem}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-amber-500">Cause</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">{t.cause}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-600">Solution</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">{t.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 결과 */}
        <section>
          <h2 className="eyebrow mb-4">결과</h2>
          <ul className="card max-w-3xl space-y-2.5 p-6">
            {p.results.map((r) => (
              <li key={r} className="flex gap-3 text-[15px] font-medium">
                <span className="text-brand dark:text-brand-dark">✓</span>{r}
              </li>
            ))}
          </ul>
        </section>

        {/* 스크린샷 */}
        {p.images && p.images.length > 0 && (
          <section>
            <h2 className="eyebrow mb-4">화면</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {p.images.map((src) => (
                <div key={src} className="relative h-[380px] w-[186px] shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800">
                  <Image src={src} alt={`${p.title} 화면`} fill sizes="186px" className="object-contain" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
