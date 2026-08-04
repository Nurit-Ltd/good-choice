"use client";

import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { useHomePageData } from "@/hooks/use-home";
import { useCallback, useEffect, useState } from "react";

interface BannerProps {
  autoPlayInterval?: number;
  className?: string;
}

export function Banner({ autoPlayInterval = 4000, className = "" }: BannerProps) {
  const { data: homeData } = useHomePageData();
  const banner = homeData?.banner;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  const slides = banner?.slides || [];
  const hasMultipleSlides = slides.length > 1;
  const currentSlide = slides[currentIndex] || slides[0];

  const handleSlideChange = useCallback(
    (newIndex: number) => {
      if (newIndex === currentIndex || slides.length === 0) return;
      setPrevIndex(currentIndex);
      setCurrentIndex(newIndex);
    },
    [currentIndex, slides.length],
  );

  const nextSlide = useCallback(() => {
    if (slides.length <= 1) return;
    handleSlideChange((currentIndex + 1) % slides.length);
  }, [currentIndex, slides.length, handleSlideChange]);

  // Reset prevIndex after animation duration (1250ms)
  useEffect(() => {
    if (prevIndex === null) return;
    const timer = setTimeout(() => {
      setPrevIndex(null);
    }, 1250);
    return () => clearTimeout(timer);
  }, [prevIndex]);

  // Continuous JS timer autoplay
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setTimeout(nextSlide, autoPlayInterval);
    return () => clearTimeout(timer);
  }, [currentIndex, autoPlayInterval, nextSlide, slides.length]);

  const activeTitle = currentSlide?.title || banner?.title || "";
  const activeSubtitle = currentSlide?.subtitle || banner?.subtitle || "";

  return (
    <section className={`w-full ${className}`}>
      {/* GPU-Accelerated Smooth Keyframe Animation */}
      <style>{`
        @keyframes bannerProgressFill {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes slideOutLeft {
          0% {
            transform: translateX(0%);
            opacity: 1;
          }
          100% {
            transform: translateX(-100%);
            opacity: 1;
          }
        }

        @keyframes scaleDownEnter {
          0% {
            transform: scale(1.25);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-slide-out-left {
          animation: slideOutLeft 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-scale-down-enter {
          animation: scaleDownEnter 1250ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      <div className="relative w-full min-h-125 sm:min-h-150 lg:min-h-200 h-[75vh] max-h-200 rounded-lg overflow-hidden flex flex-col justify-end p-6 sm:p-10 lg:p-16 group bg-linear-to-br from-[#FAF7F2] via-[#F5F1E8] to-[#EFECE5]">
        {/* Strapi Unpopulated Badge when 0 slides exist */}
        {!slides.length && (
          <div className="absolute top-6 right-6 px-3.5 py-1.5 bg-stone-900/10 backdrop-blur-xs border border-stone-900/15 text-stone-700 text-xs font-semibold rounded-full z-20">
            No Banners Uploaded (Strapi CMS)
          </div>
        )}
        {/* Background Images with Slide Out Left + Scale Down Enter Transitions */}
        {slides.map((slide, idx) => {
          const isCurrent = idx === currentIndex;
          const isPrev = idx === prevIndex;

          let animationClass = "opacity-0 -z-10 pointer-events-none";
          if (isCurrent) {
            animationClass = "z-2 animate-scale-down-enter";
          } else if (isPrev) {
            animationClass = "z-1 animate-slide-out-left";
          }

          if (!slide.image) return null;

          return (
            <div key={slide.id} className={`absolute inset-0 ${animationClass}`}>
              <ImageWithFallback src={slide.image} alt={slide.alt || activeTitle} fill priority={idx === 0} sizes="100vw" fallbackType="banner" className="object-cover object-top" />
            </div>
          );
        })}

        {/* Bottom White Gradient Overlay for Text Readability */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-white/80 to-transparent pointer-events-none z-15" />

        {/* Content & Active Slide Controls */}
        <div className="relative z-20 w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-12">
          {/* Constant Title & Subtitle */}
          <div className="max-w-xl text-left space-y-3">
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-[60px] xl:text-[64px] font-normal leading-[108%] tracking-wide text-grey-950">{activeTitle}</h1>
            <p className="font-body text-xs sm:text-sm lg:text-[16px] font-normal leading-[150%] text-grey-950/90 max-w-lg">{activeSubtitle}</p>
          </div>

          {/* Interactive Slide Thumbnails (Rendered ONLY when slides > 1) */}
          {hasMultipleSlides && (
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 overflow-x-auto pb-2 lg:pb-0 scrollbar-none w-full lg:w-auto">
              {slides.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => handleSlideChange(idx)}
                    className="group/thumb relative w-24 h-16 sm:w-36 sm:h-24 lg:w-53.75 lg:h-32 rounded-lg overflow-hidden transition-all duration-300 shrink-0 cursor-pointer shadow-sm bg-stone-200"
                    aria-label={`Select slide ${idx + 1}`}
                  >
                    {slide.image ? (
                      <ImageWithFallback
                        src={slide.image}
                        alt={slide.alt || `Slide ${idx + 1}`}
                        fill
                        sizes="(max-width: 640px) 96px, (max-width: 1024px) 144px, 176px"
                        fallbackType="banner"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-stone-200 to-stone-300 flex items-center justify-center font-heading text-xs font-semibold text-grey-950">{idx + 1}</div>
                    )}

                    {/* Active Slide Dynamic Progress Overlay (0 to 100%) */}
                    {isActive && (
                      <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
                        <div
                          key={`${currentIndex}`}
                          className="h-full border-r-2 border-primary-950"
                          style={{
                            backgroundColor: "rgba(98, 16, 58, 0.45)",
                            mixBlendMode: "multiply",
                            animationName: "bannerProgressFill",
                            animationDuration: `${autoPlayInterval}ms`,
                            animationTimingFunction: "linear",
                            animationFillMode: "forwards",
                            animationPlayState: "running",
                          }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
