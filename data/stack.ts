export type Tech = { name: string; icon: string; note?: string };

/** devicon CDN slug. 없으면 icon: '' → 텍스트 배지로 표시 */
export const stackGroups: { group: string; items: Tech[] }[] = [
  {
    group: 'Language',
    items: [
      { name: 'Java', icon: 'java/java-original' },
      { name: 'Python', icon: 'python/python-original' },
      { name: 'JavaScript', icon: 'javascript/javascript-original' },
      { name: 'TypeScript', icon: 'typescript/typescript-original' },
    ],
  },
  {
    group: 'Backend · Data',
    items: [
      { name: 'Spring Boot', icon: 'spring/spring-original' },
      { name: 'Node.js (Express)', icon: 'nodejs/nodejs-original' },
      { name: 'PostgreSQL', icon: 'postgresql/postgresql-original' },
      { name: 'MySQL', icon: 'mysql/mysql-original' },
      { name: 'SQL', icon: '', note: 'SQLD' },
    ],
  },
  {
    group: 'Infra · Ops',
    items: [
      { name: 'Linux', icon: 'linux/linux-original' },
      { name: 'Docker', icon: 'docker/docker-original' },
      { name: 'AWS', icon: 'amazonwebservices/amazonwebservices-original-wordmark' },
      { name: 'Git', icon: 'git/git-original' },
    ],
  },
  {
    group: 'AI',
    items: [
      { name: 'RAG', icon: '' },
      { name: 'OpenAI', icon: '' },
      { name: 'scikit-learn', icon: '' },
      { name: 'LightGBM', icon: '' },
    ],
  },
  {
    group: 'Frontend',
    items: [
      { name: 'React', icon: 'react/react-original' },
      { name: 'Next.js', icon: 'nextjs/nextjs-original' },
      { name: 'React Native', icon: 'react/react-original' },
      { name: 'Three.js', icon: 'threejs/threejs-original' },
    ],
  },
];
