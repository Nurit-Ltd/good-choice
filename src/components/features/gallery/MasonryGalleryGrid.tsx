"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { GalleryItem, GalleryCategory } from "@/types/gallery";
import { GALLERY_CATEGORIES } from "@/hooks/useGallery";
import { Search, Sparkles, Filter, Maximize2, Tag } from "lucide-react";

interface MasonryGalleryGridProps {
  items: GalleryItem[];
  onOpenLightbox: (index: number) => void;
}

export function MasonryGalleryGrid({ items, onOpenLightbox }: MasonryGalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<"All" | GalleryCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  // Determine aspect ratio class dynamically
  const getAspectRatioClass = (aspectRatio: GalleryItem["aspectRatio"]) => {
    switch (aspectRatio) {
      case "tall":
        return "aspect-[9/14]";
      case "portrait":
        return "aspect-[3/4]";
      case "square":
        return "aspect-square";
      case "landscape":
        return "aspect-[16/10]";
      default:
        return "aspect-[3/4]";
    }
  };

  return (
    <section className="w-full py-8 sm:py-12 lg:py-14 space-y-8 sm:space-y-10">
      {/* Two-Tier Studio Filter Header */}
      <div className="space-y-4 pb-6 border-b border-secondary-200/80">
        {/* Tier 1: Category Title & Count on Left + Search Box on Right */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-heading text-base sm:text-lg lg:text-xl font-bold text-grey-950">
              {selectedCategory === "All" ? "All Craftsmanship Creations" : selectedCategory}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondary-200/80 text-grey-750">
              {filteredItems.length} {filteredItems.length === 1 ? "Item" : "Items"}
            </span>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72 md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, wood, majlis..."
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
          {GALLERY_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const count =
              cat === "All"
                ? items.length
                : items.filter((item) => item.category === cat).length;

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

      {/* Empty Search Results State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16 px-4 bg-secondary-50/80 rounded-2xl border border-dashed border-secondary-300">
          <Filter className="w-10 h-10 text-grey-400 mx-auto mb-3" />
          <h3 className="font-heading text-xl font-bold text-grey-900 mb-1">
            No gallery items found
          </h3>
          <p className="font-body text-sm text-grey-600 mb-5 max-w-md mx-auto">
            Try resetting your search query or choosing another craftsmanship category.
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

      {/* Pure CSS Dynamic Pinterest-Style Masonry Grid */}
      {filteredItems.length > 0 && (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {filteredItems.map((item, index) => {
            const aspectClass = getAspectRatioClass(item.aspectRatio);

            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(index)}
                className="group relative rounded-2xl overflow-hidden bg-secondary-100 border border-secondary-200/70 shadow-xs hover:shadow-2xl transition-all duration-300 break-inside-avoid cursor-pointer transform-gpu"
              >
                {/* Image Container with Dynamic Aspect Ratio */}
                <div className={`relative w-full ${aspectClass} overflow-hidden`}>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/95 text-primary-950 shadow-sm backdrop-blur-md">
                      <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                      <span className="truncate max-w-30">{item.category}</span>
                    </span>
                  </div>

                  {/* Top Right Zoom Trigger Icon */}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md shadow-md hover:bg-primary-950 transition-colors">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Bottom Info Overlay on Hover */}
                  <div className="absolute bottom-0 inset-x-0 p-4 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 space-y-1">
                    <h3 className="font-heading text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1 pt-1">
                        {item.tags.slice(0, 2).map((t, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-0.5 text-[9px] text-white/80 bg-white/15 backdrop-blur-xs px-2 py-0.5 rounded-md"
                          >
                            <Tag className="w-2 h-2 text-white/60" />
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
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

export default MasonryGalleryGrid;
