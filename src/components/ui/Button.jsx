import { ArrowRight } from 'lucide-react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  href, 
  onClick, 
  icon = false,
  external = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "inline-flex items-center gap-3 font-medium transition-all duration-300";
  
  const variants = {
    primary: "px-8 py-4 bg-gradient-to-r from-navy-800 to-navy-800/80 rounded-lg text-midnight-50 hover:from-navy-700 hover:to-navy-700/80",
    secondary: "px-8 py-4 border border-navy-800 rounded-lg text-slate-light hover:border-cyan hover:text-cyan",
    ghost: "text-slate-light hover:text-cyan",
    link: "text-cyan hover:text-cyan-light group"
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {icon && (
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      )}
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {content}
    </button>
  );
};

export default Button;
