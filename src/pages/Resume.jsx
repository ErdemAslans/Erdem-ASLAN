import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download, ArrowLeft, Mail, MapPin } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { experiences, education, publications } from '@/data/experience';
import { skillCategories, stats } from '@/data/skills';
import { contactInfo } from '@/data/contact';

const SkillBar = ({ skill, level, delay }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-text-secondary">{skill}</span>
        <span className="text-xs text-text-muted font-mono">{level}%</span>
      </div>
      <div className="h-1 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-text-primary rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
};

const StatCounter = ({ value, label }) => {
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  return (
    <div className="text-center">
      <p className="text-3xl font-bold text-text-primary mb-1">
        {numericValue}{suffix}
      </p>
      <p className="text-sm text-text-muted">{label}</p>
    </div>
  );
};

const TimelineItem = ({ item, index, isLast }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="timeline-item"
    >
      <div className="timeline-dot" />
      
      <div className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-text-primary">{item.role}</h3>
          <span className="badge">{item.period}</span>
        </div>
        <p className="text-text-muted mb-3">{item.company}</p>
        <ul className="space-y-1">
          {item.highlights.map((highlight, i) => (
            <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
              <span className="text-text-muted mt-1">—</span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
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
      <div className="container">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 print:hidden"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-2">
            Erdem Aslan
          </h1>
          <p className="text-xl text-text-muted mb-6">AI/ML Engineer</p>
          
          {/* Contact Info Row */}
          <div className="flex flex-wrap gap-6 text-sm text-text-muted mb-8">
            <a href={`mailto:${contactInfo.email}`} className="link-underline flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {contactInfo.email}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {contactInfo.location}
            </span>
          </div>

          {/* Download/Print Buttons */}
          <div className="flex flex-wrap gap-4 print:hidden">
            <button className="btn-primary" onClick={handleDownload}>
              <Download className="w-4 h-4" />
              Download Resume
            </button>
            <button className="btn-secondary" onClick={handlePrint}>
              Print Version
            </button>
          </div>
        </motion.header>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <div className="card p-8">
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat) => (
                <StatCounter key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </motion.section>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content - Left 2 columns */}
          <div className="lg:col-span-2 space-y-12">
            {/* Summary */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="section-title">// Summary</h2>
              <p className="text-text-secondary leading-relaxed">
                Computer Engineering graduate from Malatya Turgut Ozal University with published research on 
                Vision Transformers in medical AI applications. Currently building enterprise-scale AI systems 
                that process thousands of documents daily across major retail operations. Specialized in 
                multi-agent orchestration, conversational AI platforms, and production ML deployments with 
                focus on bridging cutting-edge AI research and real-world business impact.
              </p>
            </motion.section>

            {/* Experience */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="section-title">// Experience</h2>
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
              <h2 className="section-title">// Education</h2>
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-1">{education.degree}</h3>
                <p className="text-text-muted mb-2">{education.university}</p>
                <p className="text-sm font-mono text-text-muted">{education.period}</p>
                <p className="text-sm text-text-secondary mt-3">{education.description}</p>
              </div>
            </motion.section>

            {/* Publications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="section-title">// Publications</h2>
              {publications.map((pub, idx) => (
                <a
                  key={idx}
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-interactive p-6 block mb-4"
                >
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-text-muted">{pub.conference}</p>
                  <p className="text-sm font-mono text-text-muted mt-2">{pub.year}</p>
                </a>
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
              <h2 className="text-lg font-semibold text-text-primary mb-4">Core Skills</h2>
              <div className="card p-6">
                {skillLevels.map((skill, idx) => (
                  <SkillBar
                    key={skill.skill}
                    skill={skill.skill}
                    level={skill.level}
                    delay={idx * 0.1}
                  />
                ))}
              </div>
            </motion.section>

            {/* Technical Skills Categories */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-lg font-semibold text-text-primary mb-4">Technical Stack</h2>
              <div className="space-y-4">
                {skillCategories.map((category) => (
                  <div key={category.id} className="card p-4">
                    <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">
                      {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span key={skill} className="tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Languages */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-lg font-semibold text-text-primary mb-4">Languages</h2>
              <div className="card p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Turkish</span>
                    <span className="text-text-muted text-sm">Native</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">English</span>
                    <span className="text-text-muted text-sm">Advanced</span>
                  </div>
                </div>
              </div>
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
          .card {
            background: white !important;
            border: 1px solid #e5e7eb !important;
            box-shadow: none !important;
          }
          .text-text-primary {
            color: #111827 !important;
          }
          .text-text-secondary, .text-text-muted {
            color: #374151 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;