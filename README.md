# 이단비 · Portfolio

Next.js(App Router) + TypeScript + Tailwind CSS 기반 개발자 포트폴리오.
GitHub Pages에 정적 배포됩니다.

## 실행

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # out/ 에 정적 사이트 생성
```

## 구조

```
app/
  layout.tsx              # 메타태그 · OG · favicon · 다크모드 초기화
  page.tsx                # 홈 (Hero → About → Stack → Experience → Projects → Awards)
  projects/[slug]/page.tsx  # 프로젝트 상세 (아키텍처 · 기능 · 문제해결 · 성과)
components/               # UI 컴포넌트 (재사용 단위로 분리)
data/
  profile.ts              # 프로필 · 경력 · 수상 · 자격
  projects.ts             # 프로젝트 전체 데이터 (여기만 고치면 사이트 전체 반영)
public/
  images/                 # 프로젝트 스크린샷
  resume/                 # 이력서 PDF
  .nojekyll               # GitHub Pages가 _next/ 폴더를 무시하지 않도록
```

## 내용 수정

거의 모든 텍스트는 `data/` 안에 있습니다. 컴포넌트를 건드릴 일은 거의 없습니다.

## 배포

`main` 브랜치에 push하면 GitHub Actions가 빌드해서 Pages에 올립니다.
저장소 Settings → Pages → Source를 **GitHub Actions**로 설정해야 합니다.
