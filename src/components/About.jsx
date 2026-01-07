import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight } from 'lucide-react';
import { skillCategories } from '@/data/skills';
import { publications } from '@/data/experience';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="about" className="section border-t border-border">
      <div className="container">
        <p className="section-title">// About</p>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Bio */}
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-text-secondary leading-relaxed">
              Computer Engineering graduate from Malatya Turgut Ozal University with 
              published research on Vision Transformers in medical AI applications. 
              Currently building enterprise-scale AI systems that process thousands 
              of documents daily across major retail operations.
            </p>
            <p className="text-text-secondary leading-relaxed">
              My focus spans multi-agent orchestration, conversational AI platforms, 
              and production ML deployments. I architect systems that bridge the gap 
              between cutting-edge AI research and real-world business impact.
            </p>
            
            {/* Publication Link */}
            {publications[0] && (
              <div className="pt-4">
                <a 
                  href={publications[0].link}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-2"
                >
                  <span>Published Research on Vision Transformers</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </motion.div>

          {/* Right - Skills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            {skillCategories.map((category, idx) => (
              <div key={category.id}>
                <h4 className="text-sm font-mono text-text-muted uppercase tracking-wider mb-4">
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="tag">{skill}</span>
                  ))}
                </div>
                {idx < skillCategories.length - 1 && (
                  <div className="divider mt-8" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
