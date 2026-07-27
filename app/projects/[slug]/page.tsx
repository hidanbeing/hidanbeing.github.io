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
  return <>{parts.map((s, i) => (i % 2 ? <b key={i} className="font-semibold text-ink">{s}</b> : s))}</>;
}

/** 섹션 라벨은 좌측 스파인에 상주 — 홈과 같은 리듬 */
function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="spine border-b border-rule py-12">
      <p className="label lg:sticky lg:top-20 lg:self-start">{label}</p>
      <div>{children}</div>
    </section>
  );
}

const POLES = [
  { key: 'problem', label: 'Problem', tone: 'text-flag' },
  { key: 'cause', label: 'Cause', tone: 'text-warn' },
  { key: 'solution', label: 'Solution', tone: 'text-verify' },
] as const;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <article>
      {/* 헤더 */}
      <div className="border-b border-rule py-12 sm:py-16">
        <div className="container-x">
          <Link href="/#projects" className="label transition-colors hover:text-ink">
            ← 프로젝트 목록
          </Link>

          <h1 className="mt-7 max-w-4xl text-[30px] font-semibold leading-[1.25] tracking-display sm:text-[40px]">
            {p.title}
          </h1>
          <p className="mt-4 max-w-prose text-[16px] leading-relaxed text-muted">{p.subtitle}</p>

          <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-4 border-t border-rule pt-6">
            <div>
              <dt className="label">기간</dt>
              <dd className="mt-1.5 font-mono text-[14px]">{p.period}</dd>
            </div>
            <div>
              <dt className="label">역할</dt>
              <dd className="mt-1.5 text-[14px]">{p.role}</dd>
            </div>
            {p.contribution && (
              <div>
                <dt className="label">기여도</dt>
                <dd className="mt-1.5 font-mono text-[14px] text-signal">{p.contribution}</dd>
              </div>
            )}
          </dl>

          <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5">
            {p.stack.map((s) => (
              <span key={s} className="font-mono text-[12px] text-faint">
                {s}
              </span>
            ))}
          </div>

          {(p.github || p.live || p.links?.length) && (
            <div className="mt-8 flex flex-wrap gap-2">
              {p.live && (
                <a className="btn-solid" href={p.live} target="_blank" rel="noopener noreferrer">
                  Live ↗
                </a>
              )}
              {p.github && (
                <a className="btn" href={p.github} target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </a>
              )}
              {p.links?.map((l) => (
                <a key={l.url} className="btn" href={l.url} target="_blank" rel="noopener noreferrer">
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container-x">
        <Block label="성과">
          <Metrics items={p.metrics} />
        </Block>

        <Block label="Overview">
          <p className="max-w-prose text-[16px] leading-[1.8] text-ink">{p.overview}</p>
          {p.confidential && (
            <p className="mt-6 border-l-2 border-rule pl-4 text-[13px] leading-relaxed text-faint">
              사내 시스템이므로 화면과 코드는 공개하지 않고, 문제 정의와 해결 방식만 기술했습니다.
            </p>
          )}
        </Block>

        {p.architecture && (
          <Block label="Architecture">
            <Architecture layers={p.architecture} />
          </Block>
        )}

        <Block label="주요 기능">
          <ul className="max-w-prose space-y-3">
            {p.features.map((f) => (
              <li key={f} className="flex gap-3.5 text-[15px] leading-[1.75] text-muted">
                <span className="mt-[11px] h-px w-3 shrink-0 bg-signal" aria-hidden />
                <span>
                  <Rich text={f} />
                </span>
              </li>
            ))}
          </ul>
        </Block>

        {/* 문제 해결 — 이 페이지의 본론.
            P → C → S는 실제 진단 순서라 순서가 정보를 담는다. */}
        <Block label="문제 해결">
          <div className="space-y-4">
            {p.troubles.map((t, i) => (
              <div key={i} className="panel p-6 sm:p-7">
                <div className="space-y-5">
                  {POLES.map((pole) => (
                    <div key={pole.key} className="grid gap-x-6 gap-y-1.5 sm:grid-cols-[92px_minmax(0,1fr)]">
                      <p className={`font-mono text-[11px] uppercase tracking-technical sm:pt-1 ${pole.tone}`}>
                        {pole.label}
                      </p>
                      <p
                        className={`max-w-prose text-[15px] leading-[1.75] ${
                          pole.key === 'problem' ? 'text-ink' : 'text-muted'
                        }`}
                      >
                        <Rich text={t[pole.key]} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Block>

        <Block label="결과">
          <ul className="max-w-prose divide-y divide-rule border-y border-rule">
            {p.results.map((r) => (
              <li key={r} className="flex gap-3.5 py-3.5 text-[15px] leading-relaxed">
                <span className="mt-0.5 shrink-0 font-mono text-[13px] text-verify" aria-hidden>
                  ✓
                </span>
                {r}
              </li>
            ))}
          </ul>
        </Block>

        {/* 포스터·발표자료 — 읽으라고 있는 이미지라 전체 폭으로 크게, 원본은 새 탭에서 */}
        {p.documents?.map((d) => (
          <Block key={d.src} label={d.label}>
            <a
              href={d.src}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-lg border border-rule bg-raised transition-colors hover:border-signal/55"
            >
              <Image
                src={d.src}
                alt={`${p.title} — ${d.label}`}
                width={1012}
                height={1448}
                sizes="(max-width:1024px) 100vw, 760px"
                className="h-auto w-full"
              />
            </a>
            <p className="label mt-3">클릭하면 원본 크기로 열립니다</p>
          </Block>
        ))}

        {p.images && p.images.length > 0 && (
          <Block label="화면">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {p.images.map((src) => (
                <div
                  key={src}
                  className="relative h-[380px] w-[186px] shrink-0 overflow-hidden rounded border border-rule bg-raised"
                >
                  <Image src={src} alt={`${p.title} 화면`} fill sizes="186px" className="object-contain" />
                </div>
              ))}
            </div>
          </Block>
        )}
      </div>
    </article>
  );
}
