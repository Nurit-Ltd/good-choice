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
        <span className="mt-1.5 text-[10px] uppercase tracking-wider font-medium opacity-50">
          Good Choice
        </span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt || "Good Choice Furniture"}
      className={className}
      onError={() => setError(true)}
    />
  );
};
