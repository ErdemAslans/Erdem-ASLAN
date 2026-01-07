export const GradientText = ({ children, className = '' }) => {
  // Minimalist design - plain white text instead of gradients
  return (
    <span className={`text-text-primary ${className}`}>
      {children}
    </span>
  );
};

export default GradientText;
