"use client";

import { useAboutPage } from "@/hooks/use-about-page";
import Image from "next/image";

interface MarqueeItem {
  id: string;
  src: string;
  alt: string;
}

const DEFAULT_COLUMN_1_IMAGES: MarqueeItem[] = [
  { id: "c1-1", src: "/images/about/hero/ah-1.jpg", alt: "Luxury sofa and table interior design" },
  { id: "c1-2", src: "/images/about/hero/ah-3.png", alt: "Elevated modern living room interior" },
  { id: "c1-3", src: "/images/about/hero/ah-2.jpg", alt: "Lounge seating with accent lighting" },
  { id: "c1-4", src: "/images/about/hero/ah-4.png", alt: "Handcrafted wooden armchair" },
  { id: "c1-5", src: "/images/home/collections/collection-1.png", alt: "Bespoke collection chair" },
  { id: "c1-6", src: "/images/home/furniture-made-process/art-furniture.webp", alt: "Art of furniture making" },
];

const DEFAULT_COLUMN_2_IMAGES: MarqueeItem[] = [
  { id: "c2-1", src: "/images/about/hero/ah-4.png", alt: "Handcrafted wooden armchair furniture" },
  { id: "c2-2", src: "/images/about/hero/ah-2.jpg", alt: "Lounge seating with carpet" },
  { id: "c2-3", src: "/images/about/hero/ah-1.jpg", alt: "Luxury sofa interior design" },
  { id: "c2-4", src: "/images/about/hero/ah-3.png", alt: "Modern luxury living space" },
  { id: "c2-5", src: "/images/home/collections/collection-2.png", alt: "Contemporary living room piece" },
  { id: "c2-6", src: "/images/home/furniture-made-process/made-furniture.webp", alt: "Artisan at work" },
];

export function HeroAbout() {
  const { data: aboutData } = useAboutPage();

  const heroTitle = aboutData?.heroTitle || "Luxury Shaped by Timeless Design";
  const heroSubtitle = aboutData?.heroSubtitle || "Our creations embody refined aesthetics, meticulous craftsmanship, and enduring quality, thoughtfully designed for elevated modern lifestyles.";

  const dynamicImages: MarqueeItem[] =
    aboutData?.heroImages && aboutData.heroImages.length > 0
      ? aboutData.heroImages.map((url, idx) => ({
          id: `cms-img-${idx}`,
          src: url,
          alt: `About gallery image ${idx + 1}`,
        }))
      : [];

  const col1Images = dynamicImages.length > 0 ? dynamicImages.slice(0, Math.ceil(dynamicImages.length / 2)) : DEFAULT_COLUMN_1_IMAGES;
  const col2Images = dynamicImages.length > 0 ? dynamicImages.slice(Math.ceil(dynamicImages.length / 2)) : DEFAULT_COLUMN_2_IMAGES;

  // Duplicate items for 100% seamless infinite loop
  const col1Loop = [...col1Images, ...col1Images];
  const col2Loop = [...col2Images, ...col2Images];

  return (
    <section className="w-full relative overflow-hidden bg-[#F8F6F4] mt-4">
      {/* Dynamic Keyframe Animations for Infinite Marquee */}
      <style>{`
        @keyframes heroMarqueeUp {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }

        @keyframes heroMarqueeDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0%); }
        }

        @keyframes heroMarqueeLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        @keyframes heroMarqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }

        .animate-hero-up {
          animation: heroMarqueeUp 28s linear infinite;
        }

        .animate-hero-down {
          animation: heroMarqueeDown 28s linear infinite;
        }

        .animate-hero-left {
          animation: heroMarqueeLeft 24s linear infinite;
        }

        .animate-hero-right {
          animation: heroMarqueeRight 24s linear infinite;
        }

        .hero-marquee-wrapper:hover .animate-hero-up,
        .hero-marquee-wrapper:hover .animate-hero-down,
        .hero-marquee-wrapper:hover .animate-hero-left,
        .hero-marquee-wrapper:hover .animate-hero-right {
          animation-play-state: paused !important;
        }
      `}</style>

      <div
        className="w-full grid grid-cols-1 lg:grid-cols-2 items-center min-h-125 lg:h-200 overflow-hidden"
        style={{
          background: "linear-gradient(270deg, rgba(215, 206, 190, 0) 0%, var(--color-secondary-200, #D7CEBE) 100%)",
        }}
      >
        {/* Left Column: Text Content */}
        <div className="flex flex-col justify-center px-6 sm:px-12 lg:pl-16 xl:pl-36 py-12 lg:py-20 max-w-250 z-10">
          <h1
            className="font-heading text-4xl sm:text-6xl lg:text-[72px] xl:text-[81px] font-normal leading-[110%] tracking-[-0.81px] text-grey-950 mb-6"
            style={{ color: "var(--color-grey-950, #292929)" }}
          >
            {heroTitle}
          </h1>
          <p className="font-body text-base sm:text-[16px] font-medium leading-[150%] tracking-[0.32px] text-grey-950 max-w-162.5" style={{ color: "var(--color-grey-950, #292929)" }}>
            {heroSubtitle}
          </p>
        </div>

        {/* Right Column: Infinite Counter-Sliding Marquee Grid */}
        <div className="hero-marquee-wrapper relative w-full h-125 sm:h-137.5 lg:h-full overflow-hidden flex items-center justify-center lg:justify-end p-4 lg:p-0">
          {/* DESKTOP VIEW: Vertical Dual Column Counter-Marquee (Column 1 Up, Column 2 Down with 400px Images) */}
          <div className="hidden lg:grid grid-cols-2 gap-5 w-full max-w-170 h-full overflow-hidden">
            {/* Column 1: Moves UPWARDS infinitely */}
            <div className="flex flex-col gap-5 animate-hero-up pointer-events-auto">
              {col1Loop.map((item, idx) => (
                <div key={`col1-${item.id}-${idx}`} className="relative w-full h-100 rounded-lg overflow-hidden shadow-sm group/img bg-secondary-100 shrink-0">
                  <Image src={item.src} alt={item.alt} fill sizes="25vw" className="object-cover img-hover-scale" />
                </div>
              ))}
            </div>

            {/* Column 2: Moves DOWNWARDS infinitely */}
            <div className="flex flex-col gap-5 animate-hero-down pointer-events-auto">
              {col2Loop.map((item, idx) => (
                <div key={`col2-${item.id}-${idx}`} className="relative w-full h-100 rounded-lg lg:rounded-r-none overflow-hidden shadow-sm group/img bg-secondary-100 shrink-0">
                  <Image src={item.src} alt={item.alt} fill sizes="25vw" className="object-cover img-hover-scale" />
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE VIEW: Horizontal Dual Row Counter-Marquee (Row 1 Left, Row 2 Right) */}
          <div className="flex lg:hidden flex-col gap-4 w-full overflow-hidden">
            {/* Row 1: Moves LEFTWARDS infinitely */}
            <div className="flex flex-row gap-4 animate-hero-left w-max">
              {col1Loop.map((item, idx) => (
                <div key={`mob-r1-${item.id}-${idx}`} className="relative w-70 sm:w-85 h-50 sm:h-60 rounded-lg overflow-hidden shadow-sm bg-secondary-100 shrink-0">
                  <Image src={item.src} alt={item.alt} fill sizes="340px" className="object-cover img-hover-scale" />
                </div>
              ))}
            </div>

            {/* Row 2: Moves RIGHTWARDS infinitely */}
            <div className="flex flex-row gap-4 animate-hero-right w-max">
              {col2Loop.map((item, idx) => (
                <div key={`mob-r2-${item.id}-${idx}`} className="relative w-70 sm:w-85 h-50 sm:h-60 rounded-lg overflow-hidden shadow-sm bg-secondary-100 shrink-0">
                  <Image src={item.src} alt={item.alt} fill sizes="340px" className="object-cover img-hover-scale" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroAbout;
