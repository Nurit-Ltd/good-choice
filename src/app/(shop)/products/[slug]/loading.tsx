export default function ProductDetailLoading() {
  return (
    <div className="container py-8 sm:py-12 space-y-12 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 bg-stone-200 dark:bg-neutral-800 rounded w-48" />

      {/* Main Product Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left Column: Image Gallery Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-stone-200 dark:bg-neutral-800 rounded-2xl w-full" />
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-20 h-20 bg-stone-200 dark:bg-neutral-800 rounded-xl shrink-0" />
            ))}
          </div>
        </div>

        {/* Right Column: Product Specs & Buy Controls Skeleton */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-3 bg-stone-200 dark:bg-neutral-800 rounded w-24" />
            <div className="h-9 bg-stone-300 dark:bg-neutral-700 rounded-lg w-5/6" />
            <div className="h-7 bg-stone-300 dark:bg-neutral-700 rounded w-32" />
          </div>

          <div className="h-px bg-stone-200 dark:bg-neutral-800" />

          <div className="space-y-2">
            <div className="h-4 bg-stone-200 dark:bg-neutral-800 rounded w-full" />
            <div className="h-4 bg-stone-200 dark:bg-neutral-800 rounded w-full" />
            <div className="h-4 bg-stone-200 dark:bg-neutral-800 rounded w-3/4" />
          </div>

          <div className="h-px bg-stone-200 dark:bg-neutral-800" />

          {/* Variant Selector Skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-stone-200 dark:bg-neutral-800 rounded w-20" />
            <div className="flex gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-10 w-24 bg-stone-200 dark:bg-neutral-800 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Quantity & CTA Buttons Skeleton */}
          <div className="flex gap-4 pt-4">
            <div className="h-12 w-32 bg-stone-200 dark:bg-neutral-800 rounded-full" />
            <div className="h-12 flex-1 bg-stone-300 dark:bg-neutral-700 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
