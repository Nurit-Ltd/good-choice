"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Package, Armchair } from "lucide-react";

interface ImageWithFallbackProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  fallbackType?: "product" | "category" | "banner";
  aspectRatio?: string;
  iconSize?: number;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackType = "product",
  aspectRatio = "aspect-square",
  iconSize = 32,
  className = "",
  sizes,
  ...props
}) => {
  const [error, setError] = useState(false);

  const isMissingSrc = !src || src === "/images/placeholder.png" || src.includes("undefined");

  if (isMissingSrc || error) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-linear-to-br from-stone-100 to-stone-200 dark:from-neutral-800 dark:to-neutral-900 text-stone-400 dark:text-neutral-500 rounded-lg overflow-hidden border border-stone-200/50 dark:border-neutral-700/50 transition-colors ${aspectRatio} ${className}`}
        style={{ width: props.width ? `${props.width}px` : "100%", height: props.height ? `${props.height}px` : "100%" }}
      >
        {fallbackType === "product" ? (
          <Armchair className="opacity-60 stroke-[1.5]" size={iconSize} />
        ) : (
          <Package className="opacity-60 stroke-[1.5]" size={iconSize} />
        )}
        <span className="mt-1.5 text-[10px] uppercase tracking-wider font-semibold opacity-60 text-stone-600 dark:text-stone-300">
          No Image (Strapi CMS)
        </span>
      </div>
    );
  }

  // Next.js performance recommendation: provide sizes when fill is used
  const effectiveSizes = sizes || (props.fill ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : undefined);

  return (
    <Image
      {...props}
      src={src}
      alt={alt || "Good Choice Furniture"}
      sizes={effectiveSizes}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default ImageWithFallback;
