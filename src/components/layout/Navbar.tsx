"use client";

import { siteConfig } from "@/config/site";
import { NavItem } from "@/types/navigation";
import { ArrowRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { DesktopNav } from "@/components/layout/navbar/DesktopNav";
import { MegaMenuPanel } from "@/components/layout/navbar/MegaMenuPanel";
import { MobileSheet } from "@/components/layout/navbar/MobileSheet";
import { DualPillButton } from "@/components/ui/DualPillButton";

interface NavbarProps {
  navItems?: NavItem[];
  logoSrc?: string;
  logoAlt?: string;
  whatsappUrl?: string;
  className?: string;
}

export function Navbar({
  navItems = siteConfig.navLinks,
  logoSrc = "/icons/logo.svg",
  logoAlt = "Good Choice Furniture",
  whatsappUrl = siteConfig.whatsappUrl || "https://wa.me/8801700000000",
  className = "",
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
        <DesktopNav
          navItems={navItems}
          pathname={pathname}
          hoveredNav={hoveredNav}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onItemClick={handleItemClick}
        />

        {/* Right CTA Button - WhatsApp Dual Pill */}
        <div className="hidden md:flex items-center">
          <DualPillButton
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="md"
            aria-label="Contact us on WhatsApp"
          >
            WhatsApp
          </DualPillButton>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden flex items-center justify-center p-2 rounded-lg text-grey-950 hover:bg-secondary-50 transition-colors cursor-pointer"
          aria-label="Open navigation menu sheet"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Dynamic Mega Menu Panel Overlay */}
      <MegaMenuPanel
        navItems={navItems}
        hoveredNav={hoveredNav}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onItemClick={handleItemClick}
      />

      {/* Mobile Side Sheet Drawer Navigation */}
      <MobileSheet
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        logoSrc={logoSrc}
        logoAlt={logoAlt}
        whatsappUrl={whatsappUrl}
      />
    </header>
  );
}
