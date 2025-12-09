import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  href,
  onClick,
  icon = false,
  external = false,
  className = '',
  loading = false,
  disabled = false,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center gap-3 font-medium transition-all duration-300 relative overflow-hidden";

  const variants = {
    primary: "px-8 py-4 bg-gradient-to-r from-navy-800 to-navy-800/80 rounded-lg text-midnight-50 hover:from-navy-700 hover:to-navy-700/80 hover:shadow-lg hover:shadow-cyan/10",
    secondary: "px-8 py-4 border border-navy-800 rounded-lg text-slate-light hover:border-cyan hover:text-cyan hover:bg-cyan/5",
    ghost: "text-slate-light hover:text-cyan",
    link: "text-cyan hover:text-cyan-light group"
  };

  const disabledClasses = (disabled || loading) ? "opacity-60 cursor-not-allowed" : "";
  const classes = `${baseClasses} ${variants[variant]} ${disabledClasses} ${className}`;

  const content = (
    <>
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        />
      )}
      {!loading && children}
      {icon && !loading && (
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      )}
    </>
  );

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      href={href}
      onClick={disabled || loading ? undefined : onClick}
      className={classes}
      target={external && href ? "_blank" : undefined}
      rel={external && href ? "noopener noreferrer" : undefined}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {content}
    </MotionComponent>
  );
};

export default Button;
