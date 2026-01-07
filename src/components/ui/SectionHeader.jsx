import { motion } from 'framer-motion';

export const SectionHeader = ({ 
  subtitle, 
  title, 
  highlightedWord,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <p className="section-title">// {subtitle || title}</p>
      {highlightedWord && (
        <h2 className="text-2xl md:text-3xl font-medium text-text-primary mt-2">
          {title} {highlightedWord}
        </h2>
      )}
    </motion.div>
  );
};

export default SectionHeader;
