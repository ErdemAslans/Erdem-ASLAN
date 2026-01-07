import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '@/utils/constants';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm font-mono text-text-muted mb-6"
          >
            AI/ML Engineer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8"
          >
            Erdem Aslan
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-text-secondary leading-relaxed mb-12 max-w-2xl"
          >
            Building intelligent systems that transform enterprise operations. 
            Specialized in multi-agent architectures, medical AI diagnostics, 
            and scalable cloud solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-primary"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link to="/resume" className="btn-secondary">
              Resume
            </Link>

            <button
              onClick={() => scrollToSection('contact')}
              className="btn-ghost"
            >
              Contact
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-8 mt-16 pt-8 border-t border-border"
          >
            <div>
              <p className="text-2xl font-semibold">12+</p>
              <p className="text-sm text-text-muted">Projects</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-2xl font-semibold">1+</p>
              <p className="text-sm text-text-muted">Publications</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-2xl font-semibold">35+</p>
              <p className="text-sm text-text-muted">Repositories</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
