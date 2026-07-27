export type Tech = { name: string; icon: string; note?: string };

/**
 * 깊이를 숨기지 않고 드러낸다.
 * 실무(회사에서 매일 쓰는 것)와 프로젝트(개인·팀 프로젝트에서 적용해 본 것)를 나누면,
 * 면접에서 어디를 깊게 물어도 되는지가 명확해진다. 21개를 평평하게 나열하는 것보다 신뢰가 간다.
 *
 * devicon CDN slug. 없으면 icon: '' → 점 배지로 표시된다.
 */
export const stackGroups: { group: string; items: Tech[] }[] = [
  {
    group: '실무 · 매일 사용',
    items: [
      { name: 'Java', icon: 'java/java-original' },
      { name: 'MySQL', icon: 'mysql/mysql-original' },
      { name: 'Linux', icon: 'linux/linux-original' },
      { name: 'Python', icon: 'python/python-original' },
      { name: 'SQL', icon: '', note: 'SQLD' },
      { name: 'Git', icon: 'git/git-original' },
    ],
  },
  {
    group: 'AI · 검색',
    items: [
      { name: 'RAG', icon: '' },
      { name: 'ChromaDB', icon: '' },
      { name: 'sentence-transformers', icon: '' },
      { name: 'BM25', icon: '' },
    ],
  },
  {
    group: '프로젝트 적용 · 백엔드',
    items: [
      { name: 'Spring Boot', icon: 'spring/spring-original' },
      { name: 'Node.js (Express)', icon: 'nodejs/nodejs-original' },
      { name: 'PostgreSQL', icon: 'postgresql/postgresql-original' },
      { name: 'Docker', icon: 'docker/docker-original' },
      { name: 'AWS', icon: 'amazonwebservices/amazonwebservices-original-wordmark' },
    ],
  },
  {
    group: '프로젝트 적용 · 프론트엔드 · 데이터',
    items: [
      { name: 'React', icon: 'react/react-original' },
      { name: 'React Native', icon: 'react/react-original' },
      { name: 'TypeScript', icon: 'typescript/typescript-original' },
      { name: 'Next.js', icon: 'nextjs/nextjs-original' },
      { name: 'Three.js', icon: 'threejs/threejs-original' },
      { name: 'scikit-learn', icon: '' },
      { name: 'LightGBM', icon: '' },
    ],
  },
];
