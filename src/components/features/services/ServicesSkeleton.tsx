export function ServicesSkeleton() {
  return (
    <div className="w-full min-h-screen flex flex-col animate-pulse">
      {/* Top Banner Header Skeleton */}
      <div className="px-4 pt-4">
        <div
          className="relative w-full py-16 sm:py-20 lg:py-24 px-6 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center shadow-xl border border-primary-900/40"
          style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
        >
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <span className="font-heading text-xl font-medium tracking-widest text-white/50">GC</span>
          </div>
          <div className="w-3/4 max-w-md h-8 bg-white/20 rounded-lg mb-3" />
          <div className="w-1/2 max-w-xs h-4 bg-white/15 rounded-md" />
        </div>
      </div>

      {/* Bento Grid Skeleton Section */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Category Pills Skeleton */}
        <div className="flex items-center justify-between pb-6 border-b border-secondary-200/80">
          <div className="flex items-center gap-2 overflow-x-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-28 h-9 rounded-full bg-secondary-200/70 shrink-0" />
            ))}
          </div>
          <div className="hidden sm:block w-64 h-10 rounded-xl bg-secondary-200/70" />
        </div>

        {/* Bento Grid Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 (Wide 2 Cols) */}
          <div className="md:col-span-2 lg:col-span-2 rounded-2xl bg-white border border-secondary-200 p-6 space-y-4 shadow-xs">
            <div className="w-full h-64 rounded-xl bg-secondary-200/70" />
            <div className="w-2/3 h-6 bg-secondary-300/80 rounded-md" />
            <div className="w-full h-4 bg-secondary-200/60 rounded-md" />
            <div className="w-4/5 h-4 bg-secondary-200/60 rounded-md" />
          </div>

          {/* Card 2 (Standard 1 Col) */}
          <div className="col-span-1 rounded-2xl bg-white border border-secondary-200 p-6 space-y-4 shadow-xs">
            <div className="w-full h-48 rounded-xl bg-secondary-200/70" />
            <div className="w-4/5 h-6 bg-secondary-300/80 rounded-md" />
            <div className="w-full h-4 bg-secondary-200/60 rounded-md" />
          </div>

          {/* Card 3 (Standard 1 Col) */}
          <div className="col-span-1 rounded-2xl bg-white border border-secondary-200 p-6 space-y-4 shadow-xs">
            <div className="w-full h-48 rounded-xl bg-secondary-200/70" />
            <div className="w-4/5 h-6 bg-secondary-300/80 rounded-md" />
            <div className="w-full h-4 bg-secondary-200/60 rounded-md" />
          </div>

          {/* Card 4 (Wide 2 Cols) */}
          <div className="md:col-span-2 lg:col-span-2 rounded-2xl bg-white border border-secondary-200 p-6 space-y-4 shadow-xs">
            <div className="w-full h-64 rounded-xl bg-secondary-200/70" />
            <div className="w-2/3 h-6 bg-secondary-300/80 rounded-md" />
            <div className="w-full h-4 bg-secondary-200/60 rounded-md" />
          </div>
        </div>
      </main>
    </div>
  );
}
