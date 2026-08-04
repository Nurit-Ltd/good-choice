"use client";

import Image from "next/image";
import { useAboutPage } from "@/hooks/use-about-page";
import { CmsImagePlaceholder } from "@/components/ui/CmsImagePlaceholder";

export function Handcraft() {
  const { data: aboutData } = useAboutPage();

  const title = aboutData?.handcraftTitle || "Handcrafted with Purpose and Precision";
  const subtitle = aboutData?.handcraftSubtitle || "Every joint, curved armrest, and hand-stitched seam reflects our unwavering dedication to uncompromising quality.";

  const img1 = aboutData?.handcraftImage1 || "/images/about/handcraft/handcraft-1.png";
  const img2 = aboutData?.handcraftImage2 || "/images/about/handcraft/handcraft-2.png";
  const defaultImg3 = "/images/about/handcraft/handcraft-3.png";
  const defaultImg4 = "/images/about/handcraft/handcraft-4.png";

  return (
    <section className="w-full py-16 sm:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Heading (Top) + 2 Side-by-Side Images (Bottom) */}
          <div className="flex flex-col gap-8 sm:gap-12">
            <h2
              className="font-heading text-4xl sm:text-6xl lg:text-[72px] xl:text-[81px] font-normal leading-[110%] tracking-[-0.81px] text-grey-950 whitespace-pre-line"
              style={{ color: "var(--color-grey-950, #292929)" }}
            >
              {title}
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="relative w-full aspect-398/500 rounded-lg overflow-hidden shadow-sm bg-secondary-100 group">
                {img1 ? (
                  <Image
                    src={img1}
                    alt="Artisan wood carving detail"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover img-hover-scale"
                  />
                ) : (
                  <CmsImagePlaceholder label="Craft Image 1 Missing" aspectRatio="aspect-398/500" />
                )}
              </div>
              <div className="relative w-full aspect-398/500 rounded-lg overflow-hidden shadow-sm bg-secondary-100 group">
                {img2 ? (
                  <Image
                    src={img2}
                    alt="Handcrafted woodworking precision"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover img-hover-scale"
                  />
                ) : (
                  <CmsImagePlaceholder label="Craft Image 2 Missing" aspectRatio="aspect-398/500" />
                )}
              </div>
            </div>
          </div>

          {/* Right Column: 2 Side-by-Side Images (Top) + Text Paragraphs (Bottom) */}
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="relative w-full aspect-398/500 rounded-lg overflow-hidden shadow-sm bg-secondary-100 group">
                <Image
                  src={defaultImg3}
                  alt="Artisan crafting bespoke furniture"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover img-hover-scale"
                />
              </div>
              <div className="relative w-full aspect-398/500 rounded-lg overflow-hidden shadow-sm bg-secondary-100 group">
                <Image
                  src={defaultImg4}
                  alt="Handcrafted furniture workshop"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover img-hover-scale"
                />
              </div>
            </div>

            {/* Paragraph Description Text */}
            <div
              className="flex flex-col gap-4 font-body text-sm sm:text-[16px] font-normal leading-[150%] tracking-[0.32px] text-grey-950/85 whitespace-pre-line"
              style={{ color: "var(--color-grey-950, #292929)" }}
            >
              <p>{subtitle}</p>
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
