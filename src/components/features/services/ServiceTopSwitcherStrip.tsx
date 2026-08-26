"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ServiceItem } from "@/types/service";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";

interface ServiceTopSwitcherStripProps {
  services: ServiceItem[];
  currentSlug: string;
}

export function ServiceTopSwitcherStrip({ services, currentSlug }: ServiceTopSwitcherStripProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeCardRef = useRef<HTMLAnchorElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
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
  }, [checkScrollState, services.length]);

  // Auto-scroll the active service into center view on load/route change
  useEffect(() => {
    if (activeCardRef.current && scrollContainerRef.current) {
      activeCardRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentSlug]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.65;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!services || services.length === 0) return null;

  return (
    <section className="w-full bg-secondary-50/70 border-y border-secondary-200/80 py-3 sm:py-3.5 px-2 sm:px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4 mb-2 px-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-grey-800 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }} />
            <span>Explore All Craftsmanship Services ({services.length})</span>
          </div>

          {/* Slider Arrow Controls (Desktop/Tablet) */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                canScrollLeft
                  ? "border-secondary-300 bg-white text-grey-800 hover:border-primary-950 hover:text-primary-950 shadow-2xs"
                  : "border-secondary-200 bg-secondary-100/50 text-grey-400 cursor-not-allowed opacity-50"
              }`}
              aria-label="Previous services"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                canScrollRight
                  ? "border-secondary-300 bg-white text-grey-800 hover:border-primary-950 hover:text-primary-950 shadow-2xs"
                  : "border-secondary-200 bg-secondary-100/50 text-grey-400 cursor-not-allowed opacity-50"
              }`}
              aria-label="Next services"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Micro-Card Strip */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1 snap-x snap-mandatory scroll-smooth overscroll-x-contain"
        >
          {services.map((s) => {
            const isActive = s.slug === currentSlug;

            return (
              <Link
                key={s.id}
                ref={isActive ? activeCardRef : undefined}
                href={`/services/${s.slug}`}
                className={`group flex-none flex items-center gap-3 p-1.5 sm:p-2 pr-3.5 rounded-xl border transition-all duration-200 shrink-0 w-60 sm:w-68 snap-start select-none ${
                  isActive
                    ? "bg-white border-primary-950 ring-2 ring-primary-950/20 shadow-sm"
                    : "bg-white/90 border-secondary-200/80 hover:border-primary-900/40 hover:bg-white hover:shadow-sm"
                }`}
              >
                {/* 52px Thumbnail */}
                <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-lg overflow-hidden shrink-0 bg-secondary-100 border border-secondary-200/60">
                  <ImageWithFallback
                    src={s.featureImage}
                    alt={s.title}
                    fill
                    sizes="56px"
                    fallbackType="banner"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-primary-950/15 pointer-events-none" />
                  )}
                </div>

                {/* Title & Metadata */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  <span className="block text-[10px] font-medium text-grey-500 uppercase tracking-wider truncate">
                    {s.category}
                  </span>
                  <h4
                    className={`font-heading text-xs sm:text-sm font-bold truncate transition-colors ${
                      isActive ? "text-primary-950" : "text-grey-900 group-hover:text-primary-950"
                    }`}
                    title={s.title}
                  >
                    {s.title}
                  </h4>

                  {/* Active / Inactive Status Indicator */}
                  {isActive ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary-950">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-950 animate-pulse" />
                      Currently Viewing
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-grey-500 group-hover:text-primary-950 transition-colors">
                      <span>View Service</span>
                      <ArrowRight className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServiceTopSwitcherStrip;
