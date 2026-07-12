export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  contribution?: string;
  type: 'work' | 'side';
  confidential?: boolean;
  cover?: string;
  images?: string[];
  stack: string[];
  /** 성과 — 상단에 크게 강조 */
  metrics: { value: string; label: string }[];
  overview: string;
  /** 아키텍처 다이어그램: 레이어 → 노드 */
  architecture?: { layer: string; nodes: string[] }[];
  features: string[];
  /** 문제 해결: 문제 → 원인 → 해결 */
  troubles: { problem: string; cause: string; solution: string }[];
  results: string[];
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    slug: 'ai-agent',
    title: '생성형 AI(RAG) 문의 자동화 Agent',
    subtitle: '반복 유입되는 사내 기술 문의를 자동 분석해, 근거와 함께 답변 초안을 제시하는 Agent',
    period: '2026.03 – 진행 중',
    role: '기획 · 개발 · 운영 (단독)',
    contribution: '100%',
    type: 'work',
    confidential: true,
    stack: ['Java', 'Spring Boot', 'Python', 'RAG', 'OpenAI', 'MySQL', 'Linux'],
    metrics: [
      { value: '1h → 20m', label: '문의 1건당 응대 시간' },
      { value: '67%', label: '응대 시간 단축률' },
      { value: '운영 중', label: '현재 사내 서비스 상태' },
    ],
    overview:
      '같은 문의가 반복 유입되는데 담당자는 매번 과거 대응 사례를 수작업으로 검색하고 있었습니다. 대응 가이드를 정리해도 반복 자체는 사라지지 않았습니다. 사내 게시판(W-Tech)의 문의를 분석해 기술 문서와 과거 사례를 RAG로 검색하고, 근거와 함께 답변 초안을 제시하는 Agent를 기획부터 운영까지 단독으로 맡았습니다.',
    architecture: [
      { layer: 'Client', nodes: ['사내 게시판 (W-Tech)'] },
      { layer: 'Server', nodes: ['Spring Boot API', '문의 파싱 · 라우팅'] },
      { layer: 'AI Pipeline', nodes: ['문서 임베딩', 'RAG 검색', '우선순위 랭킹', '답변 초안 생성'] },
      { layer: 'Data', nodes: ['기술 문서', '과거 대응 이력 (MySQL)'] },
      { layer: 'Ops', nodes: ['예외 로깅', 'Linux 서버 운영'] },
    ],
    features: [
      '사내 게시판에 등록된 문의를 자동 분석해 유형을 분류',
      '기술 문서와 과거 대응 사례를 RAG로 검색해 **근거와 함께** 답변 초안 제시',
      '참조 문서의 우선순위 기준을 정의해 잘못된 답변(오답) 감소',
      '운영 중 발생하는 예외를 로그로 남겨 원인 추적 가능하도록 설계',
      '사내 데이터를 외부로 내보내지 않는 실행 방식을 채택해 보안 요건 충족',
    ],
    troubles: [
      {
        problem: '검색된 문서가 많을수록 엉뚱한 근거를 인용해 답변 품질이 떨어졌습니다.',
        cause: '유사도만으로 문서를 고르면, 최신 개정 문서와 오래된 문서가 동등하게 취급됐습니다.',
        solution: '참조 문서의 우선순위 기준(문서 종류 · 최신성)을 정의해 랭킹에 반영하고, 근거 문서를 답변과 함께 노출해 담당자가 검증할 수 있게 했습니다.',
      },
      {
        problem: '유료 LLM API를 그대로 붙이기에는 비용과 보안 검토가 걸렸습니다.',
        cause: '사내 문의에는 고객사 정보가 포함될 수 있어, 데이터를 외부로 전송하는 구조는 채택할 수 없었습니다.',
        solution: '사내 데이터를 외부로 내보내지 않는 실행 방식을 제안 · 적용해 별도 API 비용 없이 운영했습니다.',
      },
    ],
    results: [
      '문의 1건당 평균 응대 시간을 1시간 → 20분으로 단축 (약 67%)',
      '신규 담당자도 과거 대응 사례를 즉시 참조할 수 있는 환경 구축',
      '현재까지 사내에서 운영 중',
    ],
  },
  {
    slug: 'crm-tracker',
    title: 'CRM · 이슈 트래커',
    subtitle: '메일·메신저에 흩어진 기술지원 대응 이력을 한 화면에서 추적하는 사내 시스템',
    period: '2025.10 – 2026.05',
    role: '풀스택 개발 (요구사항 · 데이터 모델링 · 서버 · 운영)',
    contribution: '70%',
    type: 'work',
    confidential: true,
    stack: ['Java', 'Spring', 'MySQL', '데이터 모델링', 'Linux', 'AWS'],
    metrics: [
      { value: '1,000건+', label: '누락 없이 추적한 누적 이슈' },
      { value: '단일 환경', label: '파편화된 대응 이력 통합' },
      { value: '4단계', label: '정의한 이슈 상태 모델' },
    ],
    overview:
      '대응 이력이 메일과 메신저에 흩어져 있어, 같은 문의가 다시 들어와도 누가 어떻게 처리했는지 찾을 수 없었습니다. "기록을 더 잘하자"는 약속으로는 풀리지 않는 문제라고 보고, 업무 흐름 자체를 시스템으로 옮겼습니다.',
    architecture: [
      { layer: 'Client', nodes: ['이슈 목록 · 상세', '상태 변경 UI'] },
      { layer: 'Server', nodes: ['Spring 기반 사내 시스템', '상태 전이 로직'] },
      { layer: 'Data', nodes: ['이슈', '처리이력', '담당자'] },
      { layer: 'DB', nodes: ['MySQL'] },
    ],
    features: [
      '접수 → 분석 → 조치 → 완료로 이어지는 실제 업무 흐름을 **상태 모델**로 정의',
      '이슈 · 처리이력 · 담당자를 분리한 테이블 구조를 MySQL로 데이터 모델링',
      '상태가 바뀔 때마다 이력이 남도록 설계해 이슈 하나를 시간순으로 추적',
      'Spring 기반 사내 시스템에 이슈 관리 기능을 개발',
      '실사용자 피드백을 반영해 UI 컴포넌트를 반복 개선',
    ],
    troubles: [
      {
        problem: '대응 이력을 모아도, "이 이슈가 지금 어느 단계인지" 아무도 몰랐습니다.',
        cause: '상태를 자유 텍스트로 적다 보니 사람마다 표현이 달랐고, 집계와 추적이 불가능했습니다.',
        solution: '접수-분석-조치-완료 4단계를 상태 모델로 못 박고, 상태 전이마다 이력 레코드가 남도록 설계했습니다. 이후 이슈 하나의 전체 흐름을 시간순으로 재구성할 수 있게 되었습니다.',
      },
      {
        problem: '같은 이슈가 중복 등록되고, 담당자별 처리 내역이 겹쳐 보였습니다.',
        cause: '이슈와 처리 이력이 한 테이블에 섞여 있어 1:N 관계가 표현되지 않았습니다.',
        solution: '이슈 · 처리이력 · 담당자를 분리해 정규화하고, 이슈 1건에 여러 처리 이력이 붙는 구조로 재설계했습니다.',
      },
    ],
    results: [
      '파편화된 대응 데이터를 단일 환경으로 통합',
      '누적 1,000건 이상의 이슈를 한 화면에서 누락 없이 추적',
      '신규 담당자도 과거 대응 이력을 즉시 참고 가능',
    ],
  },
  {
    slug: 'field',
    title: 'field. — 3D 캠핑장 시뮬레이션 플랫폼',
    subtitle: '캠핑 장비를 3D로 배치하고 구매까지 이어지는 올인원 플랫폼. 기획부터 배포·운영까지 단독 수행',
    period: '2026.03 – 2026.06',
    role: '기획 · 디자인 · 프론트엔드 · 백엔드 · 배포 · 운영 (단독)',
    contribution: '100%',
    type: 'side',
    stack: ['Express', 'PostgreSQL', 'Docker', 'AWS EC2', 'JWT', 'React 18', 'Three.js', 'Zustand'],
    metrics: [
      { value: '운영 중', label: '배포 후 현재 서비스 상태' },
      { value: '100%', label: '기획 · 개발 · 배포 단독 수행' },
      { value: '25종+', label: '3D 배치 가능 장비' },
    ],
    overview:
      '만든 것을 어디까지 책임져야 하는지 직접 겪어보고 싶었습니다. API 서버와 데이터베이스 스키마를 직접 설계하고, Docker로 환경을 구성해 Linux 서버에 배포한 뒤 지금까지 운영하고 있습니다.',
    architecture: [
      { layer: 'Client', nodes: ['React 18 (Vercel)', 'Three.js 3D 에디터', 'Zustand 상태관리'] },
      { layer: 'API', nodes: ['Express REST API (AWS EC2 · Linux)', 'JWT 인증 미들웨어', 'rate limit'] },
      { layer: 'Data', nodes: ['PostgreSQL (Supabase)', '이미지 스토리지'] },
      { layer: 'DevOps', nodes: ['Docker (개발 환경)', '서버 로그 모니터링'] },
    ],
    features: [
      '사용자 · 상품 · 주문 · 커뮤니티를 다루는 **API 서버와 PostgreSQL 스키마 직접 설계**',
      'JWT 인증 (access 15분 / refresh 7일) 및 자동 토큰 갱신 인터셉터',
      'argon2 비밀번호 해싱 · rate limit · 이미지 업로드(multer · sharp) 처리',
      'react-three-fiber 기반 3D 캠핑장 에디터 — 시간대별 태양·그림자 시뮬레이션, 1인칭 탐험 모드',
      '장바구니 → 주문서 → 결제 → 주문완료 체크아웃 플로우',
      'Docker로 개발 환경 구성, Vercel(FE) · AWS EC2(API) · Supabase(DB) 배포',
    ],
    troubles: [
      {
        problem: '토큰이 만료되면 사용자가 작업 도중 갑자기 로그아웃됐습니다.',
        cause: 'access token(15분) 만료 시 재발급 흐름이 없어, 만료 즉시 401이 그대로 노출됐습니다.',
        solution: '응답 인터셉터에서 401을 감지해 refresh token으로 자동 재발급하고 원래 요청을 재시도하도록 구현했습니다. 사용자는 만료를 인지하지 못한 채 작업을 이어갑니다.',
      },
      {
        problem: '다수의 3D 오브젝트를 배치하면 에디터가 눈에 띄게 느려졌습니다.',
        cause: '상태가 바뀔 때마다 씬 전체가 재렌더링되고 있었습니다.',
        solution: '상태를 오브젝트 단위로 분리하고 불필요한 리렌더를 차단해, 배치 개수가 늘어도 조작감이 유지되도록 했습니다.',
      },
      {
        problem: '배포 직후 이미지 업로드에서 응답이 지연되고 서버 메모리가 튀었습니다.',
        cause: '원본 이미지를 그대로 저장해 용량이 컸습니다.',
        solution: 'sharp로 업로드 시점에 리사이즈·압축하도록 바꾸고, 서버에 접속해 로그로 처리 시간을 확인하며 조정했습니다.',
      },
    ],
    results: [
      '기획부터 3D 프론트엔드 · 백엔드 · 클라우드 배포까지 단독으로 완성해 실제 운영 중',
      '배포 이후에야 드러나는 문제(토큰 만료, 이미지 용량, 응답 지연)를 직접 겪고 해결',
    ],
    github: 'https://github.com/hidanbeing',
  },
  {
    slug: 'festimap',
    title: 'FESTIMAP — 축제 안전 관리 플랫폼',
    subtitle: '군중 밀집도를 지도에 시각화하고, 혼잡도를 반영한 안전 경로를 추천하는 앱',
    period: '2024.11 – 2024.12',
    role: '디자인 · 프론트엔드',
    type: 'side',
    cover: '/images/festimap-000.png',
    images: ['/images/festimap-001.png', '/images/festimap-002.png', '/images/festimap-004.png', '/images/festimap-005.png'],
    stack: ['React Native', 'JavaScript', 'Kakao Maps API', 'GeoJSON'],
    metrics: [
      { value: '총장상', label: 'in-jeju Challenge' },
      { value: '실시간', label: '구역별 혼잡도 시각화' },
      { value: '안전 우선', label: '최단 경로가 아닌 경로 추천' },
    ],
    overview:
      '군중 유동성 분석 결과가 보고서로만 남으면 현장에서 쓸 수 없습니다. 실제 사용자가 쓰는 형태로 만들기 위해, 분석 결과를 지도 기반 앱으로 구현했습니다.',
    architecture: [
      { layer: 'App', nodes: ['React Native', '지도 상태 / 데이터 상태 분리'] },
      { layer: 'Map', nodes: ['Kakao Maps API', 'GeoJSON Polygon (위험 구역)', 'Line (이동 경로)'] },
      { layer: 'Data', nodes: ['구역별 혼잡도 스코어', '밀집도 임계값'] },
    ],
    features: [
      'Kakao Maps API + React Native로 축제 구역별 혼잡도를 지도에 실시간 시각화',
      'GeoJSON으로 위험 구역은 Polygon, 이동 경로는 Line으로 표현',
      '거리 · 예상 소요시간 · 혼잡도를 함께 고려해 **혼잡도가 낮은 경로를 우선 추천**',
      '실시간 혼잡도를 색상 단계로 표현해 사용자가 즉시 위험도를 판단',
    ],
    troubles: [
      {
        problem: '다수의 Polygon과 Line을 동시에 렌더링하자 지도 조작이 눈에 띄게 느려졌습니다.',
        cause: '데이터 변경이 없는 경우에도 지도 오버레이 컴포넌트가 매번 재렌더링되고 있었습니다.',
        solution: 'React.memo · useCallback으로 불필요한 재렌더링을 차단하고, 데이터가 바뀌지 않으면 오버레이를 재생성하지 않도록 렌더링 조건을 분리했습니다.',
      },
      {
        problem: '실시간 혼잡도가 갱신될 때마다 사용자의 지도 조작(확대·이동)이 초기화됐습니다.',
        cause: '지도 상태(중심 좌표 · 확대 레벨)와 데이터 상태가 한 덩어리로 관리되고 있었습니다.',
        solution: '지도 상태와 데이터 상태를 분리해, 데이터가 갱신돼도 사용자의 조작 맥락이 유지되도록 설계했습니다.',
      },
    ],
    results: [
      '분석 결과를 실시간 밀집도 시각화 · 안전 중심 경로 안내까지 동작하는 모바일 서비스로 완성',
      'in-jeju Challenge 총장상 수상',
    ],
    github: 'https://github.com/hidanbeing',
  },
  {
    slug: 'gachi-haeyang',
    title: '가치해양 — 해양 환경 보호 앱',
    subtitle: '해양 쓰레기 기록 · 참여 · 보상 흐름을 설계하고 인증과 상점 기능을 구현',
    period: '2024.07 – 2024.09',
    role: '디자인 · 프론트엔드',
    type: 'side',
    cover: '/images/gachi-000.png',
    images: ['/images/gachi-001.png', '/images/gachi-002.png', '/images/gachi-003.png', '/images/gachi-004.png'],
    stack: ['React Native', 'JavaScript', 'CoolSMS API', 'Kakao Login', 'Figma'],
    metrics: [
      { value: '본선 진출', label: '공공데이터 해커톤' },
      { value: '기록→보상', label: '사용자 참여 유도 구조' },
      { value: '예외 처리', label: '인증 · 네트워크 안정화' },
    ],
    overview:
      '단순 정보 제공만으로는 사용자가 지속적으로 참여하지 않습니다. 기록 → 참여 → 보상으로 이어지는 흐름을 설계하고, 인증과 상점 기능을 직접 구현했습니다.',
    architecture: [
      { layer: 'App', nodes: ['React Native', '전역 상태 관리'] },
      { layer: 'Auth', nodes: ['CoolSMS 인증번호', 'Kakao Login', '토큰 관리'] },
      { layer: 'Feature', nodes: ['활동 기록 캘린더', '포인트 상점'] },
      { layer: 'Server', nodes: ['백엔드 API 연동'] },
    ],
    features: [
      '기록 · 참여 · 보상 흐름 중심의 서비스 구조 설계, Figma 와이어프레임 · 프로토타입',
      'CoolSMS 인증번호 발송 + Kakao Login 소셜 로그인으로 인증 흐름 단순화',
      'react-native-calendars로 월별 활동 기록 캘린더 구현',
      '포인트 기반 아이템 구매 기능 — 구매 상태가 서버와 동기화되도록 상태 관리 로직 설계',
    ],
    troubles: [
      {
        problem: '로그인 실패나 중복 요청 시 앱이 멈춘 것처럼 보였습니다.',
        cause: '인증 과정의 예외 케이스(실패 · 중복 · 만료)를 처리하지 않아, 사용자에게 아무 피드백이 없었습니다.',
        solution: '실패 · 중복 요청 · 인증 만료를 각각 분기 처리하고, 로딩 · 오류 상태 UI를 추가해 사용자가 현재 상태를 알 수 있게 했습니다.',
      },
      {
        problem: '아이템을 구매해도 화면에 반영되지 않거나, 이미 산 아이템을 다시 살 수 있었습니다.',
        cause: '구매 상태가 클라이언트에만 반영되고 서버 데이터와 동기화되지 않았습니다.',
        solution: '구매 성공 응답을 기준으로 상태를 갱신하도록 로직을 바꾸고, 상태 변경이 실시간으로 UI에 반영되도록 구성했습니다.',
      },
    ],
    results: [
      '공공데이터 해커톤 아이디어톤 본선 진출',
      '기획(Figma)부터 인증 · 캘린더 · 상점까지 직접 완성',
    ],
    github: 'https://github.com/hidanbeing',
  },
  {
    slug: 'boxbox',
    title: 'BOXBOX — F1 실시간 문자 중계 앱',
    subtitle: '실시간 경기 데이터를 문자 중계로 전달. 데이터 소스 교체를 고려해 계층을 분리 설계',
    period: '2025.12 – 진행 중',
    role: '기획 · 디자인 · 프론트엔드',
    type: 'side',
    cover: '/images/boxbox-000.png',
    images: ['/images/boxbox-002.png', '/images/boxbox-004.png', '/images/boxbox-006.png', '/images/boxbox-008.png'],
    stack: ['Flutter', 'Dart', 'WebSocket'],
    metrics: [
      { value: 'UI 수정 0', label: 'Polling → WebSocket 전환 시' },
      { value: 'Diff 기반', label: '리스트 갱신으로 리빌드 최소화' },
      { value: '단일 모델', label: '경기 상태 통합 관리' },
    ],
    overview:
      '초기에는 Polling으로 데이터를 갱신하되, 향후 WebSocket 실시간 스트리밍으로 확장할 계획이었습니다. 나중에 UI를 다시 짜야 하는 상황을 피하기 위해 계층을 분리해 설계했습니다.',
    architecture: [
      { layer: 'UI', nodes: ['중계 리스트', '경기 정보', '다크/라이트 테마'] },
      { layer: 'State', nodes: ['단일 상태 모델 (랩 · 이벤트 · 메시지)', 'Diff 기반 갱신'] },
      { layer: 'Data Source', nodes: ['Polling (현재)', 'WebSocket (확장)'] },
      { layer: 'Sync', nodes: ['지연 · 누락 시 재동기화'] },
    ],
    features: [
      '데이터 수신 계층과 UI 렌더링 계층을 분리해 **데이터 소스만 교체 가능한 구조**',
      '경기 진행 상태(현재 랩 · 이벤트 · 중계 메시지)를 단일 상태 모델로 통합 관리',
      '최신 이벤트만 갱신하는 Diff 기반 리스트 업데이트로 전체 리빌드 최소화',
      'ThemeData · ColorScheme으로 다크/라이트 분리, OS 설정 자동 전환',
    ],
    troubles: [
      {
        problem: '네트워크가 지연되거나 이벤트가 누락되면 중계 순서가 꼬였습니다.',
        cause: '수신한 이벤트를 도착 순서대로 화면에 쌓기만 해서, 누락분이 생기면 복구할 방법이 없었습니다.',
        solution: '최신 경기 상태를 기준으로 화면을 재동기화하는 로직을 적용해, 비동기 이벤트가 순서를 어겨도 화면이 일관성을 유지하도록 했습니다.',
      },
      {
        problem: '중계 메시지가 갱신될 때마다 리스트 전체가 다시 그려져 버벅였습니다.',
        cause: '이벤트가 하나 추가돼도 리스트 전체를 리빌드하고 있었습니다.',
        solution: '최신 이벤트만 갱신하는 Diff 기반 업데이트로 전환해 전체 리빌드를 최소화했습니다.',
      },
    ],
    results: [
      'Polling → WebSocket 확장을 고려한 실시간 데이터 아키텍처를 단독 설계 · 구현',
      '데이터 소스를 교체해도 UI 수정이 필요 없는 구조 확보',
    ],
    github: 'https://github.com/hidanbeing',
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
