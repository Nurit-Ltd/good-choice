"use client";

import React from "react";
import { FooterLink } from "./FooterLink";

interface ServiceItem {
  label: string;
  href: string;
}

const COLUMN_1_SERVICES: ServiceItem[] = [
  { label: "New Sofa Making", href: "/products?category=Chairs" },
  { label: "Arabic Majlis Making", href: "/products?category=Beds" },
  { label: "Dining Table Making", href: "/products?category=Dining%20Room" },
  { label: "Dressing Mirror Making", href: "/products?category=Home%20Decor" },
];

const COLUMN_2_SERVICES: ServiceItem[] = [
  { label: "Sofa & Chair Upholstery", href: "/products?category=Chairs" },
  { label: "Curtain Installation", href: "/products?category=Home%20Decor" },
  { label: "Bed/Head Box", href: "/products?category=Beds" },
  { label: "Blind Installation", href: "/products?category=Home%20Decor" },
];

const COLUMN_3_SERVICES: ServiceItem[] = [
  { label: "Wallpaper Installation", href: "/products?category=Home%20Decor" },
  { label: "Cabinet/Cupboard Installation", href: "/products?category=Wardrobes" },
  { label: "Barkiya PVC", href: "/products?category=Home%20Decor" },
];

export function FooterNavColumns() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 py-8">
      {/* Column 1 */}
      <div className="flex flex-col items-start gap-3">
        {COLUMN_1_SERVICES.map((item) => (
          <FooterLink key={item.label} href={item.href}>
            {item.label}
          </FooterLink>
        ))}
      </div>

      {/* Column 2 */}
      <div className="flex flex-col items-start gap-3">
        {COLUMN_2_SERVICES.map((item) => (
          <FooterLink key={item.label} href={item.href}>
            {item.label}
          </FooterLink>
        ))}
      </div>

      {/* Column 3 */}
      <div className="flex flex-col items-start gap-3">
        {COLUMN_3_SERVICES.map((item) => (
          <FooterLink key={item.label} href={item.href}>
            {item.label}
          </FooterLink>
        ))}
      </div>
    </div>
  );
}
