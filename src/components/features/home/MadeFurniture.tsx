"use client";

import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { useHomePageData } from "@/hooks/use-home";

export function MadeFurniture() {
  const { data: homeData } = useHomePageData();
  const craft = homeData?.craftsmanship;

  const leftTitle = craft?.leftTitle || "The Art of\nFurniture Making";
  const leftParagraphs = craft?.leftParagraphs || [
    "Every Good Choice Furniture piece begins with a simple belief: exceptional furniture requires exceptional care. Our artisans spend years perfecting their craft, ensuring that each table, chair, and cabinet meets exacting standards.",
    "The result? Furniture that improves with age, grows more beautiful with time, and becomes an integral part of your home's story.",
  ];
  const leftImage = craft?.leftImage ?? "";

  const rightTitle = craft?.rightTitle || "Made with Care for a\nCleaner Future";
  const rightParagraphs = craft?.rightParagraphs || [
    "At Good Choice Furniture, we prioritize eco-friendly materials and ethical production practices in every aspect of our business. Our unwavering commitment to sustainability ensures that every piece of furniture we create is made with responsibility.",
    "We believe that our choices impact the planet, and we strive to make a positive difference through our high-quality designs. By selecting sustainable resources, we deliver products our customers feel proud to own.",
  ];
  const rightImage = craft?.rightImage ?? "";

  return (
    <section className="w-full py-16 sm:py-20 lg:py-28 bg-[#F8F6F4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column: Image Top -> Text Bottom */}
          <div className="flex flex-col gap-8 lg:gap-12">
            {/* Top Image: Art of Furniture */}
            <div className="relative w-full aspect-792/882 min-h-110 sm:min-h-145 lg:min-h-180 xl:min-h-220.5 rounded-lg overflow-hidden group shadow-sm">
              <ImageWithFallback
                src={leftImage}
                alt={leftTitle.replace("\n", " ")}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                fallbackType="banner"
                className="object-cover img-hover-scale"
              />
            </div>

            {/* Bottom Content: The Art of Furniture Making */}
            <div className="flex flex-col gap-4 sm:gap-6">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[64px] font-normal leading-[110%] tracking-[-0.64px] text-grey-950 whitespace-pre-line" style={{ color: "var(--color-grey-950, #292929)" }}>
                {leftTitle}
              </h2>

              <div className="font-body text-sm sm:text-[16px] font-normal leading-[150%] tracking-[0.32px] text-grey-950/85 space-y-4" style={{ color: "var(--color-grey-950, #292929)" }}>
                {leftParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Image Top on Mobile -> Text Top on Desktop */}
          <div className="flex flex-col-reverse lg:flex-col gap-8 lg:gap-12">
            {/* Top Content: Made with Care for a Cleaner Future */}
            <div className="flex flex-col gap-4 sm:gap-6">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[64px] font-normal leading-[110%] tracking-[-0.64px] text-grey-950 whitespace-pre-line" style={{ color: "var(--color-grey-950, #292929)" }}>
                {rightTitle}
              </h2>

              <div className="font-body text-sm sm:text-[16px] font-normal leading-[150%] tracking-[0.32px] text-grey-950/85 space-y-4" style={{ color: "var(--color-grey-950, #292929)" }}>
                {rightParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Bottom Image: Artisan at work */}
            <div className="relative w-full aspect-792/882 min-h-110 sm:min-h-145 lg:min-h-180 xl:min-h-220.5 rounded-lg overflow-hidden group shadow-sm">
              <ImageWithFallback
                src={rightImage}
                alt={rightTitle.replace("\n", " ")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                fallbackType="banner"
                className="object-cover img-hover-scale"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
