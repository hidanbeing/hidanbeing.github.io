import { profile } from '@/data/profile';

export default function Footer() {
  return (
    <footer className="py-14">
      <div className="container-x spine">
        <p className="label">Contact</p>

        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
            <div>
              <p className="font-mono text-[13px] tracking-technical">{profile.nameEn.toUpperCase()}</p>
              <p className="mt-1.5 text-[14px] text-muted">{profile.title}</p>
            </div>

            <div className="flex flex-wrap gap-5 font-mono text-[13px]">
              <a className="link-signal" href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
              <a className="link-signal" href={`mailto:${profile.email}`}>
                Email
              </a>
              {profile.blog && (
                <a className="link-signal" href={profile.blog} target="_blank" rel="noopener noreferrer">
                  Blog ↗
                </a>
              )}
            </div>
          </div>

          <p className="mt-10 border-t border-rule pt-5 text-[12px] leading-relaxed text-faint">
            사내 프로젝트는 보안상 화면과 코드를 공개하지 않으며, 문제 정의와 해결 방식만 기술했습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
