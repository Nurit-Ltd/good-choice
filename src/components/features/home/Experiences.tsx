"use client";

import { ArabicMajlisIcon, CustomArrowLeft, CustomArrowRight, DiningTableIcon, DressingMirrorIcon, SofaIcon } from "@/components/shared/svgs";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

export interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
}

const DEFAULT_EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-sofa",
    title: "New Sofa Making",
    description: "Luxury sofas crafted with meticulous care, combining elegance, durability, and superior craftsmanship.",
    icon: SofaIcon,
  },
  {
    id: "exp-majlis",
    title: "Arabic Majlis Making",
    description: "Exquisitely handcrafted Arabic Majlis offering luxurious comfort, elegant design, and superior craftsmanship.",
    icon: ArabicMajlisIcon,
  },
  {
    id: "exp-dining",
    title: "Dining Table Making",
    description: "Luxury dining tables designed for sophistication, comfort, and lasting quality.",
    icon: DiningTableIcon,
  },
  {
    id: "exp-mirror",
    title: "Dressing Mirror Making",
    description: "Custom dressing mirrors designed with elegance, style, and premium craftsmanship.",
    icon: DressingMirrorIcon,
  },
];

interface ExperiencesProps {
  title?: string;
  subtitle?: string;
  experiences?: ExperienceItem[];
  className?: string;
}

export function Experiences({
  title = "Crafted Experiences for Your Home",
  subtitle = "Delivering bespoke furniture and interior solutions meticulously designed to elevate every space with elegance, comfort, and timeless craftsmanship.",
  experiences = DEFAULT_EXPERIENCES,
  className = "",
}: ExperiencesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScrollState();
    el.addEventListener("scroll", checkScrollState, { passive: true });
    window.addEventListener("resize", checkScrollState);
    return () => {
      el.removeEventListener("scroll", checkScrollState);
      window.removeEventListener("resize", checkScrollState);
    };
  }, [checkScrollState]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className={`relative w-full overflow-hidden bg-primary-950 py-16 sm:py-24 ${className}`} style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}>
      {/* Background Watermark Logo Overlay (Hidden on Mobile, Visible on Tablet/Desktop) */}
      <div className="hidden sm:block absolute inset-y-0 right-0 pointer-events-none select-none z-0 w-full h-full">
        <Image src="/images/home/Experiences/logo-shadow.png" alt="Good Choice Watermark Shadow" fill className="object-contain object-right" priority />
      </div>

      <div className="relative z-10 container flex flex-col gap-8 lg:gap-10">
        {/* Top Header Row: Title & Subtitle + Slider Controls */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div className="flex flex-col items-start gap-4 max-w-5xl">
            <h2
              className="font-heading text-4xl sm:text-5xl lg:text-[64px] font-normal leading-[110%] tracking-[-0.64px] text-grey-50 whitespace-pre-line"
              style={{ color: "var(--color-grey-50, #FCFCFC)" }}
            >
              {title}
            </h2>
            <p className="font-body text-base font-light leading-[150%] text-grey-50/90 max-w-2xl" style={{ color: "var(--color-grey-50, #FCFCFC)" }}>
              {subtitle}
            </p>
          </div>

          {/* Slider Navigation Arrows (Desktop Top Right) */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-8 xl:gap-16 shrink-0 pt-2 lg:pt-0">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`inline-flex items-center gap-2 text-sm sm:text-base font-medium transition-colors cursor-pointer ${
                canScrollLeft ? "text-grey-50 hover:text-white" : "text-grey-50/40 cursor-not-allowed opacity-40"
              }`}
              aria-label="Previous experiences"
            >
              <CustomArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`inline-flex items-center gap-2 text-sm sm:text-base font-medium transition-colors cursor-pointer ${
                canScrollRight ? "text-grey-50 hover:text-white" : "text-grey-50/40 cursor-not-allowed opacity-40"
              }`}
              aria-label="Next experiences"
            >
              <span>Next</span>
              <CustomArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Experiences Cards Grid / Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="w-full flex lg:grid lg:grid-cols-4 gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible scrollbar-none snap-x snap-mandatory py-2 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {experiences.map((exp) => {
            const IconComponent = exp.icon;
            return (
              <div
                key={exp.id}
                className="group relative overflow-hidden w-full sm:w-85 lg:w-full shrink-0 lg:shrink h-100 p-8 rounded-lg bg-[#701544] flex flex-col items-center justify-between text-center transition-transform duration-300 hover:scale-[1.015] shadow-lg cursor-pointer snap-center"
              >
                {/* Layer 0: Base White Background (hidden in default state to eliminate corner stroke bleed) */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none" />

                {/* Layer 1: Burgundy Background Layer (Sucks into Icon center at 50% 100px on hover over 700ms) */}
                <div className="absolute -inset-0.5 bg-[#701544] pointer-events-none transition-all duration-700 ease-in-out [clip-path:circle(160%_at_50%_100px)] group-hover:[clip-path:circle(0%_at_50%_100px)]" />

                {/* Top Icon Area */}
                <div className="relative z-10 w-24 h-24 flex items-center justify-center text-grey-50 group-hover:text-primary-950 transition-colors duration-700 ease-in-out pt-12">
                  <IconComponent className="w-24 h-24 text-current transition-colors duration-700 ease-in-out" />
                </div>

                {/* Bottom Content Area: Title & Subtitle */}
                <div className="relative z-10 flex flex-col items-center gap-3 pb-2">
                  <h3 className="font-body text-xl sm:text-[24px] font-medium leading-[110%] tracking-[-0.24px] text-grey-50 group-hover:text-primary-950 transition-colors duration-700 ease-in-out">
                    {exp.title}
                  </h3>
                  <p className="font-body text-sm font-light leading-[150%] text-grey-200 group-hover:text-primary-950/80 max-w-70 transition-colors duration-700 ease-in-out">{exp.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Bottom Slider Controls (Centered below slider) */}
        <div className="flex lg:hidden items-center justify-center gap-8 mt-6">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${
              canScrollLeft ? "text-grey-50 hover:text-white" : "text-grey-50/40 cursor-not-allowed opacity-40"
            }`}
            aria-label="Previous experiences"
          >
            <CustomArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${
              canScrollRight ? "text-grey-50 hover:text-white" : "text-grey-50/40 cursor-not-allowed opacity-40"
            }`}
            aria-label="Next experiences"
          >
            <span>Next</span>
            <CustomArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
