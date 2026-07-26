"use client";

import React from "react";

export function FooterCopyright() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full pt-8 text-center">
      <p
        className="font-body text-sm font-normal leading-[110%] tracking-[-0.14px] text-grey-950/70"
        style={{ color: "var(--color-grey-950, #292929)" }}
      >
        © {currentYear} Good Choice Furniture - 1
      </p>
    </div>
  );
}
