"use client";

import { useState } from "react";
import { ServiceItem } from "@/types/service";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Calendar, ShieldCheck, ArrowRight, PhoneCall, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

interface ServiceDetailHeroProps {
  service: ServiceItem;
  onOpenQuoteModal: () => void;
  consultationButtonText?: string;
  whatsappButtonText?: string;
}

export function ServiceDetailHero({
  service,
  onOpenQuoteModal,
  consultationButtonText = "Request Custom Consultation",
  whatsappButtonText = "WhatsApp Inquiry",
}: ServiceDetailHeroProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine intro summary vs detailed text
  const leadSummary = service.shortDescription || service.description || "";
  const fullText = service.description || leadSummary;
  const isLongText = leadSummary.length > 260 || (service.description && service.description !== service.shortDescription);

  // Parse paragraphs cleanly (handles newlines / multi-paragraphs from Strapi)
  const activeContent = isExpanded ? fullText : leadSummary;
  const paragraphs = activeContent
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="w-full py-6 sm:py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Text & CTA Content */}
        <div className="lg:col-span-6 space-y-6">
          {/* Category & Starting Price Tag */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold text-white shadow-xs"
              style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
            >
              {service.category}
            </span>

            {service.pricingStartingFrom && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-grey-800 bg-secondary-200/80 border border-secondary-300">
                {service.pricingStartingFrom}
              </span>
            )}
          </div>

          {/* Service Title */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-grey-950 leading-[115%] tracking-tight">
            {service.title}
          </h1>

          {/* Smart Description with Paragraph Support & Expandable Read More */}
          <div className="space-y-3">
            <div
              className={`font-body text-sm sm:text-base text-grey-700 leading-relaxed space-y-2.5 transition-all duration-300 ${
                !isExpanded && isLongText ? "line-clamp-4" : ""
              }`}
            >
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {isLongText && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-950 hover:underline cursor-pointer pt-1 transition-colors"
                style={{ color: "var(--color-primary-950, #62103A)" }}
              >
                <span>{isExpanded ? "Show Less" : "Read Full Overview"}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {/* Key Metrics Quick Badges */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary-100/60 border border-secondary-200/80">
              <div className="w-9 h-9 rounded-lg bg-primary-950/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }} />
              </div>
              <div>
                <p className="font-heading text-xs font-bold text-grey-950">{service.highlight1Title || "Certified Craftsmanship"}</p>
                <p className="font-body text-xs text-grey-600">{service.highlight1Subtitle || "5-Year Structural Guarantee"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary-100/60 border border-secondary-200/80">
              <div className="w-9 h-9 rounded-lg bg-primary-950/10 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }} />
              </div>
              <div>
                <p className="font-heading text-xs font-bold text-grey-950">{service.highlight2Title || "Fast Turnaround"}</p>
                <p className="font-body text-xs text-grey-600">{service.duration || service.highlight2Subtitle || "14-21 Working Days"}</p>
              </div>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="px-6 py-3.5 rounded-xl font-body text-sm font-bold text-white shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
              style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
            >
              <span>{consultationButtonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl font-body text-sm font-semibold text-grey-950 bg-secondary-100 hover:bg-secondary-200 border border-secondary-300 transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-700" />
              <span>{whatsappButtonText}</span>
            </Link>
          </div>
        </div>

        {/* Right Feature Banner Container (Sticky, Clean & Unobstructed Photo) */}
        <div className="lg:col-span-6 lg:sticky lg:top-24">
          <div className="relative w-full h-96 sm:h-112 lg:h-[540px] xl:h-[560px] rounded-2xl overflow-hidden shadow-xl border border-secondary-200 bg-secondary-100">
            <ImageWithFallback
              src={service.bannerImage || service.featureImage}
              alt={service.title}
              fill
              fallbackType="banner"
              className="object-cover"
              priority
            />
            {/* Subtle natural gradient for depth without blocking the image */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceDetailHero;
