"use client";

import React from "react";
import { useSiteSettings } from "@/hooks/use-site-settings";

export function FooterCopyright() {
  const { data: settings } = useSiteSettings();
  const currentYear = new Date().getFullYear();

  const copyrightText = settings?.copyrightText || `© ${currentYear} Good Choice Furniture. All rights reserved.`;

  return (
    <div className="w-full pt-8 text-center">
      <p
        className="font-body text-sm font-normal leading-[110%] tracking-[-0.14px] text-grey-950/70"
        style={{ color: "var(--color-grey-950, #292929)" }}
      >
        {copyrightText}
      </p>
    </div>
  );
}
