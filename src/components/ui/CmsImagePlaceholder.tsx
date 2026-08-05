"use client";

import React from "react";
import { ImageOff, AlertCircle } from "lucide-react";

interface CmsImagePlaceholderProps {
  label?: string;
  className?: string;
  aspectRatio?: string;
}

export function CmsImagePlaceholder({
  label = "CMS Image Not Uploaded",
  className = "",
  aspectRatio = "aspect-16/9",
}: CmsImagePlaceholderProps) {
  return (
    <div
      className={`w-full ${aspectRatio} relative flex flex-col items-center justify-center gap-2 p-4 bg-secondary-100/60 border-2 border-dashed border-secondary-300 rounded-xl text-grey-600 select-none ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-secondary-200/80 flex items-center justify-center text-secondary-700">
        <ImageOff className="w-5 h-5" />
      </div>
      <div className="text-center">
        <p className="font-heading text-xs font-semibold text-grey-800 flex items-center justify-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
          <span>{label}</span>
        </p>
        <p className="font-body text-[11px] text-grey-500 mt-0.5">
          Upload media in Strapi CMS Content Manager
        </p>
      </div>
    </div>
  );
}

export default CmsImagePlaceholder;
