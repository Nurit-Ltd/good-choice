export function ServiceDetailSkeleton() {
  return (
    <div className="w-full space-y-10 py-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="px-4">
        <div
          className="relative w-full py-16 sm:py-20 px-6 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center shadow-xl border border-primary-900/40"
          style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
        >
          <div className="w-3/4 max-w-lg h-10 bg-white/20 rounded-lg mb-3" />
          <div className="w-48 h-4 bg-white/15 rounded-md" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Split Hero Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="w-36 h-7 rounded-full bg-secondary-200" />
            <div className="w-4/5 h-10 rounded-lg bg-secondary-300" />
            <div className="w-full h-16 rounded-md bg-secondary-200" />
            <div className="flex gap-4 pt-4">
              <div className="w-48 h-12 rounded-xl bg-primary-950/20" />
              <div className="w-36 h-12 rounded-xl bg-secondary-200" />
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="w-full h-85 sm:h-105 rounded-2xl bg-secondary-200 shadow-xl" />
          </div>
        </div>

        {/* Workflow Tabs Skeleton */}
        <div className="space-y-6 pt-6 border-t border-secondary-200">
          <div className="w-64 h-8 rounded-lg bg-secondary-300" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-secondary-100 border border-secondary-200 p-4" />
            ))}
          </div>
          <div className="w-full h-32 rounded-2xl bg-secondary-100 border border-secondary-200" />
        </div>
      </div>
    </div>
  );
}
