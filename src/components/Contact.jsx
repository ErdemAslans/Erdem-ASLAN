import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, ArrowRight, Linkedin, Github, MapPin, Phone } from 'lucide-react';
import { SectionHeader, Button } from './ui';
import { contactInfo } from '@/data/contact';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="contact" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <SectionHeader 
          subtitle="Contact"
          title="Let's Build"
          highlightedWord="Together"
          className="mb-6"
        />

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-light mb-12 max-w-2xl mx-auto"
        >
          Open to opportunities in AI/ML engineering, multi-agent systems, and enterprise AI solutions. 
          Let's discuss how we can create something exceptional.
        </motion.p>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-6"
        >
          <motion.div variants={itemVariants}>
            <Button 
              variant="primary"
              href={`mailto:${contactInfo.email}`}
              icon
              className="group"
            >
              <Mail className="w-5 h-5" />
              Send Email
            </Button>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button 
              variant="secondary"
              href={contactInfo.linkedin}
              external
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </Button>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button 
              variant="secondary"
              href={contactInfo.github}
              external
            >
              <Github className="w-5 h-5" />
              GitHub
            </Button>
          </motion.div>
        </motion.div>

        {/* Location & Phone */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-16 border-t border-navy-800/30"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan" />
              <span className="text-sm">{contactInfo.location}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-navy-800" />
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan" />
              <span className="text-sm">{contactInfo.phone}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
