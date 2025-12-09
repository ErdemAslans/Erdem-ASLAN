import { useState, useEffect } from 'react';
import {
  Navbar,
  Hero,
  About,
  Projects,
  Experience,
  Contact,
  Footer,
  Background
} from '@/components';
import { LoadingScreen } from '@/components/ui';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      <div className="min-h-screen bg-midnight-800 text-midnight-50 overflow-x-hidden">
        {/* Background Effects */}
        <Background />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
