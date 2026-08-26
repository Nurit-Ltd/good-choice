"use client";

import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { useServices } from "@/hooks/useServices";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import Link from "next/link";

interface ServicesMegaMenuPanelProps {
  hoveredNav: string | null;
  onMouseEnter: (label: string) => void;
  onMouseLeave: () => void;
  onItemClick: () => void;
}

export function ServicesMegaMenuPanel({ hoveredNav, onMouseEnter, onMouseLeave, onItemClick }: ServicesMegaMenuPanelProps) {
  const isHovered = hoveredNav === "Services" || hoveredNav === "Service";
  const { featuredServices, totalCountLabel, totalCount } = useServices();

  // Pick top 3 services for mega menu
  const topThree = featuredServices.slice(0, 3);

  return (
    <div
      onMouseEnter={() => onMouseEnter("Services")}
      onMouseLeave={onMouseLeave}
      className={`hidden md:block absolute top-full left-0 right-0 px-4 z-40 transition-all duration-300 ease-out origin-top transform ${
        isHovered ? "opacity-100 translate-y-0 scale-y-100 pointer-events-auto" : "opacity-0 -translate-y-4 scale-y-95 pointer-events-none"
      }`}
    >
      <div
        className="w-full p-6 lg:p-8 shadow-2xl backdrop-blur-2xl transition-all duration-300 rounded-b-2xl max-w-7xl mx-auto border"
        style={{
          backgroundColor: "#FAF7F2",
          borderColor: "rgba(201, 188, 168, 0.4)",
          boxShadow: "0 25px 50px -12px rgba(44, 34, 30, 0.16)",
        }}
      >
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-secondary-200/60">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }} />
            <h3 className="font-heading text-lg font-bold tracking-wide" style={{ color: "var(--color-primary-950, #62103A)" }}>
              Craftsmanship & Bespoke Services
            </h3>
          </div>
        </div>

        {/* 4-Column Ads-Banner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Top 3 Featured Service Background Image Cards */}
          {topThree.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              onClick={onItemClick}
              className="group relative h-72 rounded-xl overflow-hidden flex flex-col justify-end p-5 transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Full Card Background Image */}
              <ImageWithFallback src={service.featureImage} alt={service.title} fill fallbackType="banner" className="object-cover transition-transform duration-700 ease-out group-hover:scale-108" />

              {/* Dark Gradient Overlay for Maximum Text Contrast */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent transition-opacity group-hover:opacity-95" />

              {/* Category Pill Tag */}
              <div className="relative z-10 mb-auto">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/90 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  {service.category}
                </span>
              </div>

              {/* Title, Short Description, and Learn More CTA */}
              <div className="relative z-10 space-y-2">
                <h4 className="font-heading text-lg font-bold text-white leading-snug drop-shadow-md group-hover:text-secondary-100 transition-colors line-clamp-2">{service.title}</h4>
                <p className="font-body text-xs text-white/80 line-clamp-2 leading-relaxed font-normal">{service.shortDescription}</p>
                <div className="flex items-center gap-1.5 pt-1 text-xs font-semibold text-white group-hover:text-secondary-200 transition-colors">
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}

          {/* 4th Card: "Show All Services" Callout Card */}
          <Link
            href="/services"
            onClick={onItemClick}
            className="group relative h-72 rounded-xl overflow-hidden flex flex-col justify-between p-6 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 border border-primary-900/40"
            style={{
              backgroundColor: "var(--color-primary-950, #62103A)",
              backgroundImage: "radial-gradient(circle at top right, rgba(255,255,255,0.12), transparent 70%)",
            }}
          >
            {/* Top Watermark / Badge Icon */}
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-white/20 border border-white/30 backdrop-blur-md shadow-xs">
                {totalCountLabel || `${totalCount}+`} Services
              </span>
            </div>

            {/* Middle Title & Subtitle */}
            <div className="space-y-2 my-auto">
              <h4 className="font-heading text-xl lg:text-2xl font-bold text-white leading-tight">Explore All Services</h4>
              <p className="font-body text-xs text-white/80 leading-relaxed">Discover bespoke woodworking, 3D interior architecture, fine upholstery, and antique restoration care.</p>
            </div>

            {/* Bottom Button CTA */}
            <div className="pt-2">
              <span className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white text-primary-950 font-body text-xs font-bold shadow-md hover:bg-secondary-100 transition-all duration-300 group-hover:shadow-xl">
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
