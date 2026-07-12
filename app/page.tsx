import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Awards from '@/components/Awards';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <Experience />
      <Projects />
      <Awards />
    </>
  );
}
