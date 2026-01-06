import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Github, FileText, BookOpen } from 'lucide-react';
import { useScrollPosition } from '@/hooks';
import { NAV_ITEMS, scrollToSection } from '@/utils/constants';
import { contactInfo } from '@/data/contact';
import { GradientText, ThemeToggle, Button } from './ui';

const Navbar = () => {
  const { scrollY } = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isScrolled = scrollY > 50;
  const isHomePage = location.pathname === '/';

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (sectionId) => {
    if (isHomePage) {
      scrollToSection(sectionId);
    } else {
      navigate(`/#${sectionId}`);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (isHomePage) {
      scrollToSection('home');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-midnight-800/90 backdrop-blur-lg border-b border-navy-800/30'
            : ''
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              onClick={handleLogoClick}
              className="text-xl font-semibold tracking-tight z-50"
            >
              <GradientText>EA</GradientText>
              <span className="text-slate font-light ml-1">.</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={isHomePage ? `#${item.id}` : `/#${item.id}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                  className="nav-link"
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/blog"
                className={`nav-link ${location.pathname.startsWith('/blog') ? 'text-cyan' : ''}`}
              >
                Blog
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Link
                to="/resume"
                className="flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm font-medium text-slate-light hover:text-cyan transition-colors"
              >
                <FileText className="w-4 h-4" />
                Resume
              </Link>
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm font-medium text-slate-light hover:text-cyan transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2 z-50">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-light hover:text-cyan transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-midnight-900/95 backdrop-blur-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative h-full flex flex-col items-center justify-center gap-6"
            >
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={isHomePage ? `#${item.id}` : `/#${item.id}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="text-2xl font-medium text-slate-light hover:text-cyan transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-4 mt-4 pt-4 border-t border-navy-800/50"
              >
                <Link
                  to="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-xl text-slate-light hover:text-cyan transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  Blog
                </Link>
                <Link
                  to="/resume"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-xl text-slate-light hover:text-cyan transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  Resume
                </Link>
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-light hover:text-cyan transition-colors"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
