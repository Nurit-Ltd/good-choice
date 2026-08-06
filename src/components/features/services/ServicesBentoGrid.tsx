"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ServiceItem, ServiceCategory } from "@/types/service";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Search, ArrowRight, CheckCircle2, Sparkles, Filter } from "lucide-react";

interface ServicesBentoGridProps {
  services: ServiceItem[];
}

const CATEGORIES: ("All" | ServiceCategory)[] = [
  "All",
  "Bespoke Furniture",
  "Interior Design",
  "Restoration & Repair",
  "Architectural Millwork",
  "Commercial & Office",
];

export function ServicesBentoGrid({ services }: ServicesBentoGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<"All" | ServiceCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        selectedCategory === "All" || service.category === selectedCategory;
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  return (
    <section className="w-full py-12 lg:py-16 space-y-10">
      {/* Category Filter Tabs & Live Search Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-6 border-b border-secondary-200/80">
        {/* Category Pill Buttons - Wrapped cleanly so pills never cut off */}
        <div className="flex items-center flex-wrap gap-2 flex-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-body text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-primary-950 text-white shadow-md scale-102"
                    : "bg-secondary-100/70 text-grey-800 hover:bg-secondary-200/80 hover:text-primary-950"
                }`}
                style={
                  isActive
                    ? { backgroundColor: "var(--color-primary-950, #62103A)", color: "#ffffff" }
                    : {}
                }
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full xl:w-80 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services (e.g. woodworking, 3D)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-secondary-200/90 bg-white/80 font-body text-sm text-grey-950 placeholder:text-grey-500 focus:outline-none focus:border-primary-950 focus:ring-1 focus:ring-primary-950 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-grey-500 hover:text-grey-950 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* No Results Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-16 px-4 bg-secondary-50 rounded-2xl border border-dashed border-secondary-300">
          <Filter className="w-10 h-10 text-grey-400 mx-auto mb-3" />
          <h3 className="font-heading text-xl font-bold text-grey-900 mb-1">
            No matching services found
          </h3>
          <p className="font-body text-sm text-grey-600 mb-5">
            Try resetting your search query or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="px-5 py-2.5 rounded-xl bg-primary-950 text-white font-body text-sm font-semibold hover:bg-primary-900 transition-colors"
            style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* High-End Bento Grid Layout */}
      {filteredServices.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => {
            // Determine Bento Span Pattern: Every 4th card or 1st card gets 2 columns span on large screens
            const isWide = index === 0 || index === 3 || index % 5 === 0;

            return (
              <div
                key={service.id}
                className={`group relative rounded-2xl overflow-hidden bg-white border border-secondary-200/70 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between ${
                  isWide ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                }`}
              >
                {/* Image Container with Hover Scale */}
                <div className={`relative w-full overflow-hidden ${isWide ? "h-64 sm:h-80" : "h-60"}`}>
                  <ImageWithFallback
                    src={service.featureImage}
                    alt={service.title}
                    fill
                    fallbackType="banner"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-primary-950 shadow-md backdrop-blur-md">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      {service.category}
                    </span>

                    {service.pricingStartingFrom && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-primary-950/90 backdrop-blur-md shadow-md">
                        {service.pricingStartingFrom}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <Link href={`/services/${service.slug}`}>
                      <h3 className="font-heading text-xl lg:text-2xl font-bold text-grey-950 group-hover:text-primary-950 transition-colors leading-snug">
                        {service.title}
                      </h3>
                    </Link>
                    <p className="font-body text-sm text-grey-650 leading-relaxed line-clamp-2">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Feature Highlights Bullets for Wide Cards */}
                  {isWide && service.features && service.features.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-secondary-100">
                      {service.features.slice(0, 4).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-body text-grey-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bottom Footer CTA */}
                  <div className="pt-4 border-t border-secondary-100/70 flex items-center justify-between">
                    <span className="font-body text-xs font-medium text-grey-500">
                      {service.processSteps?.length || 4} Workflow Steps
                    </span>

                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 font-body text-xs sm:text-sm font-bold text-primary-950 hover:text-primary-900 transition-colors group/btn"
                      style={{ color: "var(--color-primary-950, #62103A)" }}
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
