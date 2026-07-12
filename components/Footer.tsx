import { profile } from '@/data/profile';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-10 dark:border-neutral-800">
      <div className="container-x flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm font-bold">{profile.nameEn.toUpperCase()}</p>
          <p className="mt-1 text-sm text-neutral-500">{profile.title}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <a className="link-brand" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="link-brand" href={`mailto:${profile.email}`}>Email</a>
          {profile.blog && <a className="link-brand" href={profile.blog} target="_blank" rel="noopener noreferrer">Blog</a>}
        </div>
      </div>
      <div className="container-x mt-6">
        <p className="text-xs leading-relaxed text-neutral-400">
          사내 프로젝트는 보안상 화면과 코드를 공개하지 않으며, 문제 정의와 해결 방식만 기술했습니다.
        </p>
      </div>
    </footer>
  );
}
