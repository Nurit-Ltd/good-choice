"use client";

import { DesktopNav } from "@/components/layout/navbar/DesktopNav";
import { MegaMenuPanel } from "@/components/layout/navbar/MegaMenuPanel";
import { MobileSheet } from "@/components/layout/navbar/MobileSheet";
import { FloatingWhatsAppButton } from "@/components/shared/FloatingWhatsAppButton";
import { ModernMenuIcon } from "@/components/shared/svgs";
import { DualPillButton } from "@/components/ui/DualPillButton";
import { siteConfig } from "@/config/site";
import { useMegaMenu } from "@/hooks/use-catalog";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { NavItem } from "@/types/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useMemo } from "react";

interface NavbarProps {
  navItems?: NavItem[];
  logoSrc?: string;
  logoAlt?: string;
  whatsappUrl?: string;
  className?: string;
}

export function Navbar({
  navItems: propNavItems,
  logoSrc: propLogoSrc,
  logoAlt: propLogoAlt,
  whatsappUrl: propWhatsappUrl,
  className = "",
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Layer 2 Dynamic Hooks
  const { data: siteSettings } = useSiteSettings();
  const { data: megaMenuData } = useMegaMenu();

  const logoSrc = propLogoSrc || siteSettings?.navbarLogoUrl || "/icons/logo.svg";
  const logoAlt = propLogoAlt || siteSettings?.siteName || "Good Choice Furniture";
  const whatsappUrl = propWhatsappUrl || siteSettings?.whatsappUrl || siteConfig.whatsappUrl || "https://wa.me/8801700000000";

  // Merge Strapi Mega Menu categories and promos dynamically
  const mergedNavItems: NavItem[] = useMemo(() => {
    const baseItems = propNavItems || siteConfig.navLinks;

    if (!megaMenuData || (megaMenuData.categories.length === 0 && megaMenuData.promos.length === 0)) {
      return baseItems;
    }

    return baseItems.map((item) => {
      if (item.isMegaMenu) {
        return {
          ...item,
          megaMenu: {
            categories: megaMenuData.categories.length > 0
              ? megaMenuData.categories
              : item.megaMenu?.categories || [],
            promos: megaMenuData.promos.length > 0
              ? megaMenuData.promos
              : item.megaMenu?.promos || [],
          },
        };
      }
      return item;
    });
  }, [propNavItems, megaMenuData]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredNav(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setHoveredNav(null);
    }, 150);
  };

  const handleItemClick = () => {
    setHoveredNav(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all px-3 pt-2 sm:px-4 sm:pt-4 duration-300 ${className}`}>
      <div
        className="flex h-14 sm:h-18 items-center rounded-lg border justify-between px-3 sm:px-6 py-1.5 sm:py-2.5 bg-secondary-300/16 backdrop-blur-[32px] shadow-xs relative z-50"
        style={{
          backgroundColor: "rgba(201, 188, 168, 0.16)",
          borderColor: "var(--color-secondary-50, #F8F6F4)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
        }}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center shrink-0 transition-opacity hover:opacity-90">
          <Image src={logoSrc} alt={logoAlt} width={117} height={40} className="w-24 sm:w-29.25 h-8 sm:h-10 object-contain" priority />
        </Link>

        {/* Desktop Navigation Items */}
        <DesktopNav navItems={mergedNavItems} pathname={pathname} hoveredNav={hoveredNav} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onItemClick={handleItemClick} />

        {/* Right CTA Button - WhatsApp Dual Pill */}
        <div className="hidden md:flex items-center">
          <DualPillButton href={whatsappUrl} target="_blank" rel="noopener noreferrer" variant="primary" size="md" aria-label="Contact us on WhatsApp">
            WhatsApp
          </DualPillButton>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden group flex items-center justify-center p-1.5 rounded-xl text-grey-950 hover:bg-secondary-200/60 active:bg-secondary-300/80 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none"
          aria-label="Open navigation menu sheet"
        >
          <ModernMenuIcon className="w-9 h-9 text-grey-950 group-hover:scale-105 transition-transform duration-200" />
        </button>
      </div>

      {/* Desktop Dynamic Mega Menu Panel Overlay */}
      <MegaMenuPanel navItems={mergedNavItems} hoveredNav={hoveredNav} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onItemClick={handleItemClick} />

      {/* Mobile Side Sheet Drawer Navigation */}
      <MobileSheet isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} navItems={mergedNavItems} logoSrc={logoSrc} logoAlt={logoAlt} whatsappUrl={whatsappUrl} />

      {/* Mobile Draggable Floating WhatsApp Icon */}
      <FloatingWhatsAppButton whatsappUrl={whatsappUrl} />
    </header>
  );
}
