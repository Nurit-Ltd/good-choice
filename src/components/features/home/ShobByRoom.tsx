"use client";

import { CustomArrowLeft, CustomArrowRight } from "@/components/shared/svgs";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

interface RoomItem {
  id: string;
  title: string;
  image: string;
  href: string;
}

const ROOM_ITEMS: RoomItem[] = [
  { id: "1", title: "Living Room", image: "/images/home/room/room-1.png", href: "/products?category=Living%20Room" },
  { id: "2", title: "Dining Room", image: "/images/home/room/room-2.png", href: "/products?category=Dining%20Room" },
  { id: "3", title: "Bed Room", image: "/images/home/room/room-3.png", href: "/products?category=Beds" },
  { id: "4", title: "Study Room", image: "/images/home/room/room-4.png", href: "/products?category=Wardrobes" },
  { id: "5", title: "Kitchen & Bar", image: "/images/home/room/room-1.png", href: "/products?category=Dining%20Room" },
  { id: "6", title: "Outdoor Lounge", image: "/images/home/room/room-2.png", href: "/products?category=Outdoor" },
  { id: "7", title: "Master Bedroom", image: "/images/home/room/room-3.png", href: "/products?category=Beds" },
  { id: "8", title: "Home Office", image: "/images/home/room/room-4.png", href: "/products?category=Chairs" },
  { id: "9", title: "Entryway & Hall", image: "/images/home/room/room-1.png", href: "/products?category=Home%20Decor" },
  { id: "10", title: "Luxury Bathroom", image: "/images/home/room/room-2.png", href: "/products?category=Home%20Decor" },
  { id: "11", title: "Guest Room", image: "/images/home/room/room-3.png", href: "/products?category=Beds" },
  { id: "12", title: "Terrace & Balcony", image: "/images/home/room/room-4.png", href: "/products?category=Outdoor" },
];

export function ShopByRoom() {
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
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-12 sm:py-16 lg:py-24">
      <div className="w-full container">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-normal tracking-tight text-grey-950 leading-tight">Shop By Room</h2>
            <p className="font-body text-xs sm:text-sm lg:text-base text-grey-950/80 leading-relaxed max-w-xl">
              Bespoke furniture designed with premium materials, timeless aesthetics, and precision craftsmanship for refined modern interiors.
            </p>
          </div>

          {/* Slider Controls (Desktop/Tablet Top Right) */}
          <div className="hidden sm:flex items-center gap-6 lg:gap-8 xl:gap-16 shrink-0">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`inline-flex items-center gap-2 text-sm sm:text-base font-medium transition-colors cursor-pointer ${
                canScrollLeft ? "text-grey-950 hover:text-primary-950" : "text-grey-400 cursor-not-allowed opacity-40"
              }`}
              aria-label="Previous room"
            >
              <CustomArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`inline-flex items-center gap-2 text-sm sm:text-base font-medium transition-colors cursor-pointer ${
                canScrollRight ? "text-primary-950 hover:text-[#4a0c2c]" : "text-grey-400 cursor-not-allowed opacity-40"
              }`}
              aria-label="Next room"
            >
              <span>Next</span>
              <CustomArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Responsive Cards Slider */}
        <div ref={scrollContainerRef} className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 scroll-smooth">
          {ROOM_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative flex-none w-[80vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] aspect-3/4 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 snap-start block"
            >
              {/* Scalable Image Container with Overflow Hidden */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover img-hover-scale"
                />

                {/* Subtle Top Gradient & Room Title */}
                <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

                <h3 className="absolute top-6 left-6 sm:top-8 sm:left-8 text-xl sm:text-2xl font-medium text-white tracking-wide z-10">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Bottom Slider Controls (Centered below slider) */}
        <div className="flex sm:hidden items-center justify-center gap-8 mt-6">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${
              canScrollLeft ? "text-grey-950 hover:text-primary-950" : "text-grey-400 cursor-not-allowed opacity-40"
            }`}
            aria-label="Previous room"
          >
            <CustomArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${
              canScrollRight ? "text-primary-950 hover:text-[#4a0c2c]" : "text-grey-400 cursor-not-allowed opacity-40"
            }`}
            aria-label="Next room"
          >
            <span>Next</span>
            <CustomArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ShopByRoom;
