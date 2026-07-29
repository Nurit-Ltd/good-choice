"use client";

import { Check, ChevronDown, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface CategorySelectProps {
  currentCategory: string;
}

const CATEGORIES = [
  { value: "all", label: "All Collections" },
  { value: "Chairs", label: "Chairs" },
  { value: "Sofas", label: "Sofas" },
  { value: "Beds", label: "Beds" },
  { value: "Lighting", label: "Lighting" },
  { value: "Outdoor", label: "Outdoor" },
  { value: "Wardrobes", label: "Wardrobes" },
  { value: "Home Decor", label: "Home Decor" },
  { value: "Living Room", label: "Living Room" },
];

export function CategorySelect({ currentCategory }: CategorySelectProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCategoryObj =
    CATEGORIES.find(
      (c) => c.value.toLowerCase() === currentCategory.toLowerCase()
    ) || CATEGORIES[0];

  // Close dropdown menu when clicking outside (Desktop)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent background scroll when mobile bottom sheet is open
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSelect = (val: string) => {
    setIsOpen(false);
    router.push(`/products?category=${encodeURIComponent(val)}`);
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left shrink-0">
      {/* Trigger Button (Shadcn Style Pill Trigger) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center justify-between gap-2 sm:gap-3 bg-white border border-secondary-200 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 font-body text-xs font-semibold text-grey-950 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-950/20 hover:border-primary-950/50 transition-all duration-200 max-w-42.5 sm:max-w-none sm:min-w-52.5"
        style={{ color: "var(--color-grey-950, #292929)" }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">Category : {activeCategoryObj.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-grey-700 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-primary-950" : ""
          }`}
        />
      </button>

      {/* Floating Options Popover Menu (Desktop View: hidden on mobile, visible on sm and up) */}
      {isOpen && (
        <div
          className="hidden sm:block absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-secondary-200 shadow-xl p-1.5 z-50 focus:outline-none animate-in fade-in-0 zoom-in-95 duration-150"
          style={{
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
          }}
          role="listbox"
        >
          <div className="space-y-0.5 max-h-64 overflow-y-auto custom-scrollbar">
            {CATEGORIES.map((cat) => {
              const isSelected =
                cat.value.toLowerCase() === currentCategory.toLowerCase();
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => handleSelect(cat.value)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-body text-xs font-medium transition-colors text-left cursor-pointer ${
                    isSelected
                      ? "bg-[#FAF7F2] text-primary-950 font-semibold"
                      : "text-grey-800 hover:bg-secondary-50 hover:text-grey-950"
                  }`}
                  style={{
                    color: isSelected
                      ? "var(--color-primary-950, #62103A)"
                      : undefined,
                  }}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className="truncate">{cat.label}</span>
                  {isSelected && (
                    <Check
                      className="w-3.5 h-3.5 shrink-0 ml-2"
                      style={{ color: "var(--color-primary-950, #62103A)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile Bottom Sheet Overlay & Drawer (Mobile View: visible on < sm) */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Bottom Sheet Modal Container */}
          <div className="relative z-10 w-full bg-white rounded-t-3xl px-5 pt-3 pb-8 border-t border-secondary-200 shadow-2xl animate-in slide-in-from-bottom duration-300 ease-out max-h-[85vh] flex flex-col">
            {/* Top Drag Handle Bar */}
            <div className="w-12 h-1.5 bg-grey-300 rounded-full mx-auto mb-3 shrink-0" />

            {/* Bottom Sheet Header */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-grey-100 shrink-0">
              <h3 className="font-heading text-lg font-semibold text-grey-950">
                Select Category
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-secondary-100 text-grey-700 hover:text-grey-950 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close category select"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Category Options List */}
            <div className="overflow-y-auto space-y-1.5 max-h-[60vh] pr-1">
              {CATEGORIES.map((cat) => {
                const isSelected =
                  cat.value.toLowerCase() === currentCategory.toLowerCase();
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleSelect(cat.value)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-body text-sm font-medium transition-all text-left cursor-pointer ${
                      isSelected
                        ? "bg-[#FAF7F2] text-primary-950 font-semibold border border-primary-950/20 shadow-xs"
                        : "text-grey-800 hover:bg-secondary-50 active:bg-secondary-100"
                    }`}
                    style={{
                      color: isSelected
                        ? "var(--color-primary-950, #62103A)"
                        : undefined,
                    }}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span>{cat.label}</span>
                    {isSelected && (
                      <Check
                        className="w-4 h-4 shrink-0 ml-2"
                        style={{ color: "var(--color-primary-950, #62103A)" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
