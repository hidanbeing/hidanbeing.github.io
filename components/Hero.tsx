import Image from 'next/image';
import { profile } from '@/data/profile';

export default function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col-reverse items-start gap-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{profile.title}</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.2] tracking-tight sm:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-4 text-xl font-semibold tracking-tight text-brand dark:text-brand-dark sm:text-2xl">
              {profile.tagline}
            </p>
            <p className="mt-5 leading-relaxed text-neutral-600 dark:text-neutral-400">
              {profile.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <a className="btn-solid" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a className="btn" href={`mailto:${profile.email}`}>{profile.email}</a>
              <a className="btn" href={profile.resume} download>Resume 다운로드 ↓</a>
            </div>
          </div>

          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl ring-1 ring-neutral-200 dark:ring-neutral-800 md:h-40 md:w-40">
            <Image src="/images/me.png" alt={`${profile.name} 프로필 사진`} fill sizes="160px" className="object-cover" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
