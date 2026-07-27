import Image from "next/image";

export function Handcraft() {
  return (
    <section className="w-full py-16 sm:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Heading (Top) + 2 Side-by-Side Images (Bottom) */}
          <div className="flex flex-col gap-8 sm:gap-12">
            <h2
              className="font-heading text-4xl sm:text-6xl lg:text-[72px] xl:text-[81px] font-normal leading-[110%] tracking-[-0.81px] text-grey-950"
              style={{ color: "var(--color-grey-950, #292929)" }}
            >
              Handcrafted with <br className="hidden sm:inline" />
              Purpose and Precision
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="relative w-full aspect-398/500 rounded-lg overflow-hidden shadow-sm bg-secondary-100 group">
                <Image
                  src="/images/about/handcraft/handcraft-1.png"
                  alt="Artisan wood carving detail"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="relative w-full aspect-398/500 rounded-lg overflow-hidden shadow-sm bg-secondary-100 group">
                <Image
                  src="/images/about/handcraft/handcraft-2.png"
                  alt="Handcrafted woodworking precision"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Right Column: 2 Side-by-Side Images (Top) + Text Paragraphs (Bottom) */}
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="relative w-full aspect-398/500 rounded-lg overflow-hidden shadow-sm bg-secondary-100 group">
                <Image
                  src="/images/about/handcraft/handcraft-3.png"
                  alt="Artisan crafting bespoke furniture"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="relative w-full aspect-398/500 rounded-lg overflow-hidden shadow-sm bg-secondary-100 group">
                <Image
                  src="/images/about/handcraft/handcraft-4.png"
                  alt="Handcrafted furniture workshop"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            {/* Paragraph Description Text */}
            <div
              className="flex flex-col gap-4 font-body text-sm sm:text-[16px] font-normal leading-[150%] tracking-[0.32px] text-grey-950/85"
              style={{ color: "var(--color-grey-950, #292929)" }}
            >
              <p>
                Every piece we create is guided by purpose, shaped through meticulous craftsmanship and refined attention to detail, where skilled artisans honor tradition while embracing modern techniques to achieve exceptional quality.
              </p>
              <p>
                From material selection to final finishing, precision defines our process, resulting in elegant, durable furniture that elevates living spaces, offers lasting comfort, and reflects an unwavering commitment to timeless sophistication and refined luxury aesthetics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Handcraft;
