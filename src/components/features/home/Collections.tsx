"use client";

import Image from "next/image";
import { DualPillButton } from "@/components/ui/DualPillButton";
import { useEffect, useRef } from "react";

export interface CollectionItem {
  id: string;
  name: string;
  image: string;
  href?: string;
}

const DEFAULT_COLLECTIONS: CollectionItem[] = [
  {
    id: "col-1",
    name: "Alcoroque",
    image: "/images/home/collections/collection-1.png",
    href: "/products?collection=alcoroque-1",
  },
  {
    id: "col-2",
    name: "Alcoroque",
    image: "/images/home/collections/collection-2.png",
    href: "/products?collection=alcoroque-2",
  },
  {
    id: "col-3",
    name: "Alcoroque",
    image: "/images/home/collections/collection-3.png",
    href: "/products?collection=alcoroque-3",
  },
  {
    id: "col-4",
    name: "Gauguin",
    image: "/images/home/collections/collection-1.png",
    href: "/products?collection=gauguin",
  },
  {
    id: "col-5",
    name: "Zola",
    image: "/images/home/collections/collection-2.png",
    href: "/products?collection=zola",
  },
  {
    id: "col-6",
    name: "Bonaparte",
    image: "/images/home/collections/collection-3.png",
    href: "/products?collection=bonaparte",
  },
  {
    id: "col-7",
    name: "Camus",
    image: "/images/home/collections/collection-1.png",
    href: "/products?collection=camus",
  },
];

interface CollectionsProps {
  collections?: CollectionItem[];
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

export function Collections({
  collections = DEFAULT_COLLECTIONS,
  title = "Grand Atelier\nFurniture\nCollection",
  subtitle = "Collections",
  buttonText = "Browse Collections",
  buttonHref = "/products",
  className = "",
}: CollectionsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Set default initial top scroll position (scrolled/overlapped upwards) on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 100;
    }
  }, []);

  return (
    <section className={`relative w-full overflow-hidden bg-secondary-800 ${className}`}>
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home/collections/collection-bg.webp"
          alt="Grand Atelier Furniture Collection background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Figma Overlay: rgba(103, 82, 69, 0.64) (#675245 - 64%) */}
        <div
          className="absolute inset-0 pointer-events-none"
        /*   style={{
            background: "linear-gradient(0deg, rgba(103, 82, 69, 0.64) 0%, rgba(103, 82, 69) 100%)",
          }} */
        />
      </div>

      {/* Main Section Content Wrapper (900px height matching Figma frame 20047) */}
      <div className="relative z-10 w-full min-h-160 lg:h-225 flex items-center justify-between py-16 lg:py-0 px-6 sm:px-12 lg:px-16 xl:pl-36 xl:pr-36.25">
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12 lg:gap-16 xl:gap-24">
          
          {/* Left Text Frame (Frame 20048 in Figma) */}
          <div className="flex flex-col items-start gap-6 max-w-2xl shrink-0">
            {/* Subtitle / Tag line */}
            <span
              className="font-body text-lg sm:text-[20px] lg:text-[24px] font-normal leading-[120%] text-grey-50"
              style={{ color: "var(--color-grey-50, #FCFCFC)" }}
            >
              {subtitle}
            </span>

            {/* Main Heading (96px Legquinne Font) */}
            <h2
              className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[96px] font-normal leading-[110%] tracking-[-0.96px] text-grey-50 whitespace-pre-line"
              style={{ color: "var(--color-grey-50, #FCFCFC)" }}
            >
              {title}
            </h2>

            {/* CTA Button - Dual Pill matching Navbar design language */}
            <div className="pt-2">
              <DualPillButton
                href={buttonHref}
                variant="light"
                size="lg"
                aria-label={buttonText}
              >
                {buttonText}
              </DualPillButton>
            </div>
          </div>

          {/* Right Side Vertical Cards Stream / Carousel */}
          <div
            className="relative w-full max-w-90 sm:max-w-100 xl:max-w-105 flex flex-col items-center group/carousel lg:h-225 self-stretch"
          >
            {/* Vertical Scrollable Container */}
            <div
              ref={scrollRef}
              className="w-full h-130 sm:h-155 lg:h-225 overflow-y-auto scrollbar-none flex flex-col gap-6 py-0 scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {collections.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="w-full shrink-0 flex flex-col rounded-2xl xl:rounded-[20px] overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* Card Image Area (White Background) */}
                  <div className="relative w-full h-65 sm:h-75 xl:h-85 bg-white p-6 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 320px, 400px"
                        className="object-contain transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Card Bottom Tag (Secondary/100 #efece5 Background) */}
                  <div
                    className="w-full py-4 px-6 font-body text-[16px] font-normal leading-[140%] text-secondary-950 text-left"
                    style={{
                      backgroundColor: "var(--color-secondary-100, #efece5)",
                      color: "var(--color-secondary-950, #2c221e)",
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
