const Skeleton = ({ className = '', shimmer = true }) => {
  return (
    <div
      className={`relative bg-navy-800 rounded-lg overflow-hidden ${className}`}
    >
      {shimmer && (
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-navy-700/50 to-transparent" />
      )}
    </div>
  );
};

export const SkeletonText = ({ lines = 3 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${
            i === lines - 1 ? 'w-2/3' : i === 0 ? 'w-full' : 'w-5/6'
          }`}
        />
      ))}
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="p-6 glass-card space-y-4">
      <div className="flex justify-between items-start">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
      <SkeletonText lines={3} />
      <div className="flex gap-2 pt-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-16 rounded-full" />
        ))}
      </div>
    </div>
  );
};

export const SkeletonProject = () => {
  return (
    <div className="glass-card p-6 space-y-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-8 w-3/4" />
      <SkeletonText lines={2} />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-20 rounded-full" />
        ))}
      </div>
      <Skeleton className="h-5 w-1/4 mt-4" />
    </div>
  );
};

export default Skeleton;
