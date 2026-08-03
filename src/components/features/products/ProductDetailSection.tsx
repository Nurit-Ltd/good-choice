"use client";

import { Product } from "@/types/product";
import { Palette, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductDetailSectionProps {
  product: Product;
}

export function ProductDetailSection({ product }: ProductDetailSectionProps) {
  const images = product.images && product.images.length > 0 ? product.images : ["/images/product/product-1.png"];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start relative">
        
        {/* DESKTOP VIEW LEFT COLUMN: Vertically Stacked Scrolling Image Gallery */}
        <div className="hidden lg:flex flex-col gap-6 w-full">
          {images.map((imgSrc, idx) => (
            <div key={`desktop-img-${idx}`} className="relative w-full aspect-8/5 rounded-lg overflow-hidden shadow-sm bg-white border border-secondary-200/40">
              <Image
                src={imgSrc}
                alt={`${product.name} view ${idx + 1}`}
                fill
                priority={idx === 0}
                sizes="50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* MOBILE VIEW LEFT COLUMN: Interactive Featured Main Image + Thumbnail Carousel */}
        <div className="flex lg:hidden flex-col gap-4 w-full">
          {/* Main Active Image Display */}
          <div className="relative w-full aspect-4/3 sm:aspect-8/5 rounded-xl overflow-hidden shadow-sm bg-white border border-secondary-200/40">
            <Image
              src={images[activeImageIndex]}
              alt={product.name}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-all duration-300"
            />
          </div>

          {/* Horizontal Thumbnail Gallery Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1.5 px-0.5">
              {images.map((imgSrc, idx) => {
                const isActive = activeImageIndex === idx;
                return (
                  <button
                    key={`mob-thumb-${idx}`}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                      isActive ? "border-primary-950 scale-105 shadow-md" : "border-transparent opacity-65 hover:opacity-100"
                    }`}
                    aria-label={`View product image ${idx + 1}`}
                  >
                    <Image src={imgSrc} alt={`${product.name} thumbnail ${idx + 1}`} fill sizes="80px" className="object-cover" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sticky Information & Order CTA Box */}
        <div className="lg:sticky lg:top-28 flex flex-col gap-8">
          {/* Title & Description */}
          <div className="space-y-4">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-normal leading-[110%] tracking-tight text-grey-950" style={{ color: "var(--color-grey-950, #292929)" }}>
              {product.name}
            </h1>

            <p className="font-body text-sm sm:text-base leading-[160%] text-grey-700 max-w-xl" style={{ color: "var(--color-grey-700, #525252)" }}>
              {product.description}
            </p>
          </div>

          {/* Order Now CTA Button */}
          <div>
            <Link
              href={`https://wa.me/8801700000000?text=Hi,%20I%20would%20like%20to%20order%20the%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-3.5 px-8 rounded-full font-body font-medium text-base text-white shadow-md transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] text-center"
              style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
            >
              Order Now
            </Link>
          </div>

          {/* Key Features List */}
          {product.keyFeatures && product.keyFeatures.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-body text-base font-semibold text-grey-950">Key Features</h3>
              <ul className="space-y-2 font-body text-sm text-grey-700">
                {product.keyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-950 mt-2 shrink-0" style={{ backgroundColor: "var(--color-primary-950, #62103A)" }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Spec Boxes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-secondary-100/60 border border-secondary-200/50 flex flex-col gap-2">
              <Palette className="w-5 h-5 text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }} />
              <span className="font-body text-xs font-semibold text-grey-950">Style</span>
              <span className="font-body text-xs text-grey-700">{product.specs?.style || "Modern Contemporary"}</span>
            </div>

            <div className="p-4 rounded-lg bg-secondary-100/60 border border-secondary-200/50 flex flex-col gap-2">
              <Users className="w-5 h-5 text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }} />
              <span className="font-body text-xs font-semibold text-grey-950">Seating Capacity</span>
              <span className="font-body text-xs text-grey-700">{product.specs?.seatingCapacity || "3-4 Seater (per unit)"}</span>
            </div>

            <div className="p-4 rounded-lg bg-secondary-100/60 border border-secondary-200/50 flex flex-col gap-2">
              <Sparkles className="w-5 h-5 text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }} />
              <span className="font-body text-xs font-semibold text-grey-950">Upholstery</span>
              <span className="font-body text-xs text-grey-700">{product.specs?.upholstery || "Premium Fabric"}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
