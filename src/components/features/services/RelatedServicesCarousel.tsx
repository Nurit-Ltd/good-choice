"use client";

import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { ServiceItem } from "@/types/service";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface RelatedServicesCarouselProps {
  services: ServiceItem[];
  currentSlug: string;
}

export function RelatedServicesCarousel({ services, currentSlug }: RelatedServicesCarouselProps) {
  const otherServices = services.filter((s) => s.slug !== currentSlug).slice(0, 3);

  if (otherServices.length === 0) return null;

  return (
    <section className="w-full py-12 border-t border-secondary-200/80">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }}>
              Explore Complementary Offerings
            </span>
            <h3 className="font-heading text-2xl font-bold text-grey-950">Related Craftsmanship Services</h3>
          </div>
          <Link href="/services" className="inline-flex items-center gap-1 font-body text-xs font-bold text-primary-950 hover:underline" style={{ color: "var(--color-primary-950, #62103A)" }}>
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3-Column Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherServices.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-secondary-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <ImageWithFallback src={service.featureImage} alt={service.title} fill fallbackType="banner" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white bg-black/40 backdrop-blur-md">{service.category}</span>
              </div>

              <div className="p-5 space-y-2">
                <h4 className="font-heading text-lg font-bold text-grey-950 group-hover:text-primary-950 transition-colors line-clamp-1">{service.title}</h4>
                <p className="font-body text-xs text-grey-600 line-clamp-2">{service.shortDescription}</p>
                <div className="pt-2 flex items-center gap-1 text-xs font-bold text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }}>
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
