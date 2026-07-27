import Image from "next/image";

export function VisionaryBrand() {
  return (
    <section className="w-full py-16 sm:py-24 overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 xl:gap-20">
          {/* Left Visual Column: Maroon Box (253x494) & Founder Photo Card (552x467, Top 128px, Left 115px, Bottom 101px) */}
          <div className="relative w-full max-w-85 sm:max-w-137.5 lg:max-w-155 xl:max-w-166.75 h-90 sm:h-123.75 lg:h-148.75 shrink-0 mx-auto lg:mx-0">
            {/* Background Maroon Accent Box (253px x 494px, rounded-8px) */}
            <div
              className="absolute top-0 left-0 w-40 sm:w-52.5 lg:w-63.25 h-75 sm:h-102.5 lg:h-123.5 rounded-lg z-0"
              style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
            />

            {/* Overlapping Founder Photo Card (552px x 467px, top: 128px, left: 115px, extending 101px below maroon box) */}
            <div className="absolute top-18.75 sm:top-26.25 lg:top-32 left-16.25 sm:left-23.75 lg:left-28.75 w-68.75 sm:w-112.5 lg:w-127.5 xl:w-138 h-58 sm:h-95 lg:h-108 xl:h-116.75 rounded-xl sm:rounded-lg overflow-hidden shadow-xl bg-white z-10">
              <Image
                src="/images/about/brand/behind-the-rband.png"
                alt="The Visionary Behind the Brand - Founder Portrait"
                fill
                sizes="(max-width: 768px) 90vw, 552px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Right Text Column: Wide container (804px) to fit 2-line heading and reduce gap */}
          <div className="flex flex-col items-start justify-start pt-0 sm:pt-4 lg:pt-32 w-full max-w-201 shrink">
            {/* Heading: Legquinne, 64px, line-height 110% (70.4px), letter-spacing -0.64px, Grey-950 */}
            <h2
              className="font-heading text-3xl sm:text-5xl lg:text-[64px] font-normal leading-[110%] tracking-[-0.64px] text-grey-950 mb-6 sm:mb-8"
              style={{ color: "var(--color-grey-950, #292929)" }}
            >
              The Visionary Behind the <br className="hidden sm:inline" />
              Brand
            </h2>

            {/* Paragraph: Gotham, 20px, line-height 150% (30px), letter-spacing 0.4px, Grey-600 */}
            <p
              className="font-body text-base sm:text-lg lg:text-[20px] font-normal leading-[150%] tracking-[0.4px] text-grey-600 w-full max-w-201"
              style={{ color: "var(--color-grey-600, #656565)" }}
            >
              Driven by a passion for refined living and timeless design, our founder envisioned a brand where craftsmanship meets uncompromising luxury. With years of experience in furniture artistry and interior excellence, the vision was simple — to create pieces that elevate everyday spaces into statements of elegance. Every collection reflects dedication to quality, precision, and authenticity. Guided by integrity and innovation, the brand continues to shape sophisticated environments with enduring beauty and purpose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisionaryBrand;
