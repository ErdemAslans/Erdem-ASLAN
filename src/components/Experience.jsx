import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experiences } from '@/data/experience';

const ExperienceCard = ({ experience, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="timeline-item"
    >
      <div className="timeline-dot" />
      
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h3 className="text-lg font-medium text-text-primary">{experience.role}</h3>
          <span className="badge">{experience.period}</span>
        </div>
        
        <p className="text-text-secondary mb-4">{experience.company}</p>
        
        <ul className="space-y-2">
          {experience.highlights.map((highlight, i) => (
            <li key={i} className="text-sm text-text-muted">
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="experience" className="section border-t border-border">
      <div className="container">
        <p className="section-title">// Experience</p>

        <div ref={ref} className="max-w-2xl">
          <div className="space-y-0">
            {experiences.map((exp, idx) => (
              <ExperienceCard 
                key={exp.id} 
                experience={exp} 
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
