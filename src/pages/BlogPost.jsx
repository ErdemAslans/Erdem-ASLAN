import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, Copy, Check } from 'lucide-react';
import { blogPosts } from '@/data/blog';

const TableOfContents = ({ headings, activeId }) => {
  if (!headings || headings.length === 0) return null;

  return (
    <nav className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 w-48">
      <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-4">Contents</p>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`text-sm transition-colors duration-200 block py-1 border-l pl-3 ${
                activeId === heading.id
                  ? 'text-text-primary border-text-primary'
                  : 'text-text-muted hover:text-text-secondary border-border'
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
    <div className="fixed top-0 left-0 right-0 h-0.5 bg-border z-50">
      <motion.div
        className="h-full bg-text-primary"
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

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-text-muted">Share:</span>
      <button
        onClick={handleCopy}
        className="p-2 rounded border border-border hover:border-border-hover text-text-muted hover:text-text-primary transition-colors"
        title="Copy link"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
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
          <h1 className="text-2xl font-bold text-text-primary mb-4">Article Not Found</h1>
          <button className="btn-primary" onClick={() => navigate('/blog')}>
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
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
        <div className="container max-w-3xl">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
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
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
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
              className="mb-8 rounded overflow-hidden"
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
            className="prose-minimal"
          >
            <div 
              className="text-text-secondary leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.contentHtml || `<p>${post.content || post.excerpt}</p>` }}
            />
          </motion.div>

          {/* Author Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-border flex items-center justify-center text-2xl font-bold text-text-primary">
                  EA
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Erdem Aslan</h3>
                  <p className="text-sm text-text-muted mb-3">AI/ML Engineer</p>
                  <p className="text-sm text-text-secondary">
                    Building intelligent systems that transform enterprise operations. 
                    Passionate about multi-agent architectures and production ML systems.
                  </p>
                </div>
              </div>
            </div>
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
              <h2 className="text-xl font-bold text-text-primary mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="card card-interactive p-4 block"
                  >
                    <h3 className="font-semibold text-text-primary mb-2">{relatedPost.title}</h3>
                    <p className="text-sm text-text-muted line-clamp-2">{relatedPost.excerpt}</p>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </article>

      {/* Article Styles */}
      <style>{`
        .prose-minimal h2 {
          color: var(--text-primary);
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose-minimal h3 {
          color: var(--text-primary);
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose-minimal p {
          margin-bottom: 1rem;
        }
        .prose-minimal code {
          background: var(--border);
          padding: 0.2em 0.4em;
          border-radius: 0.25rem;
          font-size: 0.875em;
          color: var(--text-primary);
          font-family: 'JetBrains Mono', monospace;
        }
        .prose-minimal pre {
          background: #1a1a1a;
          padding: 1rem;
          border-radius: 0.25rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          border: 1px solid var(--border);
        }
        .prose-minimal pre code {
          background: transparent;
          padding: 0;
          color: inherit;
        }
        .prose-minimal ul, .prose-minimal ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        .prose-minimal li {
          margin-bottom: 0.5rem;
        }
        .prose-minimal blockquote {
          border-left: 2px solid var(--text-primary);
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: var(--text-muted);
        }
        .prose-minimal a {
          color: var(--text-primary);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .prose-minimal a:hover {
          text-decoration: none;
        }
        .prose-minimal img {
          border-radius: 0.25rem;
          margin: 1.5rem 0;
        }
      `}</style>
    </>
  );
};

export default BlogPost;