"use client";

import Link from "next/link";
import React from "react";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isExternal?: boolean;
}

export function FooterLink({
  href,
  children,
  className = "",
  isExternal = false,
}: FooterLinkProps) {
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative inline-block py-0.5 text-sm sm:text-base font-normal text-grey-950 hover:text-primary-950 transition-colors duration-200 group ${className}`}
      >
        {children}
        <span className="absolute bottom-0 left-0 w-full h-px bg-primary-950 origin-bottom-right scale-x-0 group-hover:scale-x-100 group-hover:origin-bottom-left transition-transform duration-300 ease-out pointer-events-none transform-gpu" />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`relative inline-block py-0.5 text-sm sm:text-base font-normal text-grey-950 hover:text-primary-950 transition-colors duration-200 group ${className}`}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-px bg-primary-950 origin-bottom-right scale-x-0 group-hover:scale-x-100 group-hover:origin-bottom-left transition-transform duration-300 ease-out pointer-events-none transform-gpu" />
    </Link>
  );
}
