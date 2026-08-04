export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAF7F2] dark:bg-neutral-950 text-grey-950 dark:text-neutral-100 p-6 z-50">
      <div className="flex flex-col items-center gap-6 max-w-sm text-center">
        {/* Animated Brand Monogram Circle */}
        <div className="relative flex items-center justify-center w-20 h-20">
          <div className="absolute inset-0 rounded-full border-2 border-primary-950/20 dark:border-primary-400/20 animate-ping opacity-75" />
          <div className="relative w-16 h-16 rounded-full bg-primary-950 text-white dark:bg-primary-900 flex items-center justify-center shadow-lg">
            <span className="font-heading text-xl font-medium tracking-widest">GC</span>
          </div>
        </div>

        {/* Brand Name & Luxury Subtitle */}
        <div className="space-y-1.5">
          <h2 className="font-heading text-2xl font-normal tracking-wide text-grey-950 dark:text-neutral-100">
            Good Choice
          </h2>
          <p className="font-body text-xs tracking-widest uppercase font-medium text-stone-500 dark:text-neutral-400">
            Bespoke Furniture
          </p>
        </div>

        {/* Subtle Horizontal Loading Pulse Indicator */}
        <div className="w-32 h-0.5 bg-stone-200 dark:bg-neutral-800 rounded-full overflow-hidden mt-2">
          <div className="w-full h-full bg-primary-950 dark:bg-primary-500 -translate-x-full animate-[shimmer_1.5s_infinite]" style={{ animation: 'loadingBar 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
