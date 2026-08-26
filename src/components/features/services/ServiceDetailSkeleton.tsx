export function ServiceDetailSkeleton() {
  return (
    <div className="w-full space-y-8 py-6 animate-pulse">
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

      {/* Top Switcher Strip Skeleton */}
      <div className="w-full bg-secondary-100/60 border-y border-secondary-200 py-3.5 px-4">
        <div className="container mx-auto">
          <div className="w-48 h-4 bg-secondary-300/80 rounded mb-2" />
          <div className="flex items-center gap-3 overflow-x-hidden">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex-none flex items-center gap-3 p-2 rounded-xl bg-white border border-secondary-200 w-60 sm:w-68 shrink-0"
              >
                <div className="w-13 h-13 rounded-lg bg-secondary-200 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="w-16 h-2.5 bg-secondary-200 rounded" />
                  <div className="w-32 h-4 bg-secondary-300 rounded" />
                  <div className="w-20 h-2.5 bg-secondary-200 rounded" />
                </div>
              </div>
            ))}
          </div>
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

export default ServiceDetailSkeleton;
