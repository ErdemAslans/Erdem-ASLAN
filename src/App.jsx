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

function App() {
  return (
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
  );
}

export default App;
