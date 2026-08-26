"use client";

import React, { useRef, useState } from "react";
import { FacebookIcon, InstagramIcon, WhatsappIcon } from "@/components/shared/svgs";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { X, MessageCircle } from "lucide-react";

interface FloatingSocialDockProps {
  whatsappUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

export function FloatingSocialDock({
  whatsappUrl: propWhatsappUrl,
  facebookUrl: propFacebookUrl,
  instagramUrl: propInstagramUrl,
}: FloatingSocialDockProps) {
  const { data: settings } = useSiteSettings();

  const whatsappUrl =
    propWhatsappUrl ||
    settings?.socialLinks?.whatsapp ||
    settings?.whatsappUrl ||
    "https://wa.me/974123456789";

  const facebookUrl =
    propFacebookUrl ||
    settings?.socialLinks?.facebook ||
    "https://facebook.com";

  const instagramUrl =
    propInstagramUrl ||
    settings?.socialLinks?.instagram ||
    "https://instagram.com";

  // Mobile Expandable & Draggable State
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [customPos, setCustomPos] = useState<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const elementPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = { x: clientX, y: clientY };

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      elementPosRef.current = { x: rect.left, y: rect.top };
    }
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      hasMovedRef.current = true;
    }

    const newX = Math.max(10, Math.min(window.innerWidth - 64, elementPosRef.current.x + deltaX));
    const newY = Math.max(10, Math.min(window.innerHeight - 64, elementPosRef.current.y + deltaY));

    setCustomPos({ x: newX, y: newY });
  };

  const handleEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (!hasMovedRef.current) {
      // Toggle social options on mobile tap
      setMobileExpanded((prev) => !prev);
    }
  };

  const socialItems = [
    {
      id: "whatsapp",
      label: "WhatsApp Chat",
      href: whatsappUrl,
      icon: WhatsappIcon,
      bg: "hover:bg-emerald-600/10 hover:text-emerald-700",
      accent: "text-emerald-700",
    },
    {
      id: "instagram",
      label: "Instagram Gallery",
      href: instagramUrl,
      icon: InstagramIcon,
      bg: "hover:bg-pink-600/10 hover:text-pink-600",
      accent: "text-pink-600",
    },
    {
      id: "facebook",
      label: "Facebook Page",
      href: facebookUrl,
      icon: FacebookIcon,
      bg: "hover:bg-blue-600/10 hover:text-blue-600",
      accent: "text-blue-600",
    },
  ];

  return (
    <>
      {/* 1. DESKTOP FLOATING DOCK (Fixed right side, vertical glassmorphic dock) */}
      <aside
        aria-label="Social media floating links"
        className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-2.5 p-2 rounded-2xl bg-white/85 backdrop-blur-md border border-secondary-200/90 shadow-xl shadow-black/5 select-none"
      >
        {socialItems.map((social) => {
          const Icon = social.icon;
          return (
            <div key={social.id} className="relative group/tooltip flex items-center">
              {/* Sliding Tooltip on Left */}
              <span className="absolute right-full mr-3.5 px-3 py-1.5 rounded-xl bg-grey-950 text-white font-body text-xs font-medium whitespace-nowrap shadow-md opacity-0 -translate-x-2 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:translate-x-0 transition-all duration-200">
                {social.label}
              </span>

              {/* Icon Button */}
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-grey-800 transition-all duration-200 hover:scale-110 active:scale-95 ${social.bg}`}
              >
                <Icon className="w-5 h-5 transition-transform" />
              </a>
            </div>
          );
        })}
      </aside>

      {/* 2. MOBILE EXPANDABLE & DRAGGABLE SOCIAL HUB (Zero-Overlap on Phone) */}
      <div
        ref={buttonRef}
        style={
          customPos
            ? {
                position: "fixed",
                left: `${customPos.x}px`,
                top: `${customPos.y}px`,
                touchAction: "none",
              }
            : {
                position: "fixed",
                touchAction: "none",
              }
        }
        className={`md:hidden z-40 flex flex-col items-center select-none ${
          !customPos ? "bottom-6 right-4 sm:right-6" : ""
        }`}
      >
        {/* Expanded Popup Menu (Opens upwards when tapped) */}
        {mobileExpanded && (
          <div className="flex flex-col gap-2 mb-2 p-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-secondary-200/90 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {socialItems.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileExpanded(false)}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center border border-secondary-100/60 bg-secondary-50/80 active:scale-90 transition-transform ${social.accent}`}
                  aria-label={social.label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>
        )}

        {/* Main Floating Trigger Button */}
        <button
          type="button"
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          className={`flex items-center justify-center w-14 h-14 rounded-full text-white shadow-xl border border-white/30 cursor-grab active:cursor-grabbing hover:scale-105 active:scale-95 transition-all duration-200 ${
            mobileExpanded
              ? "bg-grey-950 shadow-black/30 rotate-90"
              : "bg-primary-950 shadow-primary-950/40"
          }`}
          style={
            !mobileExpanded
              ? { backgroundColor: "var(--color-primary-950, #62103A)" }
              : {}
          }
          aria-label="Toggle Social Contacts (Draggable)"
        >
          {mobileExpanded ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <WhatsappIcon className="w-7 h-7 text-white" />
          )}
        </button>
      </div>
    </>
  );
}

export default FloatingSocialDock;
