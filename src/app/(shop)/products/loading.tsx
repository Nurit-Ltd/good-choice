import { ProductCardSkeleton } from "@/components/ui/ProductCardSkeleton";

export default function ProductsCatalogLoading() {
  return (
    <div className="container py-8 sm:py-12 space-y-8 animate-pulse">
      {/* Header Title & Breadcrumb Skeleton */}
      <div className="space-y-3 border-b border-stone-200 dark:border-neutral-800 pb-6">
        <div className="h-4 bg-stone-200 dark:bg-neutral-800 rounded w-32" />
        <div className="h-9 bg-stone-300 dark:bg-neutral-700 rounded-lg w-64" />
        <div className="h-4 bg-stone-200/80 dark:bg-neutral-800/80 rounded w-96 max-w-full" />
      </div>

      {/* Main Layout: Filter Sidebar + Products Grid */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Filter Sidebar Skeleton */}
        <div className="hidden lg:block w-64 shrink-0 space-y-6">
          <div className="h-6 bg-stone-300 dark:bg-neutral-700 rounded w-24" />
          <div className="space-y-3">
            <div className="h-4 bg-stone-200 dark:bg-neutral-800 rounded w-full" />
            <div className="h-4 bg-stone-200 dark:bg-neutral-800 rounded w-5/6" />
            <div className="h-4 bg-stone-200 dark:bg-neutral-800 rounded w-4/6" />
          </div>
          <div className="h-px bg-stone-200 dark:bg-neutral-800 my-4" />
          <div className="space-y-3">
            <div className="h-4 bg-stone-200 dark:bg-neutral-800 rounded w-full" />
            <div className="h-4 bg-stone-200 dark:bg-neutral-800 rounded w-3/4" />
          </div>
        </div>

        {/* 12 Product Cards Grid Skeleton */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
