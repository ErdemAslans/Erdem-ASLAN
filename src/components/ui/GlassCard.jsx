import { motion } from 'framer-motion';

export const GlassCard = ({
  children,
  className = '',
  hover = false,
  delay = 0,
  onClick,
  as = 'div',
  ...props
}) => {
  const Component = as === 'article' ? motion.article : motion.div;

  return (
    <Component
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={hover ? { borderColor: 'var(--border-hover)' } : {}}
      onClick={onClick}
      className={`card ${hover ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default GlassCard;
