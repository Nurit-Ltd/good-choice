"use client";

import Image from "next/image";
import { useAboutPage } from "@/hooks/use-about-page";
import { CmsImagePlaceholder } from "@/components/ui/CmsImagePlaceholder";

export function VisionaryBrand() {
  const { data: aboutData } = useAboutPage();

  const authorName = aboutData?.visionaryAuthorName || "Alexander V. Lindqvist";
  const authorRole = aboutData?.visionaryAuthorRole || "Founder & Principal Craftsman";
  const quote = aboutData?.visionaryQuote || "Driven by a passion for refined living and timeless design, our founder envisioned a brand where craftsmanship meets uncompromising luxury. With years of experience in furniture artistry and interior excellence, the vision was simple — to create pieces that elevate everyday spaces into statements of elegance. Every collection reflects dedication to quality, precision, and authenticity.";
  const photoUrl = aboutData?.visionaryAuthorPhoto || "/images/about/brand/behind-the-rband.png";

  return (
    <section className="w-full py-16 sm:py-24 overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 xl:gap-20">
          {/* Left Visual Column */}
          <div className="relative w-full max-w-85 sm:max-w-137.5 lg:max-w-155 xl:max-w-166.75 h-90 sm:h-123.75 lg:h-148.75 shrink-0 mx-auto lg:mx-0">
            {/* Background Maroon Accent Box */}
            <div
              className="absolute top-0 left-0 w-40 sm:w-52.5 lg:w-63.25 h-75 sm:h-102.5 lg:h-123.5 rounded-lg z-0"
              style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
            />

            {/* Overlapping Founder Photo Card */}
            <div className="absolute top-18.75 sm:top-26.25 lg:top-32 left-16.25 sm:left-23.75 lg:left-28.75 w-68.75 sm:w-112.5 lg:w-127.5 xl:w-138 h-58 sm:h-95 lg:h-108 xl:h-116.75 rounded-xl sm:rounded-lg overflow-hidden shadow-xl bg-white z-10">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={`${authorName} - ${authorRole}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 552px"
                  className="object-cover object-top"
                  priority
                />
              ) : (
                <CmsImagePlaceholder label="Founder Photo Missing in Strapi" aspectRatio="h-full" />
              )}
            </div>
          </div>

          {/* Right Text Column */}
          <div className="flex flex-col items-start justify-start pt-0 sm:pt-4 lg:pt-32 w-full max-w-201 shrink">
            <h2
              className="font-heading text-3xl sm:text-5xl lg:text-[64px] font-normal leading-[110%] tracking-[-0.64px] text-grey-950 mb-6 sm:mb-8"
              style={{ color: "var(--color-grey-950, #292929)" }}
            >
              The Visionary Behind the <br className="hidden sm:inline" />
              Brand
            </h2>

            <p
              className="font-body text-base sm:text-lg lg:text-[20px] font-normal leading-[150%] tracking-[0.4px] text-grey-600 w-full max-w-201 mb-6 whitespace-pre-line"
              style={{ color: "var(--color-grey-600, #656565)" }}
            >
              {quote}
            </p>

            {(authorName || authorRole) && (
              <div className="pt-4 border-t border-grey-200 w-full">
                <p className="font-heading text-lg font-semibold text-primary-950">{authorName}</p>
                <p className="font-body text-xs text-grey-500">{authorRole}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisionaryBrand;
