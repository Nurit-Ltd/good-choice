"use client";

import { bannerData, BannerData } from "@/config/banner";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface BannerProps {
  data?: BannerData;
  autoPlayInterval?: number;
  className?: string;
}

export function Banner({ data = bannerData, autoPlayInterval = 4000, className = "" }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % data.slides.length);
  }, [data.slides.length]);

  // Guaranteed JS timer backup so slide transition never freezes
  useEffect(() => {
    if (isPaused || data.slides.length <= 1) return;
    const timer = setTimeout(nextSlide, autoPlayInterval);
    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, autoPlayInterval, nextSlide, data.slides.length]);

  return (
    <section className={`w-full ${className}`}>
      {/* GPU-Accelerated 100% Smooth Keyframe Animation */}
      <style>{`
        @keyframes bannerProgressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      <div
        className="relative w-full min-h-125 sm:min-h-150 lg:min-h-175 h-[75vh] max-h-200 rounded-lg overflow-hidden flex flex-col justify-end p-6 sm:p-10 lg:p-16 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Images with Smooth Transition */}
        {data.slides.map((slide, idx) => (
          <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? "opacity-100 z-0" : "opacity-0 -z-10"}`}>
            <Image src={slide.image} alt={slide.alt} fill priority={idx === 0} sizes="100vw" className="object-cover object-top" />
          </div>
        ))}

        {/* Bottom White Gradient Overlay for Text Readability */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-white/80 to-transparent pointer-events-none z-1" />

        {/* Content & Active Slide Controls */}
        <div className="relative z-10 w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-12">
          {/* Constant Title & Subtitle */}
          <div className="max-w-xl text-left space-y-3">
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-[60px] xl:text-[64px] font-normal leading-[108%] tracking-wide  text-grey-950">{data.title}</h1>
            <p className="font-body text-xs sm:text-sm lg:text-[16px] font-normal leading-[150%] text-grey-950/90 max-w-lg">{data.subtitle}</p>
          </div>

          {/* Interactive Slide Thumbnails with GPU Smooth Progress Overlay */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 overflow-x-auto pb-2 lg:pb-0 scrollbar-none w-full lg:w-auto">
            {data.slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className="group/thumb relative w-24 h-16 sm:w-36 sm:h-24 lg:w-53.75 lg:h-32 rounded-lg overflow-hidden transition-all duration-300 shrink-0 cursor-pointer shadow-sm"
                  aria-label={`Select slide ${idx + 1}`}
                >
                  <Image src={slide.image} alt={slide.alt} fill sizes="(max-width: 640px) 96px, (max-width: 1024px) 144px, 176px" className="object-cover" />
                  {/* Active Slide Dynamic Progress Overlay (0 to 100%) */}
                  {isActive && (
                    <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
                      <div
                        key={`${currentIndex}-${isPaused}`}
                        className="h-full border-r-2 border-primary-950"
                        style={{
                          backgroundColor: "rgba(98, 16, 58, 0.45)",
                          mixBlendMode: "multiply",
                          animationName: "bannerProgressFill",
                          animationDuration: `${autoPlayInterval}ms`,
                          animationTimingFunction: "linear",
                          animationFillMode: "forwards",
                          animationPlayState: isPaused ? "paused" : "running",
                        }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
