"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ServiceItem, ServiceCategory } from "@/types/service";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Search, ArrowRight, Sparkles, Filter } from "lucide-react";

interface ServicesCardGridProps {
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

export function ServicesCardGrid({ services }: ServicesCardGridProps) {
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
    <section className="w-full py-8 sm:py-12 lg:py-14 space-y-8 sm:space-y-10">
      {/* Two-Tier Studio Filter Header */}
      <div className="space-y-4 pb-6 border-b border-secondary-200/80">
        {/* Tier 1: Category Title & Count on Left + Search Box on Right */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-heading text-base sm:text-lg lg:text-xl font-bold text-grey-950">
              {selectedCategory === "All" ? "All Craftsmanship Offerings" : selectedCategory}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondary-200/80 text-grey-750">
              {filteredServices.length} {filteredServices.length === 1 ? "Service" : "Services"}
            </span>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full sm:w-72 md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g. woodworking, 3D)..."
              className="w-full pl-10 pr-12 py-2 rounded-xl border border-secondary-200/90 bg-white font-body text-xs sm:text-sm text-grey-950 placeholder:text-grey-500 focus:outline-none focus:border-primary-950 focus:ring-1 focus:ring-primary-950 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-grey-500 hover:text-grey-950 cursor-pointer font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Tier 2: Single-Line Horizontal Scroll Category Pills (No Wrap, No Orphans) */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 overscroll-x-contain">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const count =
              cat === "All"
                ? services.length
                : services.filter((s) => s.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 rounded-full font-body text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? "bg-primary-950 text-white shadow-md scale-102"
                    : "bg-secondary-100/80 text-grey-800 hover:bg-secondary-200/90 hover:text-primary-950"
                }`}
                style={
                  isActive
                    ? { backgroundColor: "var(--color-primary-950, #62103A)", color: "#ffffff" }
                    : {}
                }
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-secondary-200/80 text-grey-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* No Results Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-16 px-4 bg-secondary-50/80 rounded-2xl border border-dashed border-secondary-300">
          <Filter className="w-10 h-10 text-grey-400 mx-auto mb-3" />
          <h3 className="font-heading text-xl font-bold text-grey-900 mb-1">
            No matching services found
          </h3>
          <p className="font-body text-sm text-grey-600 mb-5 max-w-md mx-auto">
            Try resetting your search query or selecting a different craftsmanship category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="px-5 py-2.5 rounded-xl bg-primary-950 text-white font-body text-sm font-semibold hover:bg-primary-900 transition-colors cursor-pointer shadow-md"
            style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Uniform Luxury Studio Card Grid */}
      {filteredServices.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service, index) => {
            const serialNumber = String(index + 1).padStart(2, "0");

            return (
              <div
                key={service.id}
                className="group relative rounded-2xl overflow-hidden bg-white border border-secondary-200/80 shadow-xs hover:shadow-xl hover:border-primary-900/30 transition-all duration-300 flex flex-col justify-between h-full"
              >
                {/* Image Container with Locked 16:10 Aspect Ratio & Overlays */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-secondary-100">
                  <ImageWithFallback
                    src={service.featureImage}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    fallbackType="banner"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-primary-950 shadow-sm backdrop-blur-md">
                      <span className="truncate max-w-[130px]">{service.category}</span>
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-black/40 text-white/90 backdrop-blur-md border border-white/20">
                      {serialNumber}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <Link href={`/services/${service.slug}`} className="block">
                      <h3
                        className="font-heading text-lg sm:text-xl font-bold text-grey-950 group-hover:text-primary-950 transition-colors line-clamp-1 break-words"
                        title={service.title}
                      >
                        {service.title}
                      </h3>
                    </Link>
                    <p
                      className="font-body text-xs sm:text-sm text-grey-600 leading-relaxed line-clamp-2 break-words"
                      title={service.shortDescription}
                    >
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Bottom Footer CTA (Divider + Left-Aligned Explore Link) */}
                  <div className="pt-4 border-t border-secondary-100/80 flex items-center justify-start">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 font-body text-xs sm:text-sm font-bold text-primary-950 hover:text-primary-800 transition-colors group/link"
                      style={{ color: "var(--color-primary-950, #62103A)" }}
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
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

export default ServicesCardGrid;
