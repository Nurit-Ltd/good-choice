"use client";

import { FooterBottomBar } from "./footer/FooterBottomBar";
import { FooterCopyright } from "./footer/FooterCopyright";
import { FooterNavColumns } from "./footer/FooterNavColumns";
import { FooterTopHeader } from "./footer/FooterTopHeader";

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden pt-12 sm:pt-16 pb-8">
      {/* Background Radial Bubble Shadow at Bottom-Left Corner */}
      <div
        className="absolute pointer-events-none select-none z-0 rounded-full"
        style={{
          width: "1867px",
          height: "1867px",
          left: "-537px",
          bottom: "-1050px",
          background: "radial-gradient(55.67% 55.67% at 50% 50%, var(--color-secondary-500, #A3896C) 13.28%, var(--color-secondary-50, #F8F6F4) 70%)",
          filter: "blur(128px)",
        }}
      />

      <div className="relative z-10 container">
        {/* Main Translucent Glass Card Container */}
        <div
          className="w-full rounded-lg sm:rounded-xl p-6 sm:p-10 lg:p-16 xl:p-24 border border-white/50 flex flex-col gap-12 sm:gap-16"
          style={{
            backgroundColor: "rgba(239, 236, 229, 0.48)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
          }}
        >
          {/* Top Row: Logo & Contact Info */}
          <FooterTopHeader />

          {/* Middle Row: 3 Service Navigation Columns */}
          <FooterNavColumns />

          {/* Bottom Row: Links, Address & Social Icons */}
          <FooterBottomBar />
        </div>

        {/* Copyright Text Outside Main Card */}
        <FooterCopyright />
      </div>
    </footer>
  );
}

export default Footer;
