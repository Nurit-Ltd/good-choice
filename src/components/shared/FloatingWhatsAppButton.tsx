"use client";

import { WhatsappIcon } from "@/components/shared/svgs";
import React, { useRef, useState } from "react";

interface FloatingWhatsAppButtonProps {
  whatsappUrl?: string;
}

export function FloatingWhatsAppButton({ whatsappUrl = "https://wa.me/974123456789" }: FloatingWhatsAppButtonProps) {
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

    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      hasMovedRef.current = true;
    }

    const newX = Math.max(12, Math.min(window.innerWidth - 68, elementPosRef.current.x + deltaX));
    const newY = Math.max(12, Math.min(window.innerHeight - 68, elementPosRef.current.y + deltaY));

    setCustomPos({ x: newX, y: newY });
  };

  const handleEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (!hasMovedRef.current) {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
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
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      className={`md:hidden z-9999 flex items-center justify-center w-14 h-14 rounded-full bg-primary-950 text-white shadow-xl shadow-primary-950/40 border border-white/20 cursor-grab active:cursor-grabbing hover:scale-105 active:scale-95 transition-transform duration-150 select-none group ${
        !customPos ? "bottom-6 right-4 sm:right-6" : ""
      }`}
      aria-label="Contact us on WhatsApp (Draggable)"
    >
      {/* Official Solid WhatsApp Icon */}
      <WhatsappIcon className="w-8 h-8 text-white relative z-10 drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
    </div>
  );
}
