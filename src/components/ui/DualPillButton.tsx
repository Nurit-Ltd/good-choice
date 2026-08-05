import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { LongRightArrowIcon } from "../shared/svgs";
import { Loader2 } from "lucide-react";

export interface DualPillButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "light" | "outline";
  size?: "sm" | "md" | "lg";
  target?: string;
  rel?: string;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}


export function DualPillButton({
  href,
  children,
  variant = "primary",
  size = "md",
  target,
  rel,
  className = "",
  onClick,
  "aria-label": ariaLabel,
  fullWidth = false,
  isLoading = false,
  disabled = false,
}: DualPillButtonProps) {
  const isPrimary = variant === "primary";
  const isLight = variant === "light";

  const sizeClasses = {
    sm: {
      pill: "px-3.5 py-1.5 text-xs font-body font-normal rounded-full",
      icon: "w-8 h-8 rounded-full",
      iconSize: "w-3.5 h-3.5",
    },
    md: {
      pill: "px-4 py-2 text-[16px] leading-[150%] font-body font-normal rounded-full",
      icon: "w-10 h-10 rounded-full",
      iconSize: "w-4 h-4",
    },
    lg: {
      pill: "px-6 py-3.5 text-[16px] leading-[150%] font-body font-normal rounded-full",
      icon: "w-12 h-12 rounded-full",
      iconSize: "w-4 h-4",
    },
  }[size];

  const pillStyles: React.CSSProperties = isPrimary
    ? { backgroundColor: "var(--color-primary-950, #62103A)", color: "#FFFFFF" }
    : isLight
      ? { backgroundColor: "var(--color-grey-50, #FCFCFC)", color: "var(--color-primary-950, #62103A)" }
      : {};

  const iconStyles: React.CSSProperties = isPrimary
    ? { backgroundColor: "var(--color-primary-950, #62103A)", color: "#FFFFFF" }
    : isLight
      ? { backgroundColor: "var(--color-grey-50, #FCFCFC)", color: "var(--color-primary-950, #62103A)" }
      : {};

  const isDisabled = disabled || isLoading;

  const content = (
    <>
      <span className={cn(sizeClasses.pill, "transition-colors duration-200 shadow-xs flex items-center justify-center gap-2", fullWidth && "flex-1 text-center")} style={pillStyles}>
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {children}
      </span>
      <span className={cn(sizeClasses.icon, "relative overflow-hidden flex items-center justify-center transition-colors duration-200 shrink-0 shadow-xs")} style={iconStyles}>
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <LongRightArrowIcon
              className={cn(
                sizeClasses.iconSize,
                "transition-all duration-300 ease-out group-hover:translate-x-[150%] group-hover:opacity-0"
              )}
            />
            <LongRightArrowIcon
              className={cn(
                sizeClasses.iconSize,
                "absolute transition-all duration-300 ease-out translate-x-[-150%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              )}
            />
          </>
        )}
      </span>
    </>
  );

  const containerClassName = cn(
    "group flex items-center transition-transform duration-200 cursor-pointer",
    !isDisabled && "hover:scale-[1.02] active:scale-[0.98]",
    isDisabled && "opacity-60 cursor-not-allowed pointer-events-none",
    fullWidth && "w-full justify-center",
    className
  );

  const label = ariaLabel || (typeof children === "string" ? children : undefined);

  if (href && !isDisabled) {
    return (
      <Link href={href} target={target} rel={rel} onClick={onClick} className={containerClassName} aria-label={label}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} disabled={isDisabled} className={containerClassName} aria-label={label}>
      {content}
    </button>
  );
}

