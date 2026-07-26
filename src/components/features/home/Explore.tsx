"use client";

import { ProductCard } from "@/components/features/products/ProductCard";
import { DualPillButton } from "@/components/ui/DualPillButton";
import { MOCK_PRODUCTS } from "@/services/productService";
import { Product } from "@/types/product";

interface ExploreProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

export function Explore({
  title = "Explore Elevated Living\nEssentials",
  subtitle = "Curated furniture pieces blending refined design, premium materials, and exceptional comfort to elevate everyday living beautifully.",
  products = [],
  buttonText = "Browse All",
  buttonHref = "/products",
  className = "",
}: ExploreProps) {
  // Use passed products or fallback to MOCK_PRODUCTS (up to 8 cards)
  const displayProducts = products && products.length > 0 ? products.slice(0, 8) : MOCK_PRODUCTS.slice(0, 8);

  return (
    <section className={`w-full py-16 lg:py-24 container ${className}`}>
      <div className="flex flex-col items-center">
        {/* Header Title & Subtitle */}
        <div className="flex flex-col items-center text-center gap-4 max-w-198.5 mx-auto">
          <h2
            className="font-heading text-4xl sm:text-5xl lg:text-[64px] font-normal leading-[110%] tracking-[-0.64px] text-grey-950 whitespace-pre-line"
            style={{ color: "var(--color-grey-950, #292929)" }}
          >
            {title}
          </h2>
          <p className="font-body text-base sm:text-lg font-normal leading-[150%] tracking-[0.32px] text-grey-950 max-w-198" style={{ color: "var(--color-grey-950, #292929)" }}>
            {subtitle}
          </p>
        </div>

        {/* 8 Product Cards Grid (4 Columns x 2 Rows) using existing ProductCard */}
        <div className="w-full mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Browse All Dual Pill CTA Button */}
        <div className="mt-8 lg:mt-12 flex justify-center">
          <DualPillButton href={buttonHref} variant="primary" size="md" aria-label={buttonText}>
            {buttonText}
          </DualPillButton>
        </div>
      </div>
    </section>
  );
}
