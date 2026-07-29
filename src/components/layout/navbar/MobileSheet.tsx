"use client";

import { DualPillButton } from "@/components/ui/DualPillButton";
import { NavItem } from "@/types/navigation";
import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  logoSrc: string;
  logoAlt: string;
  whatsappUrl: string;
}

export function MobileSheet({ isOpen, onClose, navItems, logoSrc, logoAlt, whatsappUrl }: MobileSheetProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // Prevent background scroll when mobile sheet is open
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

  const toggleAccordion = (label: string) => {
    setOpenAccordion((prev) => (prev === label ? null : label));
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Side Sheet Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm bg-[#FAF7F2] shadow-2xl transition-transform duration-300 ease-out md:hidden flex flex-col justify-between border-l border-secondary-200/60 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-secondary-200/60 flex items-center justify-between">
          <Link href="/" onClick={onClose} className="flex items-center">
            <Image src={logoSrc} alt={logoAlt} width={110} height={36} className="w-26 h-9 object-contain" />
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-secondary-200/40 hover:bg-secondary-200/70 flex items-center justify-center text-grey-950 transition-colors cursor-pointer"
            aria-label="Close navigation sheet"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              if (item.isMegaMenu && item.megaMenu) {
                const isExpanded = openAccordion === item.label;

                return (
                  <div key={item.label} className="flex flex-col border-b border-secondary-200/40 pb-2">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.label)}
                      className="flex items-center justify-between w-full py-2.5 px-3 rounded-xl font-body text-[17px] font-medium text-grey-950 hover:bg-secondary-100/50 transition-colors text-left"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 text-grey-600 transition-transform duration-300 ${isExpanded ? "rotate-180 text-primary-950" : ""}`} />
                    </button>

                    {/* Accordion content for Mega Menu categories */}
                    {isExpanded && (
                      <div className="ml-3 pl-3 border-l-2 border-primary-950/30 flex flex-col gap-4 my-2 pt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        {item.megaMenu.categories.map((cat) => (
                          <div key={cat.title} className="flex flex-col gap-1.5">
                            <span className="font-heading text-sm font-semibold tracking-wide text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }}>
                              {cat.title}
                            </span>
                            <div className="flex flex-col gap-1 ml-2">
                              {cat.items.map((sub) => (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  onClick={onClose}
                                  className="py-1.5 px-2 text-xs font-body font-normal text-grey-700 hover:text-primary-950 hover:bg-secondary-100/60 rounded-lg transition-colors"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const hasSubItems = item.hasDropdown || (item.subItems && item.subItems.length > 0);

              if (hasSubItems) {
                const isExpanded = openAccordion === item.label;

                return (
                  <div key={item.label} className="flex flex-col border-b border-secondary-200/40 pb-2">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.label)}
                      className="flex items-center justify-between w-full py-2.5 px-3 rounded-xl font-body text-[17px] font-medium text-grey-950 hover:bg-secondary-100/50 transition-colors text-left"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 text-grey-600 transition-transform duration-300 ${isExpanded ? "rotate-180 text-primary-950" : ""}`} />
                    </button>

                    {isExpanded && (
                      <div className="ml-3 pl-3 border-l-2 border-primary-950/30 flex flex-col gap-1 my-2 pt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        {item.subItems?.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={onClose}
                            className="py-2 px-3 text-sm font-body font-normal text-grey-700 hover:text-primary-950 hover:bg-secondary-100/60 rounded-lg transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="py-2.5 px-3 rounded-xl font-body text-[17px] font-medium text-grey-950 hover:bg-secondary-100/50 transition-colors text-left border-b border-secondary-200/40"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer CTA */}
        <div className="p-5 border-t border-secondary-200/60 bg-[#F5F1EA]/50 flex flex-col items-center gap-3">
          <DualPillButton href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={onClose} variant="primary" size="md" fullWidth>
            WhatsApp Us
          </DualPillButton>
          <span className="text-[12px] font-body text-grey-500 text-center">Good Choice Furniture © 2026</span>
        </div>
      </div>
    </>
  );
}
