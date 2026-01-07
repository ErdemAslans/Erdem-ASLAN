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
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  };

  const disabledClasses = (disabled || loading) ? 'opacity-60 cursor-not-allowed' : '';
  const classes = `${variants[variant] || variants.primary} ${disabledClasses} ${className}`;

  const content = (
    <>
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!loading && children}
      {icon && !loading && (
        <ArrowRight className="w-4 h-4" />
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
    <button
      onClick={disabled || loading ? undefined : onClick}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
