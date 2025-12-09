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
  const baseClasses = "bg-glass backdrop-blur-xl border border-blue-400/10 rounded-2xl";
  const hoverClasses = hover ? "cursor-pointer" : "";

  const hoverAnimation = hover ? {
    y: -8,
    boxShadow: "0 25px 50px -12px rgba(56,189,248,0.15)",
    borderColor: "rgba(56, 189, 248, 0.2)",
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  } : {};

  const tapAnimation = hover && onClick ? { scale: 0.98 } : {};

  const Component = as === 'article' ? motion.article : motion.div;

  return (
    <Component
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      onClick={onClick}
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default GlassCard;
