import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { GlassCard, GradientText, Button } from '@/components/ui';
import { blogPosts, blogCategories } from '@/data/blog';

const BlogCard = ({ post, index }) => {
  const readingTime = Math.ceil(post.content?.length / 1500) || post.readingTime || 5;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="glass-card-hover block p-6 h-full"
      >
        {post.coverImage && (
          <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-navy-800">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-cyan/10 text-cyan rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-midnight-50 mb-2 group-hover:text-cyan transition-colors">
          {post.title}
        </h2>
        
        <p className="text-slate-light text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-slate">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readingTime} min read
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-cyan" />
        </div>
      </Link>
    </motion.article>
  );
};

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = 
        selectedCategory === 'all' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
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
          <p className="text-cyan text-sm font-mono tracking-wider uppercase mb-4">Blog</p>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Insights & <GradientText>Articles</GradientText>
          </h1>
          <p className="text-lg text-slate-light max-w-2xl mx-auto">
            Thoughts on AI/ML, software architecture, and building intelligent systems. 
            Sharing what I learn along the way.
          </p>
        </motion.header>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-navy-800/50 border border-navy-800 rounded-lg text-slate-light placeholder:text-slate focus:outline-none focus:border-cyan transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            >
              All Posts
            </button>
            {blogCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => (
              <BlogCard key={post.slug} post={post} index={idx} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-slate-light text-lg mb-4">No articles found matching your criteria.</p>
            <Button
              variant="secondary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <GlassCard className="p-8 text-center">
            <h2 className="text-2xl font-bold text-midnight-50 mb-2">Stay Updated</h2>
            <p className="text-slate-light mb-6">
              Get notified when I publish new articles about AI, ML, and software engineering.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-navy-800/50 border border-navy-800 rounded-lg text-slate-light placeholder:text-slate focus:outline-none focus:border-cyan transition-colors"
              />
              <Button variant="primary">Subscribe</Button>
            </div>
          </GlassCard>
        </motion.section>
      </div>
    </div>
  );
};

export default Blog;