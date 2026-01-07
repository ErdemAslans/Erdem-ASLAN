import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar, Footer, Background } from '@/components';
import { LoadingScreen } from '@/components/ui';

// Lazy load pages for better performance
const Home = lazy(() => import('@/pages/Home'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const Resume = lazy(() => import('@/pages/Resume'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Page transition wrapper
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="w-8 h-8 border border-border border-t-text-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="text-text-muted text-sm">Loading...</p>
    </div>
  </div>
);

// Animated routes component
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <PageTransition>
              <ProjectDetail />
            </PageTransition>
          }
        />
        <Route
          path="/resume"
          element={
            <PageTransition>
              <Resume />
            </PageTransition>
          }
        />
        <Route
          path="/blog"
          element={
            <PageTransition>
              <Blog />
            </PageTransition>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <PageTransition>
              <BlogPost />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only trigger if no input is focused
      if (document.activeElement.tagName === 'INPUT' || 
          document.activeElement.tagName === 'TEXTAREA') {
        return;
      }

      // Number shortcuts for sections (only on home page)
      if (window.location.pathname === '/') {
        const sectionMap = {
          '1': 'home',
          '2': 'about',
          '3': 'projects',
          '4': 'experience',
          '5': 'contact'
        };

        if (sectionMap[e.key]) {
          e.preventDefault();
          const element = document.getElementById(sectionMap[e.key]);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <LoadingScreen isLoading={isLoading} />

        <div className="min-h-screen bg-bg-primary text-text-primary overflow-x-hidden">
          {/* Background Effects */}
          <Background />

          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <Suspense fallback={<PageLoader />}>
            <ScrollToTop />
            <AnimatedRoutes />
          </Suspense>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;

