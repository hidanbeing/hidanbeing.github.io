import Section from './Section';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/projects';

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="프로젝트"
      desc="각 카드를 누르면 아키텍처 · 주요 기능 · 문제 해결 과정 · 성과를 볼 수 있습니다."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
      </div>
    </Section>
  );
}
