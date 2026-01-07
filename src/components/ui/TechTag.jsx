export const TechTag = ({ children, className = '' }) => {
  return (
    <span className={`tag ${className}`}>
      {children}
    </span>
  );
};

export default TechTag;
