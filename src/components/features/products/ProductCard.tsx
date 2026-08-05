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
    <div className={`group relative flex flex-col mb-4 md:mb-14 ${className}`}>
      <Link href={`/products/${product.slug}`} className="block relative w-full">
        {/* Main Image Container */}
        <div className="relative w-full aspect-4/3 rounded-lg group-hover:rounded-bl-none overflow-hidden bg-[#F5F2ED] border border-transparent group-hover:border-primary-950 transition-colors duration-500">
          <Image src={primaryImage} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover img-hover-scale" />

          {/* Row 1: Action Bar (Category | Discover) - Positioned INSIDE bottom-left of Image */}
          <div className="absolute bottom-0 left-[0.5px] w-[85%] z-20 flex items-stretch border-t border-r border-primary-950 bg-[#FAF8F5] rounded-tr-lg overflow-hidden opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 origin-bottom transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] justify-between">
            <span className="flex-1 min-w-0 py-3.5 px-4 text-base font-medium text-grey-950 bg-[#FAF8F5] flex items-center border-primary-950 overflow-hidden" title={product.category}>
              <span className="truncate">{product.category}</span>
            </span>
            <span className="shrink-0 py-3.5 px-4 text-base font-medium text-white flex items-center justify-center transition-colors duration-200" style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}>
              Discover
            </span>
          </div>
        </div>

        {/* Default View Title (Visible when NOT hovered) */}
        <div className="pt-2.5 px-1 transition-opacity duration-200 group-hover:opacity-0">
          <h3 className="font-body text-sm sm:text-base font-medium text-grey-950 line-clamp-1">{product.name}</h3>
        </div>

        {/* Row 2: Info Box (Positioned Directly Below Image with Generous Spacing) */}
        <div className="absolute -bottom-5.25 left-0 w-[85%] z-30 flex flex-col border-x border-b border-primary-950 bg-[#FAF8F5] rounded-b-lg p-3.5 opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 origin-top transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="flex items-center justify-between gap-2 pt-0.5 min-w-0">
            <span className="font-body text-base font-medium text-grey-950 truncate flex-1 min-w-0">{product.name}</span>
            {/* Made to Order Text on Bottom-Right */}
            <span className="font-body text-base font-medium shrink-0 whitespace-nowrap" style={{ color: "var(--color-primary-950, #62103A)" }}>
              {tagText}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
