import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionHeader, GlassCard } from './ui';
import { experiences } from '@/data/experience';

const ExperienceCard = ({ experience, index, isEven }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col lg:flex-row gap-8`}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 lg:left-1/2 w-4 h-4 rounded-full bg-midnight-800 border-2 border-cyan transform lg:-translate-x-1/2 -translate-y-1 z-10" />
      
      <div className={`lg:w-1/2 ${isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:ml-auto'}`}>
        <GlassCard className="p-6 ml-8 lg:ml-0">
          <p className="text-cyan text-sm font-mono mb-2">{experience.period}</p>
          <h3 className="text-xl font-semibold text-midnight-50 mb-1">{experience.role}</h3>
          <p className="text-slate mb-4">{experience.company}</p>
          <ul className={`space-y-2 ${isEven ? 'lg:text-right' : ''}`}>
            {experience.highlights.map((highlight, i) => (
              <li key={i} className="text-sm text-slate-light">{highlight}</li>
            ))}
          </ul>
        </GlassCard>
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
    <section id="experience" className="py-32 relative">
      <div className="section-container">
        <SectionHeader 
          subtitle="Career"
          title="Professional"
          highlightedWord="Experience"
          className="mb-16"
        />

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px experience-line transform lg:-translate-x-1/2" />

          <div className="space-y-16">
            {experiences.map((exp, idx) => (
              <ExperienceCard 
                key={exp.id} 
                experience={exp} 
                index={idx}
                isEven={idx % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
