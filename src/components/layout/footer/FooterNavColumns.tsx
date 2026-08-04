"use client";

import React from "react";
import { FooterLink } from "./FooterLink";
import { useSiteSettings } from "@/hooks/use-site-settings";

export function FooterNavColumns() {
  const { data: settings } = useSiteSettings();
  const sections = settings?.footerSections || [];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 py-8">
      {sections.slice(0, 3).map((section, idx) => (
        <div key={section.title || `column-${idx}`} className="flex flex-col items-start gap-3">
          {(section.links || []).map((item) => (
            <FooterLink key={item.label} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
        </div>
      ))}
    </div>
  );
}
