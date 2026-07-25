"use client";

import { siteConfig } from "@/config/site";
import { NavItem } from "@/types/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${className}`}>
      <div
        className="flex h-18  items-center justify-between px-4 sm:px-6 py-2.5 rounded-lg bg-secondary-300/16 backdrop-blur-[32px] shadow-xs"
        style={{
          backgroundColor: "rgba(201, 188, 168, 0.16)",
          borderColor: "var(--color-secondary-50, #F8F6F4)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
        }}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center shrink-0 transition-opacity hover:opacity-90">
          <Image src={logoSrc} alt={logoAlt} width={117} height={40} className="w-29.25 h-10 object-contain" priority />
        </Link>

        {/* Desktop Navigation Items */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const hasSubItems = item.hasDropdown || (item.subItems && item.subItems.length > 0);

            if (hasSubItems) {
              return (
                <div key={item.label} className="relative group">
                  <button
                    type="button"
                    className={`flex items-center gap-1.5 font-body text-[16px] font-medium leading-[150%] text-center text-grey-950 transition-colors duration-200 hover:text-primary-950 py-2 cursor-pointer ${
                      isActive ? "text-primary-950 font-semibold" : ""
                    }`}
                    style={{ color: "var(--color-grey-950, #292929)" }}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-4 h-4 text-grey-950 transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50">
                    <div className="w-48 p-2 rounded-xl border border-secondary-100 bg-white shadow-xl flex flex-col gap-1">
                      {item.subItems?.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="px-3 py-2 text-sm font-body font-medium text-grey-950 hover:text-primary-950 hover:bg-secondary-50 rounded-lg transition-colors text-left"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`font-body text-[16px] font-medium leading-[150%] text-center text-grey-950 transition-colors duration-200 hover:text-primary-950 py-2 px-4 ${
                  isActive ? "text-primary-950 font-medium" : ""
                }`}
                style={{ color: "var(--color-grey-950, #292929)" }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button - WhatsApp Dual Pill */}
        <div className="hidden md:flex items-center">
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Contact us on WhatsApp"
          >
            {/* Left Pill with Text */}
            <span
              className="px-4 py-2 rounded-full font-body font-medium text-[16px] leading-[150%] text-white bg-primary-950 transition-colors duration-200 group-hover:bg-primary-900 shadow-xs"
              style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
            >
              WhatsApp
            </span>

            {/* Right Circle with Arrow */}
            <span
              className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-white bg-primary-950 transition-colors duration-200 group-hover:bg-primary-900 shrink-0 shadow-xs"
              style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
            >
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-lg text-grey-950 hover:bg-secondary-50 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-xl border border-secondary-100 bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const hasSubItems = item.hasDropdown || (item.subItems && item.subItems.length > 0);

              if (hasSubItems) {
                const isExpanded = openDropdown === item.label;
                return (
                  <div key={item.label} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center justify-between w-full py-2.5 px-3 rounded-lg font-body text-[16px] font-medium text-grey-950 hover:bg-secondary-50 text-left"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                    </button>

                    {isExpanded && (
                      <div className="ml-4 pl-3 border-l-2 border-secondary-100 flex flex-col gap-1 my-1">
                        {item.subItems?.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-2 px-3 text-sm font-body font-medium text-grey-700 hover:text-primary-950 hover:bg-secondary-50 rounded-lg"
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
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg font-body text-[16px] font-medium text-grey-950 hover:bg-secondary-50 text-left"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-secondary-100 flex justify-center">
            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="group flex items-center gap-1.5">
              <span className="px-5 py-2.5 rounded-full font-body font-medium text-[16px] text-white bg-primary-950" style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}>
                WhatsApp
              </span>
              <span className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-white bg-primary-950 shrink-0" style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}>
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
