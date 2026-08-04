"use client";

import React from "react";

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-stone-200/60 dark:border-neutral-800 bg-stone-50/50 dark:bg-neutral-900/50 animate-pulse">
      {/* Aspect Square Image Skeleton */}
      <div className="aspect-square bg-stone-200 dark:bg-neutral-800 w-full" />

      {/* Content Skeleton */}
      <div className="p-4 flex flex-col gap-2.5">
        <div className="h-3 bg-stone-200 dark:bg-neutral-800 rounded w-1/3" />
        <div className="h-4 bg-stone-300 dark:bg-neutral-700 rounded w-3/4" />
        <div className="h-3 bg-stone-200 dark:bg-neutral-800 rounded w-full" />

        <div className="mt-2 flex items-center justify-between">
          <div className="h-5 bg-stone-300 dark:bg-neutral-700 rounded w-1/4" />
          <div className="h-8 bg-stone-200 dark:bg-neutral-800 rounded-full w-24" />
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={`skeleton-${idx}`} />
      ))}
    </div>
  );
};
