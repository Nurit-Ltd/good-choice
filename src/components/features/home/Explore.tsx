"use client";

import { ProductCard } from "@/components/features/products/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/ProductCardSkeleton";
import { DualPillButton } from "@/components/ui/DualPillButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { useHomePageData } from "@/hooks/use-home";
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
  title: propTitle,
  subtitle: propSubtitle,
  products: propProducts,
  buttonText: propButtonText,
  buttonHref: propButtonHref,
  className = "",
}: ExploreProps) {
  const { data: homeData, isLoading } = useHomePageData();
  const exploreData = homeData?.explore;

  const title = propTitle || exploreData?.title || "";
  const subtitle = propSubtitle || exploreData?.subtitle || "";
  const buttonText = propButtonText || exploreData?.buttonText || "";
  const buttonHref = propButtonHref || exploreData?.buttonHref || "/products";
  const products = propProducts || exploreData?.products || [];

  const displayProducts = Array.isArray(products) ? products.slice(0, 8) : [];

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

        {/* 8 Product Cards Grid (4 Columns x 2 Rows) */}
        {isLoading ? (
          <div className="w-full mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : displayProducts.length > 0 ? (
          <div className="w-full mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState title="No products featured yet" description="Featured products will appear here once added to Strapi." />
        )}

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
