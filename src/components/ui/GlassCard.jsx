import { motion } from 'framer-motion';

export const GlassCard = ({ 
  children, 
  className = '', 
  hover = false,
  delay = 0,
  ...props 
}) => {
  const baseClasses = "bg-glass backdrop-blur-xl border border-blue-400/10 rounded-2xl";
  const hoverClasses = hover ? "transition-all duration-400 ease-smooth hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(56,189,248,0.15)] hover:border-cyan/20" : "";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
