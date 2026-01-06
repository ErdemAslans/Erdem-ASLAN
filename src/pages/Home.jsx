import {
  Hero,
  About,
  Projects,
  Experience,
  Testimonials,
  Contact
} from '@/components';

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default Home;