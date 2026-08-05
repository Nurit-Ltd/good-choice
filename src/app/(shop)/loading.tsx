import { ProductGridSkeleton } from "@/components/ui/ProductCardSkeleton";

export default function ShopHomeLoading() {
  return (
    <div className="w-full pb-16 space-y-12 animate-pulse">
      {/* 1. Hero Banner Skeleton */}
      <section className="px-4 pt-4">
        <div className="w-full h-[70vh] max-h-180 rounded-2xl bg-stone-200/70 dark:bg-neutral-800 flex flex-col justify-end p-6 sm:p-12 gap-4">
          <div className="h-10 sm:h-14 bg-stone-300 dark:bg-neutral-700 rounded-lg w-3/4 max-w-xl" />
          <div className="h-5 sm:h-6 bg-stone-300/80 dark:bg-neutral-700/80 rounded-md w-1/2 max-w-md" />
        </div>
      </section>

      {/* 2. Shop By Room Section Skeleton */}
      <section className="container py-8">
        <div className="space-y-3 mb-8">
          <div className="h-8 bg-stone-200 dark:bg-neutral-800 rounded-lg w-48" />
          <div className="h-4 bg-stone-200/80 dark:bg-neutral-800/80 rounded w-96 max-w-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-3/4 bg-stone-200 dark:bg-neutral-800 rounded-2xl" />
          ))}
        </div>
      </section>

      {/* 3. Product Section Skeleton */}
      <section className="container py-8 space-y-8">
        <div className="flex flex-col items-center text-center gap-3 max-w-lg mx-auto">
          <div className="h-9 bg-stone-200 dark:bg-neutral-800 rounded-lg w-64" />
          <div className="h-4 bg-stone-200/80 dark:bg-neutral-800/80 rounded w-80" />
        </div>
        <ProductGridSkeleton count={8} />
      </section>
    </div>
  );
}
