"use client";

import { ProductCard } from "@/components/features/products/ProductCard";
import { CustomArrowLeft, CustomArrowRight } from "@/components/shared/svgs";
import { Product } from "@/types/product";
import { useCallback, useEffect, useRef, useState } from "react";

interface RecentlyCraftedProps {
  title?: string;
  products?: Product[];
}

export function RecentlyCrafted({
  title = "Recently Crafted",
  products = [],
}: RecentlyCraftedProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Use up to 12 products for a rich single-row horizontal slider
  const displayProducts = products.length > 0 ? products.slice(0, 12) : [];

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
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar: Section Title & Navigation Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
          <h2
            className="font-heading text-3xl sm:text-4xl lg:text-[48px] font-normal leading-[110%] tracking-tight text-grey-950"
            style={{ color: "var(--color-grey-950, #292929)" }}
          >
            {title}
          </h2>

          {/* Slider Controls (Desktop/Tablet Top Right) */}
          <div className="hidden sm:flex items-center gap-6 lg:gap-8 xl:gap-16 shrink-0">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`inline-flex items-center gap-2 text-sm sm:text-base font-medium transition-colors cursor-pointer ${
                canScrollLeft
                  ? "text-grey-950 hover:text-primary-950"
                  : "text-grey-400 cursor-not-allowed opacity-40"
              }`}
              aria-label="Previous slide"
            >
              <CustomArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`inline-flex items-center gap-2 text-sm sm:text-base font-medium transition-colors cursor-pointer ${
                canScrollRight
                  ? "text-primary-950 hover:text-[#4a0c2c]"
                  : "text-grey-400 cursor-not-allowed opacity-40"
              }`}
              aria-label="Next slide"
            >
              <span>Next</span>
              <CustomArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Single Row Horizontal Carousel Track */}
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 scroll-smooth"
        >
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="shrink-0 w-[82vw] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile Bottom Slider Controls (Centered below slider) */}
        <div className="flex sm:hidden items-center justify-center gap-8 mt-6">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${
              canScrollLeft
                ? "text-grey-950 hover:text-primary-950"
                : "text-grey-400 cursor-not-allowed opacity-40"
            }`}
            aria-label="Previous slide"
          >
            <CustomArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${
              canScrollRight
                ? "text-primary-950 hover:text-[#4a0c2c]"
                : "text-grey-400 cursor-not-allowed opacity-40"
            }`}
            aria-label="Next slide"
          >
            <span>Next</span>
            <CustomArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
