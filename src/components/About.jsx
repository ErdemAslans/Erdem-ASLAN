import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, ArrowRight } from 'lucide-react';
import { SectionHeader, GlassCard, TechTag } from './ui';
import { skillCategories } from '@/data/skills';
import { publications } from '@/data/experience';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section id="about" className="py-32 relative">
      <div className="section-container">
        <SectionHeader 
          subtitle="About"
          title="Engineering"
          highlightedWord="Intelligence"
          className="mb-16"
        />

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16"
        >
          {/* Left - Bio */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg text-slate-light leading-relaxed">
              Computer Engineering graduate from Malatya Turgut Ozal University with 
              published research on Vision Transformers in medical AI applications. 
              Currently building enterprise-scale AI systems that process thousands 
              of documents daily across major retail operations.
            </p>
            <p className="text-lg text-slate-light leading-relaxed">
              My focus spans multi-agent orchestration, conversational AI platforms, 
              and production ML deployments. I architect systems that bridge the gap 
              between cutting-edge AI research and real-world business impact.
            </p>
            
            {/* Publication Link */}
            {publications[0] && (
              <div className="pt-8">
                <a 
                  href={publications[0].link}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-cyan hover:text-cyan-light transition-colors group"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Published Research on Vision Transformers</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            )}
          </motion.div>

          {/* Right - Skills */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-8 space-y-8">
              {skillCategories.map((category, idx) => (
                <div key={category.id}>
                  <h4 className="text-sm font-medium text-slate uppercase tracking-wider mb-4">
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <TechTag key={skill}>{skill}</TechTag>
                    ))}
                  </div>
                  {idx < skillCategories.length - 1 && (
                    <div className="glow-line mt-8 opacity-30" />
                  )}
                </div>
              ))}
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
