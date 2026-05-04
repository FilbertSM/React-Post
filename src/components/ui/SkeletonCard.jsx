import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-surface-card border border-text-secondary/30 rounded-lg overflow-hidden flex flex-col animate-pulse">
      {/* Header Skeleton */}
      <div className="px-4 py-4 border-b border-text-secondary/30 bg-[#12161c]">
        <div className="h-5 bg-text-secondary/20 rounded w-3/4 mb-2"></div>
        <div className="flex gap-2">
          <div className="h-4 bg-text-secondary/20 rounded w-16"></div>
          <div className="h-4 bg-text-secondary/20 rounded w-24"></div>
        </div>
      </div>
      
      {/* Body Skeleton */}
      <div className="p-4 flex-grow bg-surface-bg/50">
        <div className="h-3 bg-text-secondary/20 rounded w-full mb-2"></div>
        <div className="h-3 bg-text-secondary/20 rounded w-full mb-2"></div>
        <div className="h-3 bg-text-secondary/20 rounded w-5/6 mb-2"></div>
        <div className="h-3 bg-text-secondary/20 rounded w-4/6"></div>
      </div>

      {/* Footer Skeleton */}
      <div className="p-3 border-t border-text-secondary/30 bg-[#12161c]">
        <div className="h-8 bg-text-secondary/20 rounded w-full"></div>
      </div>
    </div>
  );
}