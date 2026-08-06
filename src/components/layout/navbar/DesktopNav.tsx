"use client";

import { NavItem } from "@/types/navigation";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface DesktopNavProps {
  navItems: NavItem[];
  pathname: string;
  hoveredNav: string | null;
  onMouseEnter: (label: string) => void;
  onMouseLeave: () => void;
  onItemClick: () => void;
}

export function DesktopNav({
  navItems,
  pathname,
  hoveredNav,
  onMouseEnter,
  onMouseLeave,
  onItemClick,
}: DesktopNavProps) {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const isHovered = hoveredNav === item.label;
        const hasSubItems = item.hasDropdown || (item.subItems && item.subItems.length > 0);

        return (
          <div
            key={item.label}
            className="relative py-2 flex items-center"
            onMouseEnter={() => onMouseEnter(item.label)}
            onMouseLeave={onMouseLeave}
          >
            {(item.isMegaMenu && item.megaMenu) || item.isServicesMegaMenu ? (
              <Link
                href={item.href}
                onClick={onItemClick}
                className={`flex items-center gap-1.5 font-body text-[16px] leading-[150%] text-grey-950 transition-colors duration-200 hover:text-primary-950 py-1.5 px-3 cursor-pointer ${
                  isActive || isHovered ? "text-primary-950 font-medium" : "font-normal"
                }`}
                style={{ color: "var(--color-grey-950, #292929)" }}
              >
                <span>{item.label}</span>
                <ChevronDown
                  className={`w-4 h-4 text-grey-950 transition-transform duration-300 ${
                    isHovered ? "rotate-180 text-primary-950" : ""
                  }`}
                />
              </Link>
            ) : hasSubItems ? (
              <>
                <button
                  type="button"
                  className={`flex items-center gap-1.5 font-body text-[16px] leading-[150%] text-grey-950 transition-colors duration-200 hover:text-primary-950 py-1.5 px-3 cursor-pointer ${
                    isActive || isHovered ? "text-primary-950 font-medium" : "font-normal"
                  }`}
                  style={{ color: "var(--color-grey-950, #292929)" }}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-grey-950 transition-transform duration-300 ${
                      isHovered ? "rotate-180 text-primary-950" : ""
                    }`}
                  />
                </button>

                {/* Standard Dropdown Menu */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 transition-all duration-200 ease-out z-50 origin-top ${
                    isHovered
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="w-48 p-2 rounded-xl border border-secondary-100 bg-white/95 backdrop-blur-md shadow-xl flex flex-col gap-1">
                    {item.subItems?.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={onItemClick}
                        className="px-3 py-2 text-sm font-body font-normal text-grey-950 hover:text-primary-950 hover:bg-secondary-50 rounded-lg transition-colors text-left"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Link
                href={item.href}
                onClick={onItemClick}
                className={`flex items-center gap-1.5 font-body text-[16px] leading-[150%] text-grey-950 transition-colors duration-200 hover:text-primary-950 py-1.5 px-3 cursor-pointer ${
                  isActive || isHovered ? "text-primary-950 font-medium" : "font-normal"
                }`}
                style={{ color: "var(--color-grey-950, #292929)" }}
              >
                <span>{item.label}</span>
              </Link>
            )}

            {/* Unified 2px Underline Line */}
            <span
              className={`absolute bottom-0 left-3 right-3 h-0.5 transition-all duration-300 ease-out origin-center pointer-events-none ${
                isHovered || isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
              style={{ height: "2px", backgroundColor: "var(--color-primary-950, #62103A)" }}
            />
          </div>
        );
      })}
    </nav>
  );
}
