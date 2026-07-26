"use client";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@/components/shared/svgs";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { FooterLink } from "./FooterLink";

interface QuickLink {
  label: string;
  href: string;
}

const QUICK_LINKS: QuickLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy & Policy", href: "/privacy-policy" },
  { label: "Terms & Condition", href: "/terms" },
];

export function FooterBottomBar() {
  return (
    <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-6 border-t border-grey-950/10">
      {/* Left Area: Quick Links & Location Address */}
      <div className="flex flex-col items-start gap-4">
        {/* Quick Links Row */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          {QUICK_LINKS.map((link) => (
            <FooterLink key={link.label} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </div>

        {/* Location Address with External Arrow Badge */}
        <a
          href="https://maps.google.com/?q=Muaither+Umm+Al+Dome+St+Doha+Qatar"
          target="_blank"
          rel="noopener noreferrer"
          className="inline font-body text-xs sm:text-sm font-normal text-grey-950/80 hover:text-primary-950 transition-colors duration-200 group leading-relaxed"
        >
          <span>C.R. No:82686, Muaither, Umm Al Dome St, Doha, Qatar, Ar Rayyan</span>
          <span className="inline-flex align-middle ml-1.5 items-center justify-center w-5 h-5 rounded-sm bg-primary-950 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </a>
      </div>

      {/* Right Area: Social Icons */}
      <div className="flex items-center gap-4 text-primary-950 shrink-0">
        <a
          href="https://wa.me/974123456789"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="p-1.5 rounded-full hover:bg-primary-950/10 text-primary-950 transition-colors duration-200"
        >
          <WhatsappIcon className="w-6 h-6 sm:w-7 sm:h-7" />
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="p-1.5 rounded-full hover:bg-primary-950/10 text-primary-950 transition-colors duration-200"
        >
          <LinkedinIcon className="w-6 h-6 sm:w-7 sm:h-7" />
        </a>

        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="p-1.5 rounded-full hover:bg-primary-950/10 text-primary-950 transition-colors duration-200"
        >
          <FacebookIcon className="w-6 h-6 sm:w-7 sm:h-7" />
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="p-1.5 rounded-full hover:bg-primary-950/10 text-primary-950 transition-colors duration-200"
        >
          <InstagramIcon className="w-6 h-6 sm:w-7 sm:h-7" />
        </a>
      </div>
    </div>
  );
}
