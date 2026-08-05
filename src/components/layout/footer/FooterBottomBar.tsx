"use client";

import { FacebookIcon, InstagramIcon, WhatsappIcon } from "@/components/shared/svgs";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { FooterLink } from "./FooterLink";
import { useSiteSettings } from "@/hooks/use-site-settings";

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
  const { data: settings } = useSiteSettings();

  const storeAddress = settings?.storeAddress || settings?.address || "C.R. No:82686, Muaither, Umm Al Dome St, Doha, Qatar, Ar Rayyan";
  const mapsUrl = settings?.storeMapsUrl || "https://maps.google.com/?q=Muaither+Umm+Al+Dome+St+Doha+Qatar";

  const socialLinks = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: settings?.socialLinks?.whatsapp || settings?.whatsappUrl || "https://wa.me/974123456789",
      icon: WhatsappIcon,
    },
    {
      id: "facebook",
      label: "Facebook",
      href: settings?.socialLinks?.facebook || "https://facebook.com",
      icon: FacebookIcon,
    },
    {
      id: "instagram",
      label: "Instagram",
      href: settings?.socialLinks?.instagram || "https://instagram.com",
      icon: InstagramIcon,
    },
  ];

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
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline font-body text-xs sm:text-sm font-normal text-grey-950/80 hover:text-primary-950 transition-colors duration-200 group leading-relaxed"
        >
          <span>{storeAddress}</span>
          <span className="inline-flex align-middle ml-1.5 items-center justify-center w-5 h-5 rounded-sm bg-primary-950 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </a>
      </div>

      {/* Right Area: Social Icons */}
      <div className="flex items-center gap-4 text-primary-950 shrink-0">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="p-1.5 rounded-full hover:bg-primary-950/10 text-primary-950 transition-colors duration-200"
            >
              <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
