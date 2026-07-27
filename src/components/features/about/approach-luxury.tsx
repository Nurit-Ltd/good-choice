export function ApproachLuxury() {
  const luxuryFeatures = [
    {
      title: "Enduring Artistry",
      description:
        "Honoring tradition while embracing modern refinement, our craftsmanship delivers enduring beauty, exceptional comfort, and quality.",
    },
    {
      title: "Premium Materials",
      description:
        "Premium materials thoughtfully sourced to deliver enduring beauty, strength, and sophisticated comfort across every design.",
    },
    {
      title: "Refined Precision",
      description:
        "Precision refined through expertise ensures seamless construction, elegant finishes, and uncompromising attention to detail.",
    },
    {
      title: "Trusted Excellence",
      description:
        "Our reputation is built on trusted excellence, delivering consistent quality, reliability, and refined craftsmanship clients confidently rely on.",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24">
      <div className="container">
        {/* Section Heading */}
        <div className="max-w-204 mb-12 sm:mb-16 lg:mb-20">
          <h2
            className="font-heading text-4xl sm:text-6xl lg:text-[72px] xl:text-[81px] font-normal leading-[110%] tracking-[-0.81px] text-grey-950"
            style={{ color: "var(--color-grey-950, #292929)" }}
          >
            An Uncompromising <br className="hidden sm:inline" />
            Approach to Luxury
          </h2>
        </div>

        {/* 4-Column Horizontal Grid with Vertical Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {luxuryFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col justify-between py-4 lg:py-6 px-0 md:px-6 xl:px-8 border-b md:border-b-0 lg:border-r border-primary-950 last:border-r-0 first:pl-0 last:pr-0"
            >
              {/* Feature Title */}
              <h3
                className="font-heading text-2xl lg:text-[32px] font-normal leading-[130%] text-primary-950 mb-4 sm:mb-6 lg:mb-12"
                style={{ color: "var(--color-primary-950, #62103A)" }}
              >
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p
                className="font-body text-sm sm:text-[16px] font-normal leading-[150%] tracking-[0.32px] text-grey-950 max-w-84"
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
