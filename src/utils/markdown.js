/**
 * Markdown utility functions for blog content
 */

/**
 * Estimate reading time based on word count
 * @param {string} content - The text content
 * @param {number} wordsPerMinute - Reading speed (default: 200)
 * @returns {number} Estimated reading time in minutes
 */
export const estimateReadingTime = (content, wordsPerMinute = 200) => {
  if (!content) return 0;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * Extract headings from markdown content
 * @param {string} content - Markdown content
 * @returns {Array} Array of heading objects with id, text, and level
 */
export const extractHeadings = (content) => {
  if (!content) return [];
  
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    
    headings.push({ id, text, level });
  }
  
  return headings;
};

/**
 * Generate a slug from a title
 * @param {string} title - The title to slugify
 * @returns {string} URL-friendly slug
 */
export const slugify = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

/**
 * Format a date for display
 * @param {string|Date} date - The date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

/**
 * Truncate text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text with ellipsis if needed
 */
export const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Parse front matter from markdown content (basic implementation)
 * @param {string} content - Markdown content with potential front matter
 * @returns {object} Object with data (front matter) and content
 */
export const parseFrontMatter = (content) => {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const frontMatter = match[1];
  const mainContent = match[2];
  
  // Simple YAML parsing (key: value pairs)
  const data = {};
  frontMatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Handle arrays (basic)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
      } else {
        // Remove quotes
        value = value.replace(/^['"]|['"]$/g, '');
      }
      
      data[key] = value;
    }
  });
  
  return { data, content: mainContent };
};

export default {
  estimateReadingTime,
  extractHeadings,
  slugify,
  formatDate,
  truncateText,
  parseFrontMatter,
};