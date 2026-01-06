import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download, ArrowLeft, Mail, Phone, MapPin, Linkedin, Github, BookOpen, Briefcase, GraduationCap, Award, Code2 } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { GlassCard, GradientText, Button } from '@/components/ui';
import { experiences, education, publications } from '@/data/experience';
import { skillCategories, stats } from '@/data/skills';
import { contactInfo } from '@/data/contact';

const SkillBar = ({ skill, level, delay }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-slate-light">{skill}</span>
        <span className="text-xs text-cyan">{level}%</span>
      </div>
      <div className="h-2 bg-navy-800/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan to-cyan-light rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
};

const StatCounter = ({ value, label }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-bold mb-1">
        <GradientText>
          {inView ? (
            <>
              <CountUp end={numericValue} duration={2.5} />
              {suffix}
            </>
          ) : (
            '0' + suffix
          )}
        </GradientText>
      </p>
      <p className="text-sm text-slate">{label}</p>
    </div>
  );
};

const TimelineItem = ({ item, index, isLast }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-8"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[7px] top-4 w-px h-full bg-gradient-to-b from-cyan to-transparent" />
      )}
      
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-midnight-800 border-2 border-cyan" />
      
      <GlassCard className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-midnight-50">{item.role}</h3>
          <span className="text-xs font-mono text-cyan bg-cyan/10 px-2 py-1 rounded">{item.period}</span>
        </div>
        <p className="text-slate mb-3">{item.company}</p>
        <ul className="space-y-1">
          {item.highlights.map((highlight, i) => (
            <li key={i} className="text-sm text-slate-light flex items-start gap-2">
              <span className="text-cyan mt-1">•</span>
              {highlight}
            </li>
          ))}
        </ul>
      </GlassCard>
    </motion.div>
  );
};

const Resume = () => {
  const printRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a simple text resume for download
    const resumeContent = `
ERDEM ASLAN
AI/ML Engineer

Contact:
Email: ${contactInfo.email}
Phone: ${contactInfo.phone}
Location: ${contactInfo.location}
LinkedIn: ${contactInfo.linkedin}
GitHub: ${contactInfo.github}

SUMMARY
Computer Engineering graduate with published research on Vision Transformers in medical AI applications. 
Specialized in multi-agent orchestration, conversational AI platforms, and production ML deployments.

EXPERIENCE
${experiences.map(exp => `
${exp.role} - ${exp.company}
${exp.period}
${exp.highlights.map(h => `• ${h}`).join('\n')}
`).join('\n')}

EDUCATION
${education.degree}
${education.university}
${education.period}

SKILLS
${skillCategories.map(cat => `
${cat.title}:
${cat.skills.join(', ')}
`).join('\n')}

PUBLICATIONS
${publications.map(pub => `${pub.title} - ${pub.conference} (${pub.year})`).join('\n')}
    `.trim();

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Erdem_Aslan_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const skillLevels = [
    { skill: 'Python', level: 95 },
    { skill: 'Machine Learning', level: 90 },
    { skill: 'Deep Learning', level: 88 },
    { skill: 'LLMs & RAG', level: 92 },
    { skill: 'Multi-Agent Systems', level: 90 },
    { skill: 'Cloud (GCP)', level: 85 },
    { skill: 'Docker & Kubernetes', level: 82 },
    { skill: 'TypeScript', level: 78 },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20" ref={printRef}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 print:hidden"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-light hover:text-cyan transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-2">
            <GradientText>Erdem Aslan</GradientText>
          </h1>
          <p className="text-xl text-slate-light mb-6">AI/ML Engineer</p>
          
          {/* Contact Info Row */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate mb-8">
            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-1 hover:text-cyan transition-colors">
              <Mail className="w-4 h-4" />
              {contactInfo.email}
            </a>
            <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-1 hover:text-cyan transition-colors">
              <Phone className="w-4 h-4" />
              {contactInfo.phone}
            </a>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {contactInfo.location}
            </span>
          </div>

          {/* Download/Print Buttons */}
          <div className="flex flex-wrap justify-center gap-4 print:hidden">
            <Button variant="primary" onClick={handleDownload} icon>
              <Download className="w-5 h-5" />
              Download Resume
            </Button>
            <Button variant="secondary" onClick={handlePrint}>
              Print Version
            </Button>
            <Button variant="secondary" href={contactInfo.linkedin} external>
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </Button>
            <Button variant="secondary" href={contactInfo.github} external>
              <Github className="w-5 h-5" />
              GitHub
            </Button>
          </div>
        </motion.header>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <GlassCard className="p-8">
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat) => (
                <StatCounter key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </GlassCard>
        </motion.section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left 2 columns */}
          <div className="lg:col-span-2 space-y-12">
            {/* Summary */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-midnight-50 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan" />
                Professional Summary
              </h2>
              <GlassCard className="p-6">
                <p className="text-slate-light leading-relaxed">
                  Computer Engineering graduate from Malatya Turgut Ozal University with published research on 
                  Vision Transformers in medical AI applications. Currently building enterprise-scale AI systems 
                  that process thousands of documents daily across major retail operations. Specialized in 
                  multi-agent orchestration, conversational AI platforms, and production ML deployments with 
                  focus on bridging cutting-edge AI research and real-world business impact.
                </p>
              </GlassCard>
            </motion.section>

            {/* Experience */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl font-bold text-midnight-50 mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan" />
                Professional Experience
              </h2>
              <div className="relative">
                {experiences.map((exp, idx) => (
                  <TimelineItem
                    key={exp.id}
                    item={exp}
                    index={idx}
                    isLast={idx === experiences.length - 1}
                  />
                ))}
              </div>
            </motion.section>

            {/* Education */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-xl font-bold text-midnight-50 mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan" />
                Education
              </h2>
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-midnight-50 mb-1">{education.degree}</h3>
                <p className="text-slate mb-2">{education.university}</p>
                <p className="text-sm text-cyan font-mono">{education.period}</p>
                <p className="text-sm text-slate-light mt-3">{education.description}</p>
              </GlassCard>
            </motion.section>

            {/* Publications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-xl font-bold text-midnight-50 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan" />
                Publications
              </h2>
              {publications.map((pub, idx) => (
                <GlassCard key={idx} className="p-6">
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <h3 className="text-lg font-semibold text-midnight-50 mb-2 group-hover:text-cyan transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-slate">{pub.conference}</p>
                    <p className="text-sm text-cyan font-mono mt-2">{pub.year}</p>
                  </a>
                </GlassCard>
              ))}
            </motion.section>
          </div>

          {/* Sidebar - Right column */}
          <div className="space-y-8">
            {/* Skills with Progress Bars */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl font-bold text-midnight-50 mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan" />
                Core Skills
              </h2>
              <GlassCard className="p-6">
                {skillLevels.map((skill, idx) => (
                  <SkillBar
                    key={skill.skill}
                    skill={skill.skill}
                    level={skill.level}
                    delay={idx * 0.1}
                  />
                ))}
              </GlassCard>
            </motion.section>

            {/* Technical Skills Categories */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-xl font-bold text-midnight-50 mb-4">Technical Stack</h2>
              <div className="space-y-4">
                {skillCategories.map((category) => (
                  <GlassCard key={category.id} className="p-4">
                    <h3 className="text-sm font-medium text-slate uppercase tracking-wider mb-3">
                      {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2 py-1 bg-cyan/10 text-cyan rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.section>

            {/* Languages */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-xl font-bold text-midnight-50 mb-4">Languages</h2>
              <GlassCard className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-light">Turkish</span>
                    <span className="text-cyan text-sm">Native</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-light">English</span>
                    <span className="text-cyan text-sm">Advanced</span>
                  </div>
                </div>
              </GlassCard>
            </motion.section>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .glass-card {
            background: white !important;
            border: 1px solid #e5e7eb !important;
            box-shadow: none !important;
          }
          .gradient-text {
            color: #0891b2 !important;
            -webkit-text-fill-color: #0891b2 !important;
          }
          .text-cyan {
            color: #0891b2 !important;
          }
          .text-slate, .text-slate-light {
            color: #374151 !important;
          }
          .text-midnight-50 {
            color: #111827 !important;
          }
          .bg-navy-800, .bg-midnight-800, .bg-cyan\\/10 {
            background: #f3f4f6 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;