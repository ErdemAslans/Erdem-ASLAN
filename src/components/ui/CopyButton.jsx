import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CopyButton = ({ 
  text, 
  className = '',
  size = 'sm',
  showLabel = false,
  label = 'Copy'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-lg bg-navy-800/50 hover:bg-navy-800 text-slate hover:text-cyan transition-all duration-200 ${sizeClasses[size]} ${className}`}
      title={copied ? 'Copied!' : `Copy ${label}`}
      aria-label={copied ? 'Copied to clipboard' : `Copy ${label} to clipboard`}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check className={`${iconSizes[size]} text-green-400`} />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Copy className={iconSizes[size]} />
          </motion.span>
        )}
      </AnimatePresence>
      {showLabel && (
        <span className="text-xs font-medium">
          {copied ? 'Copied!' : label}
        </span>
      )}
    </button>
  );
};

export default CopyButton;