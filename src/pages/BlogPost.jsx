import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Copy, Check, Twitter, Linkedin } from 'lucide-react';
import { GlassCard, GradientText, Button } from '@/components/ui';
import { blogPosts } from '@/data/blog';

const TableOfContents = ({ headings, activeId }) => {
  if (!headings || headings.length === 0) return null;

  return (
    <nav className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 w-48">
      <p className="text-xs font-mono text-slate uppercase tracking-wider mb-4">Contents</p>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`text-sm transition-colors duration-200 block py-1 border-l-2 pl-3 ${
                activeId === heading.id
                  ? 'text-cyan border-cyan'
                  : 'text-slate hover:text-slate-light border-navy-800'
              }`}
              style={{ paddingLeft: `${(heading.level - 1) * 12 + 12}px` }}
            >
              {heading.text}
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

const ShareButtons = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate">Share:</span>
      <button
        onClick={handleCopy}
        className="p-2 rounded-lg bg-navy-800/50 hover:bg-navy-800 text-slate hover:text-cyan transition-colors"
        title="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </button>
      <button
        onClick={shareOnTwitter}
        className="p-2 rounded-lg bg-navy-800/50 hover:bg-navy-800 text-slate hover:text-cyan transition-colors"
        title="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>
      <button
        onClick={shareOnLinkedIn}
        className="p-2 rounded-lg bg-navy-800/50 hover:bg-navy-800 text-slate hover:text-cyan transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </button>
    </div>
  );
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeHeading, setActiveHeading] = useState('');

  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('h2[id], h3[id]');
      for (const heading of Array.from(headings).reverse()) {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 150) {
          setActiveHeading(heading.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-midnight-50 mb-4">Article Not Found</h1>
          <Button variant="primary" onClick={() => navigate('/blog')}>
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const readingTime = Math.ceil(post.content?.length / 1500) || post.readingTime || 5;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Parse headings from content for table of contents
  const headings = post.headings || [];

  // Related posts
  const relatedPosts = blogPosts
    .filter(p => p.slug !== slug && p.category === post.category)
    .slice(0, 2);

  return (
    <>
      <ReadingProgress />
      <TableOfContents headings={headings} activeId={activeHeading} />

      <article className="min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-slate-light hover:text-cyan transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-cyan/10 text-cyan rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              <GradientText>{post.title}</GradientText>
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {readingTime} min read
              </span>
              {post.category && (
                <span className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  {post.category}
                </span>
              )}
            </div>

            {/* Share Buttons */}
            <ShareButtons title={post.title} url={currentUrl} />
          </motion.header>

          {/* Cover Image */}
          {post.coverImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 rounded-xl overflow-hidden"
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full aspect-video object-cover"
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="prose prose-invert prose-cyan max-w-none"
          >
            {/* Render content - in a real app, this would be parsed markdown */}
            <div 
              className="text-slate-light leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.contentHtml || `<p>${post.content || post.excerpt}</p>` }}
            />
          </motion.div>

          {/* Author Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 pt-8 border-t border-navy-800/30"
          >
            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan/20 to-cyan-light/10 flex items-center justify-center text-2xl font-bold text-cyan">
                  EA
                </div>
                <div>
                  <h3 className="font-semibold text-midnight-50 mb-1">Erdem Aslan</h3>
                  <p className="text-sm text-slate mb-3">AI/ML Engineer</p>
                  <p className="text-sm text-slate-light">
                    Building intelligent systems that transform enterprise operations. 
                    Passionate about multi-agent architectures and production ML systems.
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-12"
            >
              <h2 className="text-xl font-bold text-midnight-50 mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="glass-card-hover p-4 block"
                  >
                    <h3 className="font-semibold text-midnight-50 mb-2">{relatedPost.title}</h3>
                    <p className="text-sm text-slate line-clamp-2">{relatedPost.excerpt}</p>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </article>

      {/* Article Styles */}
      <style>{`
        .prose h2 {
          color: var(--text-primary);
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose h3 {
          color: var(--text-primary);
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose p {
          margin-bottom: 1rem;
        }
        .prose code {
          background: rgba(56, 189, 248, 0.1);
          padding: 0.2em 0.4em;
          border-radius: 0.25rem;
          font-size: 0.875em;
          color: #38bdf8;
        }
        .prose pre {
          background: #1e293b;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .prose pre code {
          background: transparent;
          padding: 0;
          color: inherit;
        }
        .prose ul, .prose ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .prose blockquote {
          border-left: 3px solid #38bdf8;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: var(--text-secondary);
        }
        .prose a {
          color: #38bdf8;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .prose a:hover {
          color: #22d3ee;
        }
        .prose img {
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }
      `}</style>
    </>
  );
};

export default BlogPost;