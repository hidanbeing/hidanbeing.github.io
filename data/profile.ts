export const profile = {
  name: '이단비',
  nameEn: 'Danbee Lee',
  title: 'Backend · AI · System Engineer',
  tagline: '반복되는 문제의 원인을 분석하고, 시스템으로 해결합니다.',
  summary:
    '웹 시스템을 운영하며 장애의 원인 구간을 좁혀 들어가고, 같은 문제가 다시 생기지 않도록 시스템 자체를 고쳐왔습니다. 운영 데이터가 어디에 어떤 형태로 쌓이는지 알기에, 반복 업무를 생성형 AI로 자동화할 수 있었습니다.',
  email: 'medanbee@gmail.com',
  github: 'https://github.com/hidanbeing',
  blog: '',
  resume: '/resume/이단비_이력서.pdf',
  location: '서울',
  siteUrl: 'https://hidanbeing.github.io',
} as const;

export const about = [
  {
    k: '현재',
    v: '인스웨이브 기술지원팀 (2025.04 ~ 재직 중)',
  },
  {
    k: 'Java Web 시스템 운영',
    v: '금융·공공 고객사의 Java 기반 웹 시스템을 운영하며, 장애를 화면·서버·DB 구간으로 나눠 원인을 특정합니다. Linux 서버에 접속해 WAS 로그에서 예외를 확인하고 복구합니다.',
  },
  {
    k: '생성형 AI 개발',
    v: 'RAG 기반 사내 문의 자동화 Agent를 기획·개발·운영까지 단독으로 맡아, 문의 1건당 응대 시간을 1시간에서 20분으로 줄였습니다.',
  },
  {
    k: '시스템 개발 · 운영',
    v: '요구사항 정의부터 데이터 모델링, 서버 개발, 배포, 운영까지 한 사이클을 직접 돌려봤습니다. 개인 서비스는 Docker로 환경을 구성해 Linux 서버에 배포하고 지금도 운영 중입니다.',
  },
] as const;

export const experience = [
  {
    company: '인스웨이브',
    team: '기술지원팀 · 프로',
    period: '2025.04 ~ Present',
    tasks: [
      'Java Web 시스템 운영 및 기술지원',
      '장애 분석 · 트러블슈팅 (WEB / WAS / DB 구간 진단)',
      '사내 시스템 개발 — 이슈관리 CRM · 트래커 풀스택',
      '생성형 AI 기반 업무 자동화 Agent 기획 · 개발 · 운영',
    ],
    stack: ['Java Web', 'MySQL', 'Linux', 'Python', 'RAG'],
  },
] as const;

export const awards = [
  { year: '2025.02', name: '지역대학간 캡스톤 경진대회 — 최우수상', org: '대진대학교' },
  { year: '2024.12', name: 'We-meet 프로젝트 — 교육부 장관상', org: '교육부' },
  { year: '2024.12', name: '창의설계경진대회 — 대상', org: '세종대학교' },
  { year: '2024.12', name: 'in-jeju Challenge — 총장상', org: '세종대학교' },
  { year: '2024.12', name: 'SW·AI융합경시대회 코딩경시 — 4등', org: '세종대학교' },
  { year: '2024.07', name: '캠퍼스타운 창업 아이디어톤 — 우수상', org: '세종대학교' },
] as const;

export const certificates = [
  { name: 'SQLD', org: '한국데이터산업진흥원', date: '2023.07' },
  { name: 'TOEIC Speaking IM3', org: 'ETS', date: '2025.08' },
  { name: '저작권 등록 (C-2024-052380)', org: '한국저작권위원회', date: '2024' },
] as const;

export const education = {
  school: '세종대학교 소프트웨어학과',
  period: '2020.03 – 2026.02 (졸업)',
  gpa: '전체 3.97 / 4.5 · 전공 4.02 / 4.5',
} as const;
