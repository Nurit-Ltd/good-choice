"use client";

import { ServiceItem } from "@/types/service";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Sparkles, Calendar, ShieldCheck, ArrowRight, PhoneCall } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

interface ServiceDetailHeroProps {
  service: ServiceItem;
  onOpenQuoteModal: () => void;
}

export function ServiceDetailHero({ service, onOpenQuoteModal }: ServiceDetailHeroProps) {
  return (
    <section className="w-full py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Text & CTA Content */}
        <div className="lg:col-span-6 space-y-6">
          {/* Category Pill Tag */}
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-white shadow-xs"
              style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
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

          {/* Description */}
          <p className="font-body text-base text-grey-700 leading-relaxed">
            {service.description || service.shortDescription}
          </p>

          {/* Key Metrics Quick Badges */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary-100/60 border border-secondary-200/80">
              <div className="w-9 h-9 rounded-lg bg-primary-950/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }} />
              </div>
              <div>
                <p className="font-heading text-xs font-bold text-grey-950">Certified Craftsmanship</p>
                <p className="font-body text-[11px] text-grey-600">5-Year Structural Guarantee</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary-100/60 border border-secondary-200/80">
              <div className="w-9 h-9 rounded-lg bg-primary-950/10 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }} />
              </div>
              <div>
                <p className="font-heading text-xs font-bold text-grey-950">Fast Turnaround</p>
                <p className="font-body text-[11px] text-grey-600">14-21 Working Days</p>
              </div>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="px-6 py-3.5 rounded-xl font-body text-sm font-bold text-white shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
              style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
            >
              <span>Request Custom Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl font-body text-sm font-semibold text-grey-950 bg-secondary-100 hover:bg-secondary-200 border border-secondary-300 transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-700" />
              <span>WhatsApp Inquiry</span>
            </Link>
          </div>
        </div>

        {/* Right Feature Banner Container */}
        <div className="lg:col-span-6 relative">
          <div className="relative w-full h-85 sm:h-105 lg:h-120 rounded-2xl overflow-hidden shadow-2xl border border-secondary-200">
            <ImageWithFallback
              src={service.bannerImage || service.featureImage}
              alt={service.title}
              fill
              fallbackType="banner"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

            {/* Glassmorphic Overlay Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/85 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between">
              <div>
                <p className="font-heading text-sm font-bold text-grey-950">
                  {service.title}
                </p>
                <p className="font-body text-xs text-grey-650">
                  Bespoke design engineered for Good Choice Furniture interiors.
                </p>
              </div>
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-bold text-white bg-primary-950 shrink-0 ml-3" style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}>
                Atelier Quality
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
