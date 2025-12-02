export const GradientText = ({ children, className = '' }) => {
  return (
    <span className={`bg-gradient-to-r from-blue-400 via-cyan to-cyan-light bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};

export default GradientText;
