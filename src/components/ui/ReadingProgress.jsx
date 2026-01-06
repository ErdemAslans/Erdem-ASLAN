import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ReadingProgress = ({ color = 'cyan' }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progressPercentage = scrollHeight > 0 
        ? (scrollPosition / scrollHeight) * 100 
        : 0;
      setProgress(Math.min(100, Math.max(0, progressPercentage)));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
    
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-navy-800/30 z-50">
      <motion.div
        className={`h-full bg-gradient-to-r from-${color} to-${color}-light`}
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

export default ReadingProgress;