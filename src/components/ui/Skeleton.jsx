/** Reusable skeleton loader blocks */
export function SkeletonLine({ className = '' }) {
  return <div className={`skeleton h-4 rounded ${className}`} />;
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`glass p-5 space-y-3 ${className}`}>
      <SkeletonLine className="w-1/3 h-3" />
      <SkeletonLine className="w-2/3 h-6" />
      <SkeletonLine className="w-1/2 h-3" />
    </div>
  );
}

export function SkeletonNewsCard() {
  return (
    <div className="glass p-4 space-y-3">
      <div className="skeleton h-40 w-full rounded-xl" />
      <SkeletonLine className="w-3/4 h-5" />
      <SkeletonLine className="w-full h-3" />
      <SkeletonLine className="w-5/6 h-3" />
      <div className="flex gap-3 pt-1">
        <SkeletonLine className="w-16 h-6 rounded-full" />
        <SkeletonLine className="w-24 h-6 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonMap() {
  return <div className="skeleton w-full h-96 rounded-2xl" />;
}
