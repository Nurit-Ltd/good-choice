"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FooterLink } from "./FooterLink";

export function FooterTopHeader() {
  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-4 border-b border-grey-950/10">
      {/* Brand Logo */}
      <Link href="/" className="shrink-0 group">
        <div className="relative w-45 sm:w-55 lg:w-63 h-15 sm:h-18.75 lg:h-21.5">
          <Image
            src="/icons/logo.svg"
            alt="Good Choice Furniture Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </Link>

      {/* Contact Info (Clickable Mail & Phone) */}
      <div className="flex flex-col items-start md:items-end gap-1 font-body text-sm sm:text-base font-normal text-grey-950">
        <FooterLink href="mailto:goodchoiceno1@gmail.com" isExternal>
          goodchoiceno1@gmail.com
        </FooterLink>
        <FooterLink href="tel:123456789" isExternal>
          123456789
        </FooterLink>
      </div>
    </div>
  );
}
