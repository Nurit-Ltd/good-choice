"use client";

import { useAboutPage } from "@/hooks/use-about-page";

export function ApproachLuxury() {
  const { data: aboutData } = useAboutPage();

  const title = aboutData?.approachTitle || "A Dedicated Approach to Excellence";
  const luxuryFeatures = (aboutData?.approachItems && aboutData.approachItems.length > 0)
    ? aboutData.approachItems
    : [
        {
          title: "Enduring Artistry",
          description:
            "Honoring traditional styles while embracing modern comfort, our custom craftsmanship delivers beautiful furniture that stays in your family for years",
        },
        {
          title: "Premium Materials",
          description:
            "We source strong, high-quality materials to ensure every sofa, wardrobe, and Majlis stands up to daily family life while looking beautiful",
        },
        {
          title: "Meticulous Precision",
          description:
            "Our sharp attention to detail ensures flawless woodwork, clean finishes, and custom installations that fit your home perfectly",
        },
        {
          title: "Trusted Excellence",
          description:
            "Our name is built on honesty and reliable service, delivering the high quality that Qatari families confidently recommend to one another",
        },
      ];

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20">
      <div className="container">
        {/* Section Heading */}
        <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mb-8 sm:mb-10 lg:mb-14">
          <h2
            className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] font-normal leading-[112%] tracking-[-0.02em] text-grey-950 text-balance whitespace-pre-line"
            style={{ color: "var(--color-grey-950, #292929)" }}
          >
            {title}
          </h2>
        </div>

        {/* 4-Column Horizontal Grid with Vertical Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {luxuryFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col justify-start py-4 lg:py-6 px-0 md:px-6 xl:px-8 border-b md:border-b-0 lg:border-r border-primary-950/40 last:border-r-0 first:pl-0 last:pr-0"
            >
              {/* Feature Title */}
              <h3
                className="font-heading text-2xl lg:text-[28px] xl:text-[32px] font-normal leading-[130%] text-primary-950 mb-3 sm:mb-4"
                style={{ color: "var(--color-primary-950, #62103A)" }}
              >
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p
                className="font-body text-sm sm:text-[15px] xl:text-[16px] font-normal leading-[150%] tracking-[0.2px] text-grey-950 max-w-84 whitespace-pre-line"
                style={{ color: "var(--color-grey-950, #292929)" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ApproachLuxury;
