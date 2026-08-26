export function ServicesSkeleton() {
  return (
    <div className="w-full min-h-screen flex flex-col animate-pulse">
      {/* Services Grid Skeleton Section */}
      <section className="w-full py-8 sm:py-12 lg:py-14 space-y-8 sm:space-y-10">
        {/* Category Pills & Search Skeleton */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-6 border-b border-secondary-200/80">
          <div className="flex items-center flex-wrap gap-2 flex-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-24 sm:w-28 h-9 rounded-full bg-secondary-200/80 shrink-0" />
            ))}
          </div>
          <div className="w-full xl:w-80 h-10 rounded-xl bg-secondary-200/80 shrink-0" />
        </div>

        {/* Uniform 3-Column Grid Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-white border border-secondary-200/80 overflow-hidden shadow-xs flex flex-col justify-between"
            >
              {/* Aspect 16:10 Image Skeleton */}
              <div className="w-full aspect-[16/10] bg-secondary-200/70 relative">
                <div className="absolute top-3 left-3 w-20 h-5 rounded-full bg-secondary-300/60" />
                <div className="absolute top-3 right-3 w-8 h-5 rounded-full bg-secondary-300/60" />
              </div>

              {/* Content Skeleton */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-3/4 h-5 bg-secondary-300/80 rounded-md" />
                  <div className="w-full h-3.5 bg-secondary-200/70 rounded-md" />
                  <div className="w-4/5 h-3.5 bg-secondary-200/70 rounded-md" />
                </div>

                {/* Footer Divider + Link Skeleton */}
                <div className="pt-4 border-t border-secondary-100/80 flex items-center justify-start">
                  <div className="w-24 h-4 bg-secondary-300/70 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ServicesSkeleton;
