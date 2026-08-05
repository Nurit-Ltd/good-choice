"use client";

import React from "react";
import { PackageOpen } from "lucide-react";
import Link from "next/link";
import { DualPillButton } from "./DualPillButton";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No products found",
  description = "We couldn't find any items matching your current criteria or category filter.",
  actionText = "Browse Catalog",
  actionHref = "/products",
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 my-8 rounded-2xl border border-dashed border-stone-200 dark:border-neutral-800 bg-stone-50/50 dark:bg-neutral-900/30 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-neutral-800 flex items-center justify-center text-stone-400 dark:text-neutral-500 mb-4">
        <PackageOpen size={32} strokeWidth={1.5} />
      </div>

      <h3 className="text-lg font-semibold text-stone-800 dark:text-neutral-200 mb-2">
        {title}
      </h3>

      <p className="text-sm text-stone-500 dark:text-neutral-400 mb-6 leading-relaxed">
        {description}
      </p>

      {actionHref && (
        <DualPillButton href={actionHref} variant="primary" size="sm">
          {actionText}
        </DualPillButton>
      )}
    </div>
  );
};
