import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, ChevronRight } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { projects, projectCaseStudies } from '@/data/projects';

const TableOfContents = ({ sections, activeSection }) => {
  return (
    <nav className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 w-48">
      <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-4">On This Page</p>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`text-sm transition-colors duration-200 block py-1 border-l pl-3 ${
                activeSection === section.id
                  ? 'text-text-primary border-text-primary'
                  : 'text-text-muted hover:text-text-secondary border-border'
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
    <div className="fixed top-0 left-0 right-0 h-0.5 bg-border z-50">
      <motion.div
        className="h-full bg-text-primary"
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
          <h1 className="text-2xl font-bold text-text-primary mb-4">Project Not Found</h1>
          <button className="btn-primary" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
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
        <div className="container max-w-4xl">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
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
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-text-muted mb-6">{project.description}</p>
            
            <div className="flex flex-wrap gap-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Github className="w-4 h-4" />
                View Repository
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
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
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold text-text-primary">{project.metrics}</p>
              <p className="text-sm text-text-muted">Key Metric</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold text-text-primary">{project.tech.length}</p>
              <p className="text-sm text-text-muted">Technologies</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold text-text-primary capitalize">{project.category.replace('-', ' ')}</p>
              <p className="text-sm text-text-muted">Category</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-2xl font-bold text-text-primary">2024</p>
              <p className="text-sm text-text-muted">Year</p>
            </div>
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
            <h2 className="section-title">// Overview</h2>
            <p className="text-text-secondary leading-relaxed">{study.overview}</p>
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
            <h2 className="section-title">// Problem Statement</h2>
            <div className="card p-6">
              <p className="text-text-secondary leading-relaxed">{study.problemStatement}</p>
            </div>
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
            <h2 className="section-title">// Solution</h2>
            <p className="text-text-secondary leading-relaxed mb-6">{study.solution}</p>
            
            {study.codeSnippets && study.codeSnippets.length > 0 && (
              <div className="space-y-4">
                {study.codeSnippets.map((snippet, idx) => (
                  <div key={idx} className="rounded overflow-hidden border border-border">
                    <div className="bg-bg-secondary px-4 py-2 flex items-center justify-between border-b border-border">
                      <span className="text-sm text-text-muted">{snippet.filename}</span>
                      <span className="text-xs font-mono text-text-muted">{snippet.language}</span>
                    </div>
                    <SyntaxHighlighter
                      language={snippet.language}
                      style={oneDark}
                      customStyle={{
                        margin: 0,
                        borderRadius: 0,
                        fontSize: '0.875rem',
                        background: '#0f0f0f',
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
            <h2 className="section-title">// Architecture</h2>
            <div className="card p-6">
              <p className="text-text-secondary leading-relaxed mb-4">{study.architecture.description}</p>
              {study.architecture.diagram && (
                <img 
                  src={study.architecture.diagram} 
                  alt="Architecture Diagram" 
                  className="w-full rounded"
                />
              )}
              
              {/* Tech Stack Visual */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-4">Tech Stack</h4>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-bg-secondary border border-border rounded text-sm text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
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
            <h2 className="section-title">// Challenges & Solutions</h2>
            <div className="space-y-4">
              {study.challenges.map((challenge, idx) => (
                <div key={idx} className="card p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{challenge.title}</h3>
                  <p className="text-text-secondary mb-4">{challenge.description}</p>
                  <div className="flex items-start gap-2 bg-bg-secondary rounded p-4 border border-border">
                    <ChevronRight className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-text-secondary">{challenge.solution}</p>
                  </div>
                </div>
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
            <h2 className="section-title">// Impact & Results</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {study.impact.metrics.map((metric, idx) => (
                <div key={idx} className="card p-6 text-center">
                  <p className="text-3xl font-bold text-text-primary mb-2">
                    {metric.value}
                  </p>
                  <p className="text-text-muted">{metric.label}</p>
                </div>
              ))}
            </div>
            
            {study.impact.testimonial && (
              <div className="card p-6">
                <blockquote className="text-lg text-text-secondary italic">
                  "{study.impact.testimonial.quote}"
                </blockquote>
                <p className="mt-4 text-sm text-text-muted">
                  — {study.impact.testimonial.author}, {study.impact.testimonial.role}
                </p>
              </div>
            )}
          </motion.section>

          {/* Navigation to Other Projects */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pt-8 border-t border-border"
          >
            <h3 className="text-lg font-semibold text-text-primary mb-4">Explore More Projects</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {projects
                .filter(p => p.id !== project.id)
                .slice(0, 2)
                .map((p) => (
                  <Link
                    key={p.id}
                    to={`/projects/${p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                    className="card card-interactive p-4 block"
                  >
                    <h4 className="font-semibold text-text-primary mb-1">{p.title}</h4>
                    <p className="text-sm text-text-muted line-clamp-2">{p.description}</p>
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