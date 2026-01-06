import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Target, Lightbulb, Code2, BarChart3, ChevronRight } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { GlassCard, GradientText, Button, TechTag } from '@/components/ui';
import { projects, projectCaseStudies } from '@/data/projects';

const TableOfContents = ({ sections, activeSection }) => {
  return (
    <nav className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 w-48">
      <p className="text-xs font-mono text-slate uppercase tracking-wider mb-4">On This Page</p>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`text-sm transition-colors duration-200 block py-1 border-l-2 pl-3 ${
                activeSection === section.id
                  ? 'text-cyan border-cyan'
                  : 'text-slate hover:text-slate-light border-navy-800'
              }`}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progressPercentage = (scrollPosition / scrollHeight) * 100;
      setProgress(progressPercentage);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-navy-800/50 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan to-cyan-light"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  // Find project by slug (converting id to slug format)
  const project = projects.find(p => 
    p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === slug
  );
  
  const caseStudy = projectCaseStudies?.find(cs => cs.projectId === project?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'problem', 'solution', 'architecture', 'challenges', 'impact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-midnight-50 mb-4">Project Not Found</h1>
          <Button variant="primary" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'problem', label: 'Problem Statement' },
    { id: 'solution', label: 'Solution' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'impact', label: 'Impact & Results' },
  ];

  // Default case study content if not provided
  const defaultCaseStudy = {
    overview: project.description,
    problemStatement: `This project addresses the need for ${project.title.toLowerCase()} in modern software systems. Organizations often struggle with implementing efficient solutions in this domain.`,
    solution: `Built using ${project.tech.join(', ')}, this solution provides a comprehensive approach to solving the identified challenges with scalability and maintainability in mind.`,
    architecture: {
      description: 'The system follows a modular architecture pattern ensuring clean separation of concerns and maintainability.',
      diagram: null,
    },
    challenges: [
      {
        title: 'Technical Complexity',
        description: 'Managing the complexity of integrating multiple technologies and ensuring seamless communication between components.',
        solution: 'Implemented clean interfaces and abstraction layers to isolate complexity.'
      },
      {
        title: 'Performance Optimization',
        description: 'Ensuring the system performs efficiently under load.',
        solution: 'Applied caching strategies and optimized critical paths.'
      }
    ],
    impact: {
      metrics: [
        { label: 'Performance Improvement', value: project.metrics },
        { label: 'Technologies Used', value: `${project.tech.length}+` },
      ],
      testimonial: null
    },
    codeSnippets: []
  };

  const study = caseStudy || defaultCaseStudy;

  return (
    <>
      <ReadingProgress />
      <TableOfContents sections={sections} activeSection={activeSection} />

      <article className="min-h-screen pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-slate-light hover:text-cyan transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <GradientText>{project.title}</GradientText>
            </h1>
            <p className="text-lg text-slate-light mb-6">{project.description}</p>
            
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                href={project.link}
                external
                icon
              >
                <Github className="w-5 h-5" />
                View Repository
              </Button>
              {project.demo && (
                <Button
                  variant="secondary"
                  href={project.demo}
                  external
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </Button>
              )}
            </div>
          </motion.header>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            <GlassCard className="p-4 text-center">
              <p className="text-2xl font-bold text-cyan">{project.metrics}</p>
              <p className="text-sm text-slate">Key Metric</p>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <p className="text-2xl font-bold text-cyan">{project.tech.length}</p>
              <p className="text-sm text-slate">Technologies</p>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <p className="text-2xl font-bold text-cyan capitalize">{project.category.replace('-', ' ')}</p>
              <p className="text-sm text-slate">Category</p>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <p className="text-2xl font-bold text-cyan">2024</p>
              <p className="text-sm text-slate">Year</p>
            </GlassCard>
          </motion.div>

          {/* Overview Section */}
          <motion.section
            id="overview"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-midnight-50 mb-4 flex items-center gap-3">
              <Target className="w-6 h-6 text-cyan" />
              Overview
            </h2>
            <p className="text-slate-light leading-relaxed">{study.overview}</p>
          </motion.section>

          {/* Problem Statement */}
          <motion.section
            id="problem"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-midnight-50 mb-4 flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-cyan" />
              Problem Statement
            </h2>
            <GlassCard className="p-6">
              <p className="text-slate-light leading-relaxed">{study.problemStatement}</p>
            </GlassCard>
          </motion.section>

          {/* Solution */}
          <motion.section
            id="solution"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-midnight-50 mb-4 flex items-center gap-3">
              <Code2 className="w-6 h-6 text-cyan" />
              Solution
            </h2>
            <p className="text-slate-light leading-relaxed mb-6">{study.solution}</p>
            
            {study.codeSnippets && study.codeSnippets.length > 0 && (
              <div className="space-y-4">
                {study.codeSnippets.map((snippet, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden">
                    <div className="bg-navy-800 px-4 py-2 flex items-center justify-between">
                      <span className="text-sm text-slate">{snippet.filename}</span>
                      <span className="text-xs text-cyan font-mono">{snippet.language}</span>
                    </div>
                    <SyntaxHighlighter
                      language={snippet.language}
                      style={oneDark}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0 0 0.5rem 0.5rem',
                        fontSize: '0.875rem',
                      }}
                    >
                      {snippet.code}
                    </SyntaxHighlighter>
                  </div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Architecture */}
          <motion.section
            id="architecture"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-midnight-50 mb-4 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-cyan" />
              Architecture
            </h2>
            <GlassCard className="p-6">
              <p className="text-slate-light leading-relaxed mb-4">{study.architecture.description}</p>
              {study.architecture.diagram && (
                <img 
                  src={study.architecture.diagram} 
                  alt="Architecture Diagram" 
                  className="w-full rounded-lg"
                />
              )}
              
              {/* Tech Stack Visual */}
              <div className="mt-6 pt-6 border-t border-navy-800/50">
                <h4 className="text-sm font-medium text-slate uppercase tracking-wider mb-4">Tech Stack</h4>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-navy-800/50 rounded-lg text-sm text-slate-light"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.section>

          {/* Challenges & Solutions */}
          <motion.section
            id="challenges"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-midnight-50 mb-6">Challenges & Solutions</h2>
            <div className="space-y-4">
              {study.challenges.map((challenge, idx) => (
                <GlassCard key={idx} className="p-6">
                  <h3 className="text-lg font-semibold text-midnight-50 mb-2">{challenge.title}</h3>
                  <p className="text-slate-light mb-4">{challenge.description}</p>
                  <div className="flex items-start gap-2 bg-cyan/5 rounded-lg p-4 border border-cyan/20">
                    <ChevronRight className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-light">{challenge.solution}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.section>

          {/* Impact & Results */}
          <motion.section
            id="impact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-midnight-50 mb-6">Impact & Results</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {study.impact.metrics.map((metric, idx) => (
                <GlassCard key={idx} className="p-6 text-center">
                  <p className="text-3xl font-bold mb-2">
                    <GradientText>{metric.value}</GradientText>
                  </p>
                  <p className="text-slate">{metric.label}</p>
                </GlassCard>
              ))}
            </div>
            
            {study.impact.testimonial && (
              <GlassCard className="p-6">
                <blockquote className="text-lg text-slate-light italic">
                  "{study.impact.testimonial.quote}"
                </blockquote>
                <p className="mt-4 text-sm text-slate">
                  — {study.impact.testimonial.author}, {study.impact.testimonial.role}
                </p>
              </GlassCard>
            )}
          </motion.section>

          {/* Navigation to Other Projects */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pt-8 border-t border-navy-800/30"
          >
            <h3 className="text-lg font-semibold text-midnight-50 mb-4">Explore More Projects</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {projects
                .filter(p => p.id !== project.id)
                .slice(0, 2)
                .map((p) => (
                  <Link
                    key={p.id}
                    to={`/projects/${p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                    className="glass-card-hover p-4 block"
                  >
                    <h4 className="font-semibold text-midnight-50 mb-1">{p.title}</h4>
                    <p className="text-sm text-slate line-clamp-2">{p.description}</p>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </article>
    </>
  );
};

export default ProjectDetail;