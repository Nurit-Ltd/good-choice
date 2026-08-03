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
  {
    id: "col-8",
    name: "Nordland",
    image: "/images/home/collections/collection-2.png",
    href: "/products?collection=nordland",
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
  const sectionRef = useRef<HTMLElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animFrameId: number;
    let targetTranslateY = 0;
    let currentTranslateY = 0;

    const handleScroll = () => {
      if (!sectionRef.current || !cardsWrapperRef.current || !cardsContainerRef.current) return;
      if (window.innerWidth < 1024) return; // Desktop sticky scroll trigger only

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const stickyHeight = window.innerHeight;
      const totalScrollableHeight = sectionRect.height - stickyHeight;

      if (totalScrollableHeight <= 0) return;

      // Calculate scroll progress (0 to 1) while sticky
      const scrolled = -sectionRect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollableHeight));

      const wrapperHeight = cardsWrapperRef.current.clientHeight;
      const containerHeight = cardsContainerRef.current.scrollHeight;
      const maxTranslate = Math.max(0, containerHeight - wrapperHeight);

      targetTranslateY = progress * maxTranslate;
    };

    const animate = () => {
      if (window.innerWidth >= 1024 && cardsContainerRef.current) {
        // Smooth Lerp for buttery inertia
        currentTranslateY += (targetTranslateY - currentTranslateY) * 0.08;
        if (Math.abs(targetTranslateY - currentTranslateY) < 0.1) {
          currentTranslateY = targetTranslateY;
        }
        cardsContainerRef.current.style.transform = `translate3d(0, -${currentTranslateY.toFixed(2)}px, 0)`;
      }
      animFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animFrameId);
    };
  }, [collections.length]);

  return (
    <section ref={sectionRef} className={`relative w-full bg-secondary-800 lg:h-[260vh] ${className}`}>
      {/* Sticky Screen Viewport Wrapper */}
      <div className="relative lg:sticky lg:top-0 w-full min-h-160 lg:h-screen flex items-center justify-between overflow-hidden">
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
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(0deg, rgba(103, 82, 69, 0.64) 0%, rgba(103, 82, 69, 0.64) 100%)",
            }}
          />
        </div>

        {/* Main Section Content Wrapper */}
        <div className="relative z-10 w-full h-full flex items-center justify-between py-16 lg:py-0 px-6 sm:px-12 lg:px-16 xl:pl-36 xl:pr-36.25">
          <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-16 xl:gap-24">
            {/* Left Text Frame */}
            <div className="flex flex-col items-start gap-4 sm:gap-6 max-w-2xl shrink-0">
              {/* Subtitle / Tag line */}
              <span
                className="font-body text-lg sm:text-[20px] lg:text-[24px] font-normal leading-[120%] text-grey-50"
                style={{ color: "var(--color-grey-50, #FCFCFC)" }}
              >
                {subtitle}
              </span>

              {/* Main Heading */}
              <h2
                className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[96px] font-normal leading-[110%] tracking-[-0.96px] text-grey-50 whitespace-pre-line"
                style={{ color: "var(--color-grey-50, #FCFCFC)" }}
              >
                {title}
              </h2>

              {/* Desktop CTA Button */}
              <div className="hidden lg:block pt-2">
                <DualPillButton href={buttonHref} variant="light" size="lg" aria-label={buttonText}>
                  {buttonText}
                </DualPillButton>
              </div>
            </div>

            {/* Right Side Carousel Stream (Full Viewport Height Edge-to-Edge on Desktop) */}
            <div
              ref={cardsWrapperRef}
              className="relative w-full max-w-full lg:max-w-90 sm:lg:max-w-100 xl:max-w-105 flex flex-col items-start lg:items-center group/carousel lg:h-screen overflow-hidden shrink-0"
            >
              {/* Scrollable / Animated Container */}
              <div
                ref={cardsContainerRef}
                className="w-full h-auto overflow-x-auto lg:overflow-visible scrollbar-none flex flex-row lg:flex-col gap-6 py-2 lg:pt-24 lg:pb-12 snap-x lg:snap-none snap-mandatory transition-none"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {collections.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="w-[75vw] sm:w-[320px] lg:w-full shrink-0 flex flex-col rounded-2xl xl:rounded-[20px] overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1 snap-start"
                  >
                    {/* Card Image Area (White Background) */}
                    <div className="relative w-full h-55 sm:h-75 xl:h-85 bg-white p-6 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 320px, 400px" className="object-contain img-hover-scale" />
                      </div>
                    </div>

                    {/* Card Bottom Tag */}
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

              {/* Mobile CTA Button Below Slider */}
              <div className="block lg:hidden mt-6 w-full">
                <DualPillButton href={buttonHref} variant="light" size="lg" aria-label={buttonText}>
                  {buttonText}
                </DualPillButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
