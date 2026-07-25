import Image from "next/image";

export function MadeFurniture() {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-28 bg-[#F8F6F4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column: Image Top -> Text Bottom */}
          <div className="flex flex-col gap-8 lg:gap-12">
            {/* Top Image: Art of Furniture */}
            <div className="relative w-full h-95 sm:h-120 lg:h-139.5 rounded-2xl lg:rounded-3xl overflow-hidden group shadow-sm">
              <Image
                src="/images/home/furniture-made-process/art-furniture.webp"
                alt="The Art of Furniture Making craft material"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Bottom Content: The Art of Furniture Making */}
            <div className="flex flex-col gap-4 sm:gap-6">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[64px] font-normal leading-[110%] tracking-[-0.64px] text-grey-950" style={{ color: "var(--color-grey-950, #292929)" }}>
                The Art of <br className="hidden sm:inline" />
                Furniture Making
              </h2>

              <div className="font-body text-sm sm:text-[16px] font-normal leading-[150%] tracking-[0.32px] text-grey-950/85 space-y-4" style={{ color: "var(--color-grey-950, #292929)" }}>
                <p>
                  Every Good Choice Furniture - 1 piece begins with a simple belief: exceptional furniture requires exceptional care. Our artisans spend years perfecting their craft, ensuring that
                  each table, chair, and cabinet meets the exacting standards that have defined Scandinavian design for generations.
                </p>
                <p>The result? Furniture that improves with age, grows more beautiful with time, and becomes an integral part of your home&apos;s story.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Text Top -> Image Bottom */}
          <div className="flex flex-col gap-8 lg:gap-12">
            {/* Top Content: Made with Care for a Cleaner Future */}
            <div className="flex flex-col gap-4 sm:gap-6">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[64px] font-normal leading-[110%] tracking-[-0.64px] text-grey-950" style={{ color: "var(--color-grey-950, #292929)" }}>
                Made with Care for a <br className="hidden sm:inline" />
                Cleaner Future
              </h2>

              <div className="font-body text-sm sm:text-[16px] font-normal leading-[150%] tracking-[0.32px] text-grey-950/85 space-y-4" style={{ color: "var(--color-grey-950, #292929)" }}>
                <p>
                  At Good Choice Furniture - 1, we prioritize eco-friendly materials and ethical production practices in every aspect of our business. Our unwavering commitment to sustainability
                  ensures that every piece of furniture we create is not only beautiful and stylish but also made with a sense of responsibility towards the environment.
                </p>
                <p>
                  We believe that our choices impact the planet, and we strive to make a positive difference through our high-quality designs. By selecting sustainable resources and promoting fair
                  trade, we aim to deliver products that our customers can feel proud to own.
                </p>
              </div>
            </div>

            {/* Bottom Image: Artisan at work */}
            <div className="relative w-full h-95 sm:h-120 lg:h-139.5 rounded-2xl lg:rounded-3xl overflow-hidden group shadow-sm">
              <Image
                src="/images/home/furniture-made-process/made-furniture.webp"
                alt="Artisan making furniture in workshop"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
