import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { projects, projectFilters, filterProjects, projectCaseStudies, getProjectSlug } from '@/data/projects';
import { contactInfo } from '@/data/contact';

const ProjectCard = ({ project, index }) => {
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
        className="project-card block h-full"
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="project-title">
            {project.title}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors" />
        </div>
        
        <p className="project-description mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center gap-3 mb-4">
          <span className="badge">
            {project.metrics}
          </span>
          {hasCaseStudy && (
            <span className="badge">
              Case Study
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((tech) => (
            <span key={tech} className="tag tag-sm">{tech}</span>
          ))}
          {project.tech.length > 4 && (
            <span className="tag tag-sm">+{project.tech.length - 4}</span>
          )}
        </div>
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
    <section id="projects" className="section border-t border-border">
      <div className="container">
        <p className="section-title">// Projects</p>

        {/* Filters */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {projectFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 py-1.5 text-sm font-mono rounded transition-colors ${
                activeFilter === filter.id 
                  ? 'bg-white text-black' 
                  : 'text-text-secondary hover:text-text-primary border border-border hover:border-border-hover'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
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
          className="mt-10"
        >
          <a 
            href={`${contactInfo.github}?tab=repositories`}
            target="_blank" 
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-2"
          >
            View all repositories
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
