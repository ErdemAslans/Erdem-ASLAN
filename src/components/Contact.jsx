import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight } from 'lucide-react';
import { contactInfo } from '@/data/contact';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="contact" className="section border-t border-border">
      <div className="container">
        <p className="section-title">// Contact</p>

        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl font-medium text-text-primary mb-6">
            Let's work together
          </h2>
          
          <p className="text-text-secondary mb-10 leading-relaxed">
            Open to opportunities in AI/ML engineering, multi-agent systems, and enterprise AI solutions. 
            Let's discuss how we can create something exceptional.
          </p>

          <div className="space-y-4">
            <a 
              href={`mailto:${contactInfo.email}`}
              className="link-underline inline-flex items-center gap-2 text-lg"
            >
              {contactInfo.email}
              <ArrowUpRight className="w-4 h-4" />
            </a>
            
            <div className="flex flex-wrap gap-6">
              <a 
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-2"
              >
                LinkedIn
                <ArrowUpRight className="w-4 h-4" />
              </a>
              
              <a 
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-2"
              >
                GitHub
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-6 text-text-muted text-sm">
              <span>{contactInfo.location}</span>
              <span>{contactInfo.phone}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
