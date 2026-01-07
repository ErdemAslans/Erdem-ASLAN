import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Number */}
          <h1 className="text-[150px] md:text-[200px] font-bold leading-none text-text-primary">
            404
          </h1>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
              Page Not Found
            </h2>
            <p className="text-text-muted max-w-md mx-auto mb-8">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/" className="btn-primary">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
            <button 
              className="btn-secondary" 
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <p className="text-sm text-text-muted mb-4">Or try these pages:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/#projects" 
                className="text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                Projects
              </Link>
              <Link 
                to="/blog" 
                className="text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                Blog
              </Link>
              <Link 
                to="/resume" 
                className="text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                Resume
              </Link>
              <Link 
                to="/#contact" 
                className="text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;