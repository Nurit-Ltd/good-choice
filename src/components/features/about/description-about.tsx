export function DescriptionAbout() {
  const stats = [
    {
      value: "15+",
      label: "Years",
    },
    {
      value: "500+",
      label: "Projects",
    },
    {
      value: "100%",
      label: "Premium Materials",
    },
    {
      value: "1000+",
      label: "Satisfied Clients",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 lg:py-32 bg-[#F8F6F4]">
      <div className="container">
        {/* Centered Single-Column Container */}
        <div className="flex flex-col items-start text-left">
          {/* Main Prominent Paragraph */}
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-[48px] font-normal leading-[130%] tracking-tight text-grey-950 mb-8 sm:mb-10" style={{ color: "var(--color-grey-950, #292929)" }}>
            Celebrating timeless craftsmanship, we create luxury furniture thoughtfully designed to elevate every home, blending elegance, comfort, and lasting quality for refined living and
            extraordinary lifestyle experiences.
          </h2>

          {/* Secondary Text Paragraph */}
          <p
            className="font-body text-xs sm:text-sm lg:text-[15px] font-normal leading-[160%] tracking-[0.2px] text-grey-950/80 max-w-195 mb-16 sm:mb-20 lg:mb-24"
            style={{ color: "var(--color-grey-950, #292929)" }}
          >
            From our humble beginnings, we have dedicated ourselves to creating furniture and interiors that embody elegance, quality, and sophistication. Every piece is thoughtfully designed,
            combining artisanal craftsmanship, premium materials, and timeless aesthetics.
          </p>

          {/* Statistics Section: 4-Column Horizontal Grid */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pt-8 sm:pt-12 border-t border-grey-200/60">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-start">
                <span className="font-heading text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] font-normal leading-none mb-2" style={{ color: "var(--color-primary-800, #93215C)" }}>
                  {stat.value}
                </span>
                <span className="font-body text-sm sm:text-base font-medium leading-[150%] text-grey-950" style={{ color: "var(--color-grey-950, #292929)" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DescriptionAbout;
