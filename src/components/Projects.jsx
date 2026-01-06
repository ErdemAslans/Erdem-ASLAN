import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Folder, ExternalLink, ArrowRight, Eye } from 'lucide-react';
import { SectionHeader, GlassCard } from './ui';
import { projects, projectFilters, filterProjects, projectCaseStudies, getProjectSlug } from '@/data/projects';
import { contactInfo } from '@/data/contact';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasCaseStudy = projectCaseStudies?.some(cs => cs.projectId === project.id);
  const projectSlug = getProjectSlug(project);

  const CardWrapper = hasCaseStudy ? Link : 'a';
  const cardProps = hasCaseStudy
    ? { to: `/projects/${projectSlug}` }
    : { href: project.link, target: "_blank", rel: "noopener noreferrer" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <CardWrapper
        {...cardProps}
        className="glass-card-hover p-6 block h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-800 to-midnight-900 flex items-center justify-center">
            <Folder className="w-6 h-6 text-cyan" strokeWidth={1.5} />
          </div>
          <div className="flex items-center gap-2">
            {hasCaseStudy && (
              <span className="text-xs px-2 py-1 bg-cyan/20 text-cyan rounded-full flex items-center gap-1">
                <Eye className="w-3 h-3" />
                Case Study
              </span>
            )}
            <ExternalLink
              className={`w-5 h-5 transition-all duration-300 ${
                isHovered
                  ? 'text-cyan translate-x-1 -translate-y-1'
                  : 'text-slate'
              }`}
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-midnight-50 mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-slate mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono text-cyan bg-cyan/10 px-2 py-1 rounded">
            {project.metrics}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs text-slate">{tech}</span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-xs text-slate">+{project.tech.length - 3}</span>
          )}
        </div>

        {hasCaseStudy && (
          <div className="mt-4 pt-4 border-t border-navy-800/30">
            <span className="text-sm text-cyan flex items-center gap-2 group">
              View Case Study
              <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </span>
          </div>
        )}
      </CardWrapper>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const filteredProjects = filterProjects(projects, activeFilter);

  return (
    <section id="projects" className="py-32 relative">
      <div className="section-container">
        <SectionHeader 
          subtitle="Portfolio"
          title="Featured"
          highlightedWord="Projects"
          className="mb-8"
        />

        {/* Filters */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {projectFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={idx}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a 
            href={`${contactInfo.github}?tab=repositories`}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-slate-light hover:text-cyan transition-colors group"
          >
            View All 35+ Repositories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
