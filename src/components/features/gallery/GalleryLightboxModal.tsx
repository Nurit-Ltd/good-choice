"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { GalleryItem } from "@/types/gallery";
import { WhatsappIcon } from "@/components/shared/svgs";
import { X, ChevronLeft, ChevronRight, Sparkles, ArrowRight, Tag } from "lucide-react";

interface GalleryLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  currentIndex: number;
  onIndexChange: (newIndex: number) => void;
  whatsappNumber?: string;
}

export function GalleryLightboxModal({
  isOpen,
  onClose,
  items,
  currentIndex,
  onIndexChange,
  whatsappNumber = "+8801700000000",
}: GalleryLightboxModalProps) {
  const currentItem = items[currentIndex];

  const handleNext = useCallback(() => {
    if (items.length <= 1) return;
    onIndexChange((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onIndexChange]);

  const handlePrev = useCallback(() => {
    if (items.length <= 1) return;
    onIndexChange((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentItem) return null;

  const whatsappInquiryUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello Good Choice Furniture! I saw "${currentItem.title}" in your Craftsmanship Gallery and would like to consult about a custom order.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside to close backdrop */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Top Close & Counter Floating Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-50 pointer-events-none">
        <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 font-mono text-xs border border-white/15">
          {currentIndex + 1} / {items.length}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-black/60 hover:bg-white hover:text-grey-950 text-white flex items-center justify-center transition-all cursor-pointer pointer-events-auto border border-white/20 shadow-lg"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Left Navigation Arrow */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-black/60 hover:bg-white hover:text-grey-950 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg backdrop-blur-sm"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Right Navigation Arrow */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-black/60 hover:bg-white hover:text-grey-950 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg backdrop-blur-sm"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Modal Card Container */}
      <div
        className="relative z-40 max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-secondary-200/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Visual Image Section */}
        <div className="relative flex-1 min-h-75 sm:min-h-105 md:min-h-135 bg-secondary-900/90 flex items-center justify-center overflow-hidden">
          <Image
            src={currentItem.imageUrl}
            alt={currentItem.title}
            fill
            sizes="(max-width: 768px) 100vw, 65vw"
            priority
            className="object-contain p-2"
          />
        </div>

        {/* Info & Action Sidebar */}
        <div className="w-full md:w-85 lg:w-96 p-6 flex flex-col justify-between space-y-6 bg-white overflow-y-auto max-h-[45vh] md:max-h-none border-t md:border-t-0 md:border-l border-secondary-200">
          <div className="space-y-4">
            {/* Category Tag */}
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-950/10 text-primary-950">
                {currentItem.category}
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h3 className="font-heading text-xl lg:text-2xl font-bold text-grey-950 leading-tight">
                {currentItem.title}
              </h3>
              {currentItem.description && (
                <p className="font-body text-xs sm:text-sm text-grey-650 leading-relaxed">
                  {currentItem.description}
                </p>
              )}
            </div>

            {/* Tags */}
            {currentItem.tags && currentItem.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {currentItem.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-grey-600 bg-secondary-100/80 px-2.5 py-0.8 rounded-lg"
                  >
                    <Tag className="w-2.5 h-2.5 text-grey-400" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Direct CTA Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-secondary-100">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-body text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-98"
            >
              <WhatsappIcon className="w-5 h-5 text-white" />
              <span>Inquire on WhatsApp</span>
            </a>

            {currentItem.serviceSlug && (
              <Link
                href={`/services/${currentItem.serviceSlug}`}
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-secondary-100 hover:bg-secondary-200/80 text-grey-900 font-body text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Craftsmanship Service</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary-950" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryLightboxModal;
