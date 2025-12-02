import { motion } from 'framer-motion';
import { GradientText } from './GradientText';

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
      <p className="section-subtitle">{subtitle}</p>
      <h2 className="section-title">
        {title} <GradientText>{highlightedWord}</GradientText>
      </h2>
    </motion.div>
  );
};

export default SectionHeader;
