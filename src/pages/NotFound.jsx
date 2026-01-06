import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { GradientText, Button } from '@/components/ui';

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
          <h1 className="text-[150px] md:text-[200px] font-bold leading-none">
            <GradientText>404</GradientText>
          </h1>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-midnight-50 mb-4">
              Page Not Found
            </h2>
            <p className="text-slate-light max-w-md mx-auto mb-8">
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
            <Link to="/">
              <Button variant="primary" icon>
                <Home className="w-4 h-4" />
                Go Home
              </Button>
            </Link>
            <Button 
              variant="secondary" 
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-navy-800/30"
          >
            <p className="text-sm text-slate mb-4">Or try these pages:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/#projects" 
                className="text-sm text-slate-light hover:text-cyan transition-colors"
              >
                Projects
              </Link>
              <Link 
                to="/blog" 
                className="text-sm text-slate-light hover:text-cyan transition-colors"
              >
                Blog
              </Link>
              <Link 
                to="/resume" 
                className="text-sm text-slate-light hover:text-cyan transition-colors"
              >
                Resume
              </Link>
              <Link 
                to="/#contact" 
                className="text-sm text-slate-light hover:text-cyan transition-colors"
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