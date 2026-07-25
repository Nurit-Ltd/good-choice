"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = "" }: ProductCardProps) {
  const primaryImage = product.images?.[0] || "/images/product/product-1.png";
  const tagText = product.tag || "Made to order";

  return (
    <div className={`group relative flex flex-col mb-12 sm:mb-14 ${className}`}>
      <Link href={`/products/${product.slug}`} className="block relative w-full">
        {/* Main Image Container */}
        <div className="relative w-full aspect-4/3 rounded-lg group-hover:rounded-bl-none overflow-hidden bg-[#F5F2ED] border border-transparent group-hover:border-primary-950 transition-colors duration-300">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Row 1: Action Bar (Category | Discover) - Positioned INSIDE bottom-left of Image */}
          <div className="absolute bottom-0 left-[0.5px] w-[85%] z-20 flex items-stretch border-t border-r border-primary-950 bg-[#FAF8F5] rounded-tr-lg overflow-hidden opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-300 ease-out origin-bottom justify-between">
            <span className="flex-1 p-4 text-base font-medium text-grey-950 bg-[#FAF8F5] flex items-center  border-primary-950 truncate">{product.category}</span>
            <span className="p-4 text-base font-medium text-white flex items-center justify-center transition-colors duration-200" style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}>
              Discover
            </span>
          </div>
        </div>

        {/* Default View Title (Visible when NOT hovered) */}
        <div className="pt-2.5 px-1 transition-opacity duration-200 group-hover:opacity-0">
          <h3 className="font-body text-sm sm:text-base font-medium text-grey-950">{product.name}</h3>
        </div>

        {/* Row 2: Info Box (Positioned Directly Below Image with Generous Spacing) */}
        <div className="absolute -bottom-11.25 left-0 w-[85%] z-30 flex flex-col border-x border-b border-primary-950 bg-[#FAF8F5] rounded-b-lg p-3.5 gap-3.4.5 opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-300 ease-out origin-top">
          <span className="font-body text-base font-medium text-grey-950 truncate">{product.name}</span>

          <div className="flex items-center justify-between pt-0.5">
            {/* Maroon Square Dot on Bottom-Left */}
            <span className="w-1 h-1 shrink-0" style={{ backgroundColor: "var(--color-primary-950, #62103A)" }} />

            {/* Made to Order Text on Bottom-Right */}
            <span className="font-body text-base font-medium" style={{ color: "var(--color-primary-950, #62103A)" }}>
              {tagText}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
