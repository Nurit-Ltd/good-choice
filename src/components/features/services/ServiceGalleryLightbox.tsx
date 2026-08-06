"use client";

import { useState } from "react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Camera, X, ZoomIn } from "lucide-react";

interface ServiceGalleryLightboxProps {
  gallery?: string[];
  title: string;
}

export function ServiceGalleryLightbox({ gallery = [], title }: ServiceGalleryLightboxProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="w-full py-10 border-t border-secondary-200/80">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }} />
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-grey-950">
              Completed Project Showcase
            </h3>
          </div>
          <span className="font-body text-xs text-grey-600">
            {gallery.length} High-Res Photography
          </span>
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4  gap-4">
          {gallery.map((imgUrl, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(imgUrl)}
              className="group relative h-60 rounded-2xl overflow-hidden cursor-pointer border border-secondary-200 shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <ImageWithFallback
                src={imgUrl}
                alt={`${title} project sample ${idx + 1}`}
                fill
                fallbackType="product"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-primary-950 shadow-md">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={activeImage}
              alt="Gallery Lightbox Preview"
              fill
              fallbackType="banner"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
