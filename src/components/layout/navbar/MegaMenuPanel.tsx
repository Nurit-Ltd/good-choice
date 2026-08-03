"use client";

import { NavItem } from "@/types/navigation";
import Image from "next/image";
import Link from "next/link";

interface MegaMenuPanelProps {
  navItems: NavItem[];
  hoveredNav: string | null;
  onMouseEnter: (label: string) => void;
  onMouseLeave: () => void;
  onItemClick: () => void;
}

export function MegaMenuPanel({ navItems, hoveredNav, onMouseEnter, onMouseLeave, onItemClick }: MegaMenuPanelProps) {
  return (
    <>
      {navItems.map((item) => {
        if (!item.isMegaMenu || !item.megaMenu) return null;
        const isHovered = hoveredNav === item.label;

        return (
          <div
            key={`megamenu-panel-${item.label}`}
            onMouseEnter={() => onMouseEnter(item.label)}
            onMouseLeave={onMouseLeave}
            className={`hidden md:block absolute top-full left-0 right-0 px-4 z-40 transition-all duration-300 ease-out origin-top transform ${
              isHovered ? "opacity-100 translate-y-0 scale-y-100 pointer-events-auto" : "opacity-0 -translate-y-4 scale-y-95 pointer-events-none"
            }`}
          >
            <div
              className="w-full p-8 lg:p-10 shadow-2xl backdrop-blur-2xl transition-all duration-300 rounded-b-2xl"
              style={{
                backgroundColor: "#FAF7F2",
                borderColor: "rgba(201, 188, 168, 0.4)",
                boxShadow: "0 25px 50px -12px rgba(44, 34, 30, 0.12)",
              }}
            >
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-8 flex-1">
                  {item.megaMenu.categories.map((cat) => (
                    <div key={cat.title} className="flex flex-col gap-3">
                      <Link
                        href={cat.href || "#"}
                        onClick={onItemClick}
                        className="group relative inline-flex items-center self-start text-lg sm:text-[19px] font-semibold text-primary-950 transition-colors duration-200 pb-0.5"
                        style={{ color: "var(--color-primary-950, #62103A)" }}
                      >
                        <span>{cat.title}</span>
                        <span
                          className="absolute bottom-0 left-0 w-full h-px opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300 ease-out origin-left pointer-events-none"
                          style={{ height: "1px", backgroundColor: "var(--color-primary-950, #62103A)" }}
                        />
                      </Link>
                      <ul className="flex flex-col gap-2">
                        {cat.items.map((sub) => (
                          <li key={sub.label}>
                            <Link
                              href={sub.href}
                              onClick={onItemClick}
                              className="group relative inline-flex items-center font-body text-[15px] font-normal text-grey-700 hover:text-primary-950 transition-colors duration-200 py-0.5"
                            >
                              <span>{sub.label}</span>
                              <span
                                className="absolute bottom-0 left-0 w-full h-px opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300 ease-out origin-left pointer-events-none"
                                style={{ height: "1px", backgroundColor: "var(--color-primary-950, #62103A)" }}
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Promo Cards */}
                {item.megaMenu.promos && item.megaMenu.promos.length > 0 && (
                  <div className="flex gap-4 shrink-0 justify-end self-start">
                    {item.megaMenu.promos.map((promo) => (
                      <Link
                        key={promo.title}
                        href={promo.href}
                        onClick={onItemClick}
                        className="relative w-44 lg:w-52 h-64 lg:h-72 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300"
                      >
                        <Image src={promo.image} alt={promo.title} fill className="object-cover img-hover-scale" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                        <span className="absolute top-5 left-5 font-heading text-xl lg:text-2xl font-bold text-white drop-shadow-md">{promo.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
