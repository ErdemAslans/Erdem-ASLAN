export const TechTag = ({ children, className = '' }) => {
  return (
    <span className={`tech-tag ${className}`}>
      {children}
    </span>
  );
};

export default TechTag;
