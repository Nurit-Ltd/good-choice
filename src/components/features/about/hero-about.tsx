import Image from "next/image";

export function HeroAbout() {
  return (
    <section className="w-full relative overflow-hidden bg-[#F8F6F4] mt-4">
      <div
        className="w-full grid grid-cols-1 lg:grid-cols-2 items-center min-h-150 lg:min-h-180 xl:h-200 overflow-hidden"
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
            Luxury Shaped by Timeless Design
          </h1>
          <p
            className="font-body text-base sm:text-[16px] font-medium leading-[150%] tracking-[0.32px] text-grey-950 max-w-162.5"
            style={{ color: "var(--color-grey-950, #292929)" }}
          >
            Our creations embody refined aesthetics, meticulous craftsmanship, and enduring quality, thoughtfully designed for elevated modern lifestyles.
          </p>
        </div>

        {/* Right Column: Staggered Overlapping Image Grid Layout */}
        <div className="relative w-full h-full min-h-140 lg:min-h-180 xl:h-200 overflow-hidden flex items-center justify-end p-4 sm:p-6 lg:p-8 pr-0!">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5 w-full max-w-160 my-auto">
            {/* Column 1 (Left Image Column): Bottom Overlap / Cut-off */}
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 -mt-4 lg:-mt-6">
              <div className="relative w-full aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm group bg-secondary-100 shrink-0">
                <Image
                  src="/images/about/hero/ah-1.jpg"
                  alt="Luxury sofa and table interior design"
                  fill
                  priority
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover img-hover-scale"
                />
              </div>
              <div className="relative w-full aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm group bg-secondary-100 shrink-0">
                <Image
                  src="/images/about/hero/ah-3.png"
                  alt="Elevated modern living room interior"
                  fill
                  priority
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover img-hover-scale"
                />
              </div>
              <div className="relative w-full aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm group bg-secondary-100 shrink-0">
                <Image
                  src="/images/about/hero/ah-1.jpg"
                  alt="Luxury sofa interior design repeated bottom overlap"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover img-hover-scale"
                />
              </div>
              <div className="hidden sm:block relative w-full aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm group bg-secondary-100 shrink-0">
                <Image
                  src="/images/about/hero/ah-3.png"
                  alt="Elevated modern living room interior repeated bottom overlap"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover img-hover-scale"
                />
              </div>
            </div>

            {/* Column 2 (Right Image Column): Top Overlap / Cut-off (Shifted Upwards for Zig-Zag) */}
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 -mt-20 sm:-mt-32 md:-mt-40 lg:-mt-44 xl:-mt-48">
              <div className="relative w-full aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm group bg-secondary-100 shrink-0">
                <Image
                  src="/images/about/hero/ah-4.png"
                  alt="Handcrafted wooden armchair furniture peeking top overlap"
                  fill
                  priority
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover img-hover-scale"
                />
              </div>
              <div className="relative w-full aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm group bg-secondary-100 shrink-0">
                <Image
                  src="/images/about/hero/ah-2.jpg"
                  alt="Lounge seating with carpet and accent lighting"
                  fill
                  priority
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover img-hover-scale"
                />
              </div>
              <div className="relative w-full aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm group bg-secondary-100 shrink-0">
                <Image
                  src="/images/about/hero/ah-4.png"
                  alt="Handcrafted wooden armchair furniture set"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover img-hover-scale"
                />
              </div>
              <div className="hidden sm:block relative w-full aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm group bg-secondary-100 shrink-0">
                <Image
                  src="/images/about/hero/ah-2.jpg"
                  alt="Lounge seating repeated bottom overlap"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover img-hover-scale"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroAbout;
