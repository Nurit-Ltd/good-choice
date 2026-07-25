"use client";

import { Check, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface CategorySelectProps {
  currentCategory: string;
}

const CATEGORIES = [
  { value: "all", label: "Category : All Collections" },
  { value: "Chairs", label: "Category : Chairs" },
  { value: "Sofas", label: "Category : Sofas" },
  { value: "Beds", label: "Category : Beds" },
  { value: "Lighting", label: "Category : Lighting" },
  { value: "Outdoor", label: "Category : Outdoor" },
  { value: "Wardrobes", label: "Category : Wardrobes" },
  { value: "Home Decor", label: "Category : Home Decor" },
  { value: "Living Room", label: "Category : Living Room" },
];

export function CategorySelect({ currentCategory }: CategorySelectProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCategoryObj =
    CATEGORIES.find(
      (c) => c.value.toLowerCase() === currentCategory.toLowerCase()
    ) || CATEGORIES[0];

  // Close dropdown menu when clicking outside
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

  const handleSelect = (val: string) => {
    setIsOpen(false);
    router.push(`/products?category=${encodeURIComponent(val)}`);
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      {/* Trigger Button (Shadcn Style Pill Trigger) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center justify-between gap-3 bg-white border border-secondary-200 rounded-full px-5 py-2.5 font-body text-xs font-semibold text-grey-950 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-950/20 hover:border-primary-950/50 transition-all duration-200 min-w-52.5"
        style={{ color: "var(--color-grey-950, #292929)" }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{activeCategoryObj.label}</span>
        <ChevronDown
          className={`w-4 h-4 text-grey-700 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-primary-950" : ""
          }`}
        />
      </button>

      {/* Floating Options Popover Menu (Shadcn UI Dropdown Style) */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-secondary-200 shadow-xl p-1.5 z-50 focus:outline-none animate-in fade-in-0 zoom-in-95 duration-150"
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
    </div>
  );
}
