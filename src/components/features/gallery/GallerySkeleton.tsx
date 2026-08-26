export function GallerySkeleton() {
  return (
    <div className="w-full min-h-screen flex flex-col animate-pulse">
      {/* Top Banner Header Skeleton */}
      <div className="px-4 pt-4">
        <div
          className="relative w-full py-16 sm:py-20 lg:py-24 px-6 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center shadow-xl border border-primary-900/40"
          style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
        >
          <div className="w-3/4 max-w-md h-8 bg-white/20 rounded-lg mb-3" />
          <div className="w-1/2 max-w-xs h-4 bg-white/15 rounded-md" />
        </div>
      </div>

      {/* Gallery Section Skeleton */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Two-Tier Filter Skeleton */}
        <div className="space-y-4 pb-6 border-b border-secondary-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="w-56 h-6 rounded-md bg-secondary-300/70" />
            <div className="w-full sm:w-72 md:w-80 h-10 rounded-xl bg-secondary-200/80" />
          </div>
          <div className="flex items-center gap-2 overflow-x-hidden">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-28 h-9 rounded-full bg-secondary-200/80 shrink-0" />
            ))}
          </div>
        </div>

        {/* Masonry Columns Skeleton */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          <div className="w-full h-80 rounded-2xl bg-secondary-200/70 break-inside-avoid" />
          <div className="w-full h-56 rounded-2xl bg-secondary-200/70 break-inside-avoid" />
          <div className="w-full h-72 rounded-2xl bg-secondary-200/70 break-inside-avoid" />
          <div className="w-full h-96 rounded-2xl bg-secondary-200/70 break-inside-avoid" />
          <div className="w-full h-64 rounded-2xl bg-secondary-200/70 break-inside-avoid" />
          <div className="w-full h-80 rounded-2xl bg-secondary-200/70 break-inside-avoid" />
          <div className="w-full h-52 rounded-2xl bg-secondary-200/70 break-inside-avoid" />
          <div className="w-full h-76 rounded-2xl bg-secondary-200/70 break-inside-avoid" />
        </div>
      </main>
    </div>
  );
}

export default GallerySkeleton;
