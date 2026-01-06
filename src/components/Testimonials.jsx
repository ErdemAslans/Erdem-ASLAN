import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Star, GitFork, Users } from 'lucide-react';
import { SectionHeader, GlassCard, GradientText } from './ui';
import TestimonialCarousel from './testimonials/TestimonialCarousel';
import { testimonials, featuredIn } from '@/data/testimonials';
import { contactInfo } from '@/data/contact';

const GitHubStats = () => {
  // These would ideally be fetched from GitHub API
  const stats = {
    repos: 35,
    stars: 45,
    contributions: 500,
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Github className="w-6 h-6 text-cyan" />
        <h3 className="text-lg font-semibold text-midnight-50">GitHub Activity</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold">
            <GradientText>{stats.repos}+</GradientText>
          </p>
          <p className="text-sm text-slate">Repositories</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">
            <GradientText>{stats.stars}</GradientText>
          </p>
          <p className="text-sm text-slate">Stars</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">
            <GradientText>{stats.contributions}+</GradientText>
          </p>
          <p className="text-sm text-slate">Contributions</p>
        </div>
      </div>

      <a
        href={contactInfo.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block text-center text-sm text-slate-light hover:text-cyan transition-colors"
      >
        View GitHub Profile →
      </a>
    </GlassCard>
  );
};

const FeaturedIn = () => {
  if (!featuredIn || featuredIn.length === 0) return null;

  return (
    <div className="mt-12">
      <p className="text-center text-sm text-slate uppercase tracking-wider mb-6">Featured In</p>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
        {featuredIn.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-100 transition-opacity"
          >
            {item.logo ? (
              <img src={item.logo} alt={item.name} className="h-8" />
            ) : (
              <span className="text-slate-light font-medium">{item.name}</span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="testimonials" className="py-32 relative">
      <div className="section-container">
        <SectionHeader 
          subtitle="Testimonials"
          title="What Others"
          highlightedWord="Say"
          className="mb-12"
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Testimonials Carousel */}
          <div className="lg:col-span-2">
            <TestimonialCarousel testimonials={testimonials} />
          </div>

          {/* GitHub Stats */}
          <div>
            <GitHubStats />
          </div>
        </motion.div>

        {/* Featured In */}
        <FeaturedIn />
      </div>
    </section>
  );
};

export default Testimonials;