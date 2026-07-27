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
  /** 휴대폰 화면 스크린샷 — 세로 썸네일로 나열 */
  images?: string[];
  /** 포스터 · 발표자료 등 문서형 이미지 — 전체 폭으로 크게 표시 */
  documents?: { src: string; label: string }[];
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
  /** 보고서 · 발표자료 · 노션 등 github/live로 안 묶이는 링크 */
  links?: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    slug: 'ai-agent',
    title: 'TechAssistant — AI 기술문의 자동 답변 시스템',
    subtitle:
      '9개 소스에서 모은 24,000건+ Q&A를 하이브리드 RAG로 검색해 답변 초안을 만들고, 답변에 등장한 API가 실제로 존재하는지까지 검증하는 시스템',
    period: '2026.03 – 진행 중',
    role: '기획 · 개발 · 운영 (단독)',
    contribution: '100%',
    type: 'work',
    confidential: true,
    cover: '/images/ai-agent-cover.png',
    stack: [
      'Node.js',
      'Express',
      'Python 3.10',
      'ChromaDB',
      'sentence-transformers',
      'BM25',
      'Puppeteer',
      'IMAP',
      'Tesseract OCR',
      'Linux',
    ],
    metrics: [
      { value: '24,000건+', label: '인덱싱한 통합 Q&A' },
      { value: '9개', label: '자동 수집 데이터 소스' },
      { value: '1h → 20m', label: '문의 1건당 응대 시간' },
    ],
    overview:
      '같은 문의가 반복 유입되는데 담당자는 매번 과거 대응 사례를 수작업으로 검색하고 있었습니다. 대응 가이드를 정리해도 반복 자체는 사라지지 않았습니다. Gmail · 사내 게시판(W-Tech) · Confluence 등 흩어진 9개 소스에서 24,000건 이상의 Q&A를 수집·분류·인덱싱하고, 문의가 들어오면 하이브리드 검색으로 근거를 찾아 답변 초안을 생성한 뒤 검수 큐까지 자동으로 넘기는 파이프라인을 기획부터 운영까지 단독으로 맡았습니다.',
    architecture: [
      { layer: 'Collect', nodes: ['Gmail (IMAP)', 'W-Tech QNA · FAQ (Puppeteer)', 'Confluence 5개 스페이스', 'API 가이드'] },
      { layer: 'Process', nodes: ['통합 · 중복 제거', '정규식 룰 엔진 13개 대분류'] },
      { layer: 'Index', nodes: ['multilingual-e5-base 임베딩 (768차원)', 'ChromaDB'] },
      { layer: 'Retrieve', nodes: ['벡터(코사인) 0.6 : BM25 0.4', 'TOP_K 8', '저신뢰 시 쿼리 보강'] },
      { layer: 'Generate', nodes: ['Codex CLI / Claude API', 'WebSquare MCP 컨텍스트', '첨부 OCR'] },
      { layer: 'Verify', nodes: ['API 존재 검증 (최대 3회 재생성)', '위험도 판정', '개인정보 마스킹'] },
      { layer: 'Serve · Ops', nodes: ['Express REST API', '검수 큐', '워치독 (cron 5분 · Discord)'] },
    ],
    features: [
      'Gmail · W-Tech QNA/FAQ · Confluence 5개 스페이스 등 **9개 소스를 자동 수집** — Gmail은 IMAP 2-Phase(UID 경량 검색 → 배치 다운로드)로 대량 메일을 처리',
      '정규식 룰 엔진으로 13개 대분류를 자동 판정하고 다이제스트를 생성',
      'multilingual-e5-base(768차원) 임베딩을 ChromaDB에 인덱싱 — 256건 배치 처리, 실패 시 개별 재시도로 전체 중단 방지',
      '**벡터(코사인) 0.6 : BM25 0.4** 가중 결합 하이브리드 검색으로 상위 8건 반환',
      '검색 신뢰도가 임계값 미만이면 쿼리를 자동 보강해 재검색(refinement)',
      'WebSquare MCP로 컴포넌트 스펙을 답변 컨텍스트에 주입하고, 첨부 이미지는 Tesseract OCR로 텍스트화',
      '답변 위험도를 **auto / human_review / blocked** 3단계로 판정해 검수 큐로 분기',
      '검색 · 답변 · 검수 큐 · 첨부 다운로드를 Express REST API로 제공 (답변 생성은 API Key 인증)',
    ],
    troubles: [
      {
        problem: 'LLM이 실제로 존재하지 않는 API · 이벤트 · 속성명을 그럴듯하게 지어내 답변에 넣었습니다.',
        cause: '생성 모델은 문법적으로 자연스러운 이름을 만들어내기 때문에, 사람이 읽어서는 실존 API와 구분이 되지 않았습니다. 기술지원 답변에서는 이런 오답이 그대로 고객에게 나갑니다.',
        solution:
          '답변에 등장한 모든 API · 이벤트 · 속성명을 추출해 로컬 가이드 문서와 RAG DB에서 $contains로 실존 여부를 검증하는 루프를 넣었습니다. 미확인 항목이 있으면 해당 API를 제외하고 최대 3회까지 재생성합니다.',
      },
      {
        problem: '정상적인 기술 문의가 자꾸 human_review · blocked로 격상돼 자동 답변률이 떨어졌습니다.',
        cause: '위험도를 산정할 때 RAG로 검색된 이웃 사례(cases)의 텍스트까지 포함하고 있었습니다. 과거 위험 사례가 유사 문서로 딸려오면, 정작 지금 질문은 멀쩡한데도 그 키워드 때문에 등급이 올라갔습니다.',
        solution:
          '판정 기준을 질문 본문과 첨부파일로만 한정하고, 검색 결과(cases)는 제외했습니다. 판정 입력과 참고 자료를 분리하니 오격상이 사라졌습니다.',
      },
      {
        problem: '라이선스 발급 · 데모 요청 · 엔진 파일 제공 같은 문의에도 RAG 검색과 LLM 호출이 그대로 돌았습니다.',
        cause: '이런 문의는 애초에 기술 답변 대상이 아니라 담당자 안내가 필요한 서비스 요청인데, 파이프라인이 모든 문의를 동일하게 취급했습니다.',
        solution:
          '분류 직후 서비스 요청을 걸러내는 short-circuit을 넣어, RAG·LLM을 거치지 않고 담당자 안내 템플릿만 반환하도록 했습니다. 불필요한 LLM 호출과 대기 시간이 사라졌습니다.',
      },
      {
        problem: '외부 LLM을 호출해야 하는데, 문의 본문에는 고객사명·담당자 이름·프로젝트명이 그대로 들어 있었습니다.',
        cause: '기술문의는 대부분 실제 프로젝트 맥락과 함께 오기 때문에, 원문을 그대로 보내면 고객사 정보가 외부로 나갑니다.',
        solution:
          '이름 · 이메일 · 회사명 · 프로젝트명을 제거하는 마스킹 모듈을 파이프라인 앞단에 두고, 마스킹된 텍스트만 LLM에 전달하도록 했습니다. 실행은 종량 과금 API 대신 CLI(codex exec) 방식을 채택해 별도 API 비용 없이 운영하고 있습니다.',
      },
      {
        problem: '운영 중 서버가 죽거나 LLM 호출이 rate limit에 걸려도, 다음 날 아침에야 알게 됐습니다.',
        cause: '단독으로 개발·운영하다 보니 상시 감시할 사람이 없었고, 장애를 알려주는 경로 자체가 없었습니다.',
        solution:
          'cron 5분 주기 워치독을 붙여 /api/health 실패 시 자동 재기동하고, 에러 로그에서 codex exec 실패 · rate limit · quota · 401/429 신호를 스캔해 Discord로 알립니다. 첫 실행 시에는 과거 로그 전체가 쏟아지지 않도록 오프셋만 기록하고 넘어가게 처리했습니다.',
      },
    ],
    results: [
      '문의 1건당 평균 응대 시간을 1시간 → 20분으로 단축 (약 67%)',
      '흩어져 있던 9개 소스의 24,000건+ Q&A를 검색 가능한 단일 인덱스로 통합',
      'API 실존 검증 루프로 존재하지 않는 API를 인용하는 오답을 차단',
      '신규 담당자도 과거 대응 사례를 즉시 참조할 수 있는 환경 구축',
      '워치독 기반 자동 재기동 · 알림 체계를 갖춰 현재까지 사내에서 운영 중',
    ],
  },
  {
    slug: 'crm-tracker',
    title: '기술지원 이력관리 시스템',
    subtitle: '메일·메신저에 흩어진 고객사 기술지원 대응 이력을, 접수부터 완료까지 한 화면에서 추적하는 사내 시스템',
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
    cover: '/images/field-cover.png',
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
    ],
    results: [
      '기획부터 3D 프론트엔드 · 백엔드 · 클라우드 배포까지 단독으로 완성해 실제 운영 중',
      '배포 이후에야 드러나는 문제(토큰 만료, 이미지 용량, 응답 지연)를 직접 겪고 해결',
    ],
    live: 'https://fielddot.co.kr',
    github: 'https://github.com/hidanbeing',
  },
  {
    slug: 'infertility-ml',
    title: '난임 환자 임신 성공 예측 모델',
    subtitle: '도메인 지식 기반 피처 엔지니어링과 Optuna 튜닝으로 임신 성공 여부를 예측한 부스팅 모델',
    period: '2025.02 – 2025.02',
    role: '데이터 분석',
    type: 'side',
    cover: '/images/aimers-cover.jpg',
    stack: ['Python', 'scikit-learn', 'LightGBM', 'XGBoost', 'CatBoost', 'Optuna', 'pandas', 'NumPy'],
    metrics: [
      { value: '0.74218', label: '최종 AUC' },
      { value: '3종', label: '비교 실험한 부스팅 모델' },
      { value: '13 → 5', label: '재구성한 범주형 그룹' },
    ],
    overview:
      '난임 시술 데이터로 임신 성공 여부를 예측하는 과제였습니다. 모델을 바꿔가며 성능을 쥐어짜기보다, 시술 데이터가 실제로 무엇을 의미하는지 이해하고 그 도메인 지식을 피처로 옮기는 데 시간을 더 썼습니다.',
    features: [
      '고유값이 많은 범주형 피처를 단순화 — 배아 생성 이유를 **13개에서 5개 그룹**(현재 시술용 · 배아 저장용 · 기증용 · 난자 저장용 · 연구용)으로 재구성',
      '특정 시술 유형에서 ICSI · IVF · Unknown 포함 여부를 이진 파생 변수로 분리',
      'DI · IVF · 기타 시술 데이터를 합산 변수로 통합하고, **IVF/DI 비율 변수**를 만들어 시술 성향을 수치화',
      '도메인 지식 기반 파생 변수 — 배아 이식 성공률(이식 배아 수 / 총 생성 배아 수), 배아 생존 기간(이식 경과일 − 해동 경과일)',
      '분포가 치우친 변수에 `np.log1p` 로그 변환을 적용해 스케일 보정',
      'XGBoost · LightGBM · CatBoost를 동일 조건에서 비교 실험',
      'Optuna Bayesian Optimization으로 학습률 · 트리 깊이 · L1/L2 정규화 파라미터 탐색',
    ],
    troubles: [
      {
        problem: '범주형 피처의 고유값이 너무 많아 모델이 복잡해지고 학습이 불안정했습니다.',
        cause: '배아 생성 이유처럼 값이 13종으로 쪼개진 피처는 개별 값의 표본이 적어, 모델이 일반화 대신 개별 사례를 외우는 쪽으로 갔습니다.',
        solution:
          '의미가 같은 값끼리 5개 그룹으로 묶고, 시술 유형은 ICSI · IVF · Unknown 포함 여부만 남긴 이진 변수로 분리했습니다. 차원이 줄면서 학습 안정성이 올라갔습니다.',
      },
      {
        problem: 'Validation AUC는 잘 나오는데 Test AUC가 따라오지 않았습니다.',
        cause: '하이퍼파라미터를 검증 성능에만 맞춰 조이다 보니 검증셋에 과적합되고 있었습니다.',
        solution:
          'Optuna 탐색 범위에 L1/L2 정규화 파라미터를 포함시키고, 매 시도마다 Validation AUC와 Test AUC를 나란히 비교해 두 값의 간격이 벌어지지 않는 조합을 최종안으로 골랐습니다.',
      },
    ],
    results: [
      '최종 AUC 0.74218 기록',
      '도메인 지식에서 끌어낸 파생 변수가 단순 모델 교체보다 성능에 크게 기여한다는 걸 확인',
      'Validation과 Test AUC를 함께 보는 과적합 방지 전략을 정립',
    ],
    github: 'https://github.com/hidanbeing/LG-Aimers-6th_Online-Hackathon_LionGing',
    links: [
      { label: '분석 보고서', url: 'https://drive.google.com/file/d/1q6VSLGR21OxJwSJsO1R7me4bCcROLi4_/view' },
    ],
  },
  {
    slug: 'festimap',
    title: 'FESTIMAP — 축제 안전 관리 플랫폼',
    subtitle: '군중 밀집도를 지도에 시각화하고, 혼잡도를 반영한 안전 경로를 추천하는 앱',
    period: '2024.11 – 2024.12',
    role: '디자인 · 프론트엔드',
    type: 'side',
    cover: '/images/festimap-sheet-1.png',
    documents: [
      { src: '/images/festimap-sheet-1.png', label: '주요 화면' },
      { src: '/images/festimap-sheet-2.png', label: '경로 · 상세 화면' },
    ],
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
    github: 'https://github.com/ZzangStone/Festimap',
  },
  {
    slug: 'crowd-analysis',
    title: '대규모 인파 군중 유동성 분석',
    subtitle:
      '불꽃축제 10분 단위 유동인구 데이터로 밀집도 위험 임계값을 정의하고, 경로별 군중 흐름과 사고 유형까지 분석해 안전 관리 방안을 도출',
    period: '2024.09 – 2024.12',
    role: 'PM (기획 · 지표 설계 · 분석)',
    type: 'side',
    cover: '/images/crowd-analysis-cover.png',
    documents: [{ src: '/images/crowd-analysis-cover.png', label: '창의설계경진대회 발표 포스터' }],
    stack: ['데이터 분석', '유동인구 데이터', 'OSRM', 'K-means', 'DBSCAN', '공간 데이터 시각화'],
    metrics: [
      { value: '5.08명/m²', label: '실측된 경고 수준 밀집도' },
      { value: '0.6km/h', label: '해당 구간 평균 보행 속도' },
      { value: '대상', label: '창의설계경진대회 (세종대)' },
    ],
    overview:
      '군중 밀집 사고를 사전에 예측할 수 있는지 확인하는 과제였습니다. 2023 · 2024년 세계 불꽃축제의 10분 단위 유동인구 데이터를 받아 밀집도를 4단계 위험 등급으로 정의하고, 실제 축제 구간에 적용해 언제 어디가 위험해지는지를 숫자로 확인했습니다. 다만 분석이 보고서로 끝나면 현장에서 쓸 수 없다고 보고, 결과를 지도 앱(FESTIMAP)에 그대로 얹을 수 있는 구조로 정리하는 것까지를 목표로 잡았습니다.',
    architecture: [
      { layer: 'Data', nodes: ['2023 · 2024 세계 불꽃축제', '10분 단위 유동인구'] },
      { layer: '전체 단위', nodes: ['시간대별 유동인구 추이', '50m×50m 격자 밀집도', '4단계 위험 등급'] },
      { layer: '스팟 단위', nodes: ['4개 안전 요인 가중치', '취약 지점 선정'] },
      { layer: '경로 분석', nodes: ['OSRM 경로 분해', '중복 경로 유동인구 합산', '경로 밀집도'] },
      { layer: '경로 추출', nodes: ['K-means · DBSCAN 클러스터링', '메인 경로 분류'] },
      { layer: '해석', nodes: ['밀집도–보행속도 상관', '사고 방향 유형 3종'] },
      { layer: '활용', nodes: ['FESTIMAP 실시간 혼잡 정보'] },
    ],
    features: [
      '2023 · 2024년 세계 불꽃축제의 **10분 단위 유동인구 데이터**를 시간 흐름과 공간 분포 두 축으로 분석',
      '밀집도를 **여유(1명/m²) · 관심(3명) · 주의(4명) · 경고(5명)** 4단계로 정의하고, 50m×50m 격자 인원수로 환산해 지도에 시각화',
      '유효 보도 폭 · 상업 시설 · 공사 현장 · 경사도 **4개 안전 요인에 가중치**를 부여해 밀집 사고 취약 지점을 선정',
      '**OSRM**으로 이산형 좌표를 실제 도로망 경로로 분해해 선형 데이터로 변환하고, 중복 구간의 유동인구를 합산해 경로 밀집도 산출',
      '**K-means · DBSCAN**으로 핫스팟 내 경로를 클러스터링해 주요 이동 경로만 추출',
      '메인 경로의 이동 속도와 방향을 추적해 밀집도와 보행 속도의 상관관계 도출',
      '군중 사고를 **양방향 교차 · 연쇄 전도 · 역류** 3가지 유형으로 분류하고 유형별 대응 방안 제시',
    ],
    troubles: [
      {
        problem: '"여기가 위험하다"는 판단이 사람마다 달라서, 위험 구역을 특정할 수 없었습니다.',
        cause: '밀집도를 눈대중과 경험으로만 이야기하다 보니 기준이 없었고, 구역 간 비교도 불가능했습니다.',
        solution:
          '50m×50m 격자당 인원수를 기준으로 여유 · 관심 · 주의 · 경고 4단계 임계값을 세웠습니다. 실제 축제 구간에 적용하니 18:30 시점 밀집도가 5.08명/m²로 경고 수준이라는 게 숫자로 나왔고, 같은 구간 평균 보행 속도가 0.6km/h로 사실상 정체 상태임이 함께 확인됐습니다.',
      },
      {
        problem: '유동인구 데이터로는 사람이 몇 명 있었는지만 알 수 있고, 어느 길로 움직였는지는 알 수 없었습니다.',
        cause: '원본 데이터가 특정 좌표의 체류 인원만 담은 이산형 점 데이터라, 이동 경로 정보가 아예 빠져 있었습니다.',
        solution:
          'OSRM으로 좌표 간 이동을 실제 도로망 경로로 분해해 선형 데이터로 변환하고, 여러 경로가 겹치는 구간의 유동인구를 합산해 경로 단위 밀집도를 만들었습니다. 점이던 데이터가 흐름이 됐습니다.',
      },
      {
        problem: '핫스팟 안에 경로가 너무 많이 나와서 어디가 주요 동선인지 가려낼 수 없었습니다.',
        cause: '분해된 경로가 전부 개별 선으로 남아 있어, 몇 개의 큰 흐름으로 요약되지 않았습니다.',
        solution:
          'K-means와 DBSCAN으로 경로를 클러스터링해 메인 경로만 추출했습니다. 이 경로들의 속도를 추적한 결과, 밀집도가 2~3명/m²를 넘는 순간 이동 속도가 급격히 떨어지는 임계 구간이 드러났습니다.',
      },
      {
        problem: '분석을 마쳐도 결과가 보고서 안에만 남아 현장에서 쓸 수 없는 형태였습니다.',
        cause: '분석 단위와 서비스가 필요로 하는 데이터 단위가 달라서, 결과를 그대로 지도에 얹을 수 없었습니다.',
        solution:
          '결과를 구역 단위 위험도 데이터 구조로 재정리하고, 향후 실시간 데이터가 붙어도 그대로 쓸 수 있는 분석 프레임으로 정리했습니다. 이 구조가 FESTIMAP의 혼잡도 시각화와 경로 추천에 그대로 들어갔습니다.',
      },
    ],
    results: [
      '밀집도를 4단계 정량 임계값으로 정의해, 정성적 판단에 의존하던 위험도 평가를 숫자 기준으로 전환',
      '실측 구간에서 18:30 기준 5.08명/m² · 평균 0.6km/h를 확인해 통행 정체 상태를 입증',
      '밀집도 2~3명/m² 초과 시 보행 속도가 급감하는 임계 구간 도출',
      '우측통행 유도와 대기열 차단선 구성이라는 구체적 안전 관리 방안 제시',
      '분석 결과가 FESTIMAP의 실시간 혼잡도 시각화 · 경로 추천으로 실제 연결',
      '2024 창의설계경진대회 대상 수상 (세종대학교 SW중심대학사업단)',
    ],
    links: [
      { label: '분석 보고서', url: 'https://drive.google.com/file/d/1YOkZ4WW18hHYcz_yuiZYjvfo6M7m58e1/view' },
    ],
  },
  {
    slug: 'gachi-haeyang',
    title: '가치해양 — 해양 환경 보호 앱',
    subtitle: '해양 쓰레기 기록 · 참여 · 보상 흐름을 설계하고 인증과 상점 기능을 구현',
    period: '2024.07 – 2024.09',
    role: '디자인 · 프론트엔드',
    type: 'side',
    cover: '/images/gachi-shot-1.png',
    documents: [
      { src: '/images/gachi-shot-2.png', label: '활동 기록 화면' },
      { src: '/images/gachi-shot-3.png', label: '포인트 상점' },
      { src: '/images/gachi-shot-4.png', label: '인증 흐름' },
    ],
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
    github: 'https://github.com/TogetherWithOcean-TWO/Front',
  },
  {
    slug: 'boxbox',
    title: 'BOXBOX — F1 실시간 문자 중계 앱',
    subtitle:
      '세이프티카 · 핏스톱 · 추월 · 페널티를 발생 순간 알림으로 전달하는 F1 중계 앱. 기획 · 디자인 · 구현 단독 수행',
    period: '2025.12 – 진행 중',
    role: '기획 · 디자인 · 프론트엔드',
    type: 'side',
    cover: '/images/boxbox-cover.png',
    images: [
      '/images/boxbox-1.png',
      '/images/boxbox-2.png',
      '/images/boxbox-3.png',
      '/images/boxbox-4.png',
      '/images/boxbox-5.png',
      '/images/boxbox-6.png',
      '/images/boxbox-7.png',
    ],
    stack: ['Flutter', 'Dart', 'WebSocket'],
    metrics: [
      { value: '4종 이벤트', label: '세이프티카 · 핏스톱 · 추월 · 페널티' },
      { value: '6개 화면', label: '중계를 둘러싼 화면 단독 구현' },
      { value: '라이트 · 다크', label: '전 화면 테마 대응' },
    ],
    overview:
      'F1은 경기 중에 무슨 일이 벌어지는지 따라가기 어려운 종목입니다. 세이프티카가 나왔는지, 누가 언제 피트인했는지, 페널티를 먹었는지가 순위를 뒤집는데 중계 화면만 봐서는 놓칩니다. 경기 중 발생하는 이벤트를 발생 순간 알림으로 쌓아 올리는 문자 중계 화면을 만들고, 그 주위에 일정 · 순위 · 리더보드를 붙여 하나의 앱으로 구성했습니다.',
    architecture: [
      { layer: '중계', nodes: ['랩 진행 · 선두 고정 헤더', '이벤트 타임라인'] },
      { layer: '이벤트', nodes: ['세이프티카', '핏스톱', '추월', '페널티'] },
      { layer: '소통', nodes: ['Live Leaderboard', '실시간 채팅', '공식 이벤트 배너'] },
      { layer: '기록', nodes: ['시즌 일정 · 카운트다운', '이전 중계', '순위표'] },
      { layer: '테마', nodes: ['ThemeData · ColorScheme', 'ThemeMode.system'] },
      { layer: '데이터', nodes: ['Polling (현재)', 'WebSocket (확장 고려)'] },
    ],
    features: [
      '**경기 중 실시간 문자 중계** — 현재 랩(44/57)과 선두 드라이버를 상단에 고정하고, 그 아래로 세이프티카 · 핏스톱 · 추월 · 페널티가 발생 순서대로 쌓이는 타임라인 구현',
      '각 알림에 맥락 수치를 함께 노출 — 핏스톱은 타이어 교체(Soft → Hard)와 소요 시간(2.4s), 추월은 대상(HAM → ALO)과 격차(+0.4s)',
      '**이벤트 유형별로 아이콘과 색을 분리**(세이프티카 노랑 · 핏스톱 파랑 · 추월 초록 · 페널티 빨강)해, 빠르게 스크롤해도 무슨 상황인지 즉시 구분되도록 설계',
      '랩 종료 · 사고 · 피트인 등 새 이벤트가 발생하면 **최신 중계가 상단에 오도록** 리스트 갱신 · 정렬 로직 구현',
      'Live Leaderboard — 랩 진행도 · 동시 시청자 수와 함께 실시간 채팅을 두고, 옐로플래그 같은 공식 이벤트를 채팅 스트림 중간에 배너로 삽입',
      'Race 탭 — 다음 경기까지 **D-H-M-S 카운트다운**, 월별로 묶은 시즌 일정, 종료된 라운드는 우승자와 함께 **이전중계(과거 레이스 다시보기)** 진입점 제공',
      'Rank 탭 — 시즌 선택과 **Drivers / Constructors 전환**, 팀 컬러 바와 순위 변동 화살표로 순위표 구성',
      'ThemeData · ColorScheme으로 라이트/다크를 분리하고 ThemeMode.system으로 OS 설정에 따라 자동 전환',
    ],
    troubles: [
      {
        problem: '네트워크가 지연되거나 이벤트가 누락되면 중계 순서가 꼬였습니다.',
        cause: '수신한 이벤트를 도착 순서대로 화면에 쌓기만 해서, 누락분이 생기면 복구할 방법이 없었습니다.',
        solution:
          '최신 경기 상태를 기준으로 화면을 재동기화하는 로직을 적용해, 비동기 이벤트가 순서를 어겨도 화면이 일관성을 유지하도록 했습니다.',
      },
      {
        problem: '중계 메시지가 갱신될 때마다 리스트 전체가 다시 그려져 버벅였습니다.',
        cause: '이벤트가 하나 추가돼도 리스트 전체를 리빌드하고 있었습니다.',
        solution: '최신 이벤트만 갱신하는 Diff 기반 업데이트로 전환해 전체 리빌드를 최소화했습니다.',
      },
      {
        problem: '다크 모드로 바꾸면 중계 텍스트가 배경에 묻혀 읽기 어려웠습니다.',
        cause: '라이트 기준으로 잡은 색을 다크에 그대로 뒤집어 쓰다 보니, 회색조 텍스트와 어두운 배경의 대비가 무너졌습니다.',
        solution:
          'ColorScheme을 라이트/다크 각각 따로 설계하고, 이벤트 유형별 강조색도 두 테마에서 각각 대비를 확인해 값을 나눴습니다. 문자 중계는 경기 내내 읽는 화면이라 대비가 곧 사용성입니다.',
      },
    ],
    results: [
      '경기 중 발생하는 4종 이벤트를 실시간 알림 타임라인으로 전달하는 중계 화면을 기획 · 디자인 · 구현까지 단독 수행',
      '이벤트 유형별 색상 체계를 만들어 빠른 스크롤 중에도 경기 상황 구분 가능',
      '로그인 · 시즌 일정 · 리더보드 · 순위표까지 6개 화면을 전부 라이트/다크로 대응',
      '데이터 소스 교체를 고려해 수신 계층과 UI 계층을 분리 (Polling → WebSocket 확장 대비)',
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
