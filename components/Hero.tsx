import Image from 'next/image';
import MeasureRule from './MeasureRule';
import { profile } from '@/data/profile';

export default function Hero() {
  return (
    <section className="border-b border-rule py-16 sm:py-24">
      <div className="container-x">
        {/* 텍스트 블록과 사진이 나란히 선다. 모바일에서는 사진이 위로. */}
        <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-12">
          <div className="min-w-0">
            <p className="label-signal animate-rise">{profile.title}</p>

            <h1 className="mt-5 animate-rise text-2xl font-medium tracking-display [animation-delay:60ms]">
              {profile.name}
              <span className="ml-3 font-mono text-sm font-normal tracking-technical text-faint">
                {profile.nameEn.toUpperCase()}
              </span>
            </h1>

            {/* 논지 — 페이지에서 가장 큰 글자는 이름이 아니라 이 문장이다 */}
            <p className="mt-7 animate-rise text-[32px] font-semibold leading-[1.25] tracking-display [animation-delay:120ms] sm:text-[42px]">
              {profile.tagline}
            </p>
          </div>

          {/* 원본 비율(207×266) 그대로 — 정사각으로 자르면 얼굴이 잘린다 */}
          <div className="relative order-first aspect-[207/266] w-28 shrink-0 animate-rise overflow-hidden rounded-lg border border-rule sm:order-none sm:mt-12 sm:w-40 [animation-delay:60ms]">
            <Image
              src="/images/me.png"
              alt={`${profile.name} 프로필 사진`}
              fill
              sizes="(max-width:640px) 112px, 160px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <MeasureRule className="mt-14 max-w-3xl" />

        <div className="mt-14 grid gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <p className="max-w-prose animate-rise text-[15px] leading-[1.75] text-muted [animation-delay:300ms]">
            {profile.summary}
          </p>

          <div className="flex animate-rise flex-wrap items-start gap-2 [animation-delay:360ms]">
            <a className="btn-solid" href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a className="btn" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            {profile.resume && (
              <a className="btn" href={profile.resume} download>
                Resume ↓
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
