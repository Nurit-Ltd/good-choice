/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useAboutPage } from "@/hooks/use-about-page";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  rawValue: string;
}

function AnimatedCounter({ rawValue }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<string>("");
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Extract initial placeholder format (e.g. "0+" or "0%")
  const initialFormat = rawValue.replace(/^[\d.,]+/, "0");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const match = rawValue.match(/^([\d.,]+)(.*)$/);
    if (!match) {
      setDisplayValue(rawValue);
      return;
    }

    const numStr = match[1].replace(/,/g, "");
    const suffix = match[2];
    const targetNum = parseFloat(numStr);

    if (isNaN(targetNum)) {
      setDisplayValue(rawValue);
      return;
    }

    const isDecimal = numStr.includes(".");
    const decimalPlaces = isDecimal ? numStr.split(".")[1].length : 0;

    let startTimestamp: number | null = null;
    const duration = 1800; // 1.8 seconds smooth count-up

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Smooth cubic ease-out formula
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentNum = targetNum * easeOutCubic;

      const formattedNum = isDecimal ? currentNum.toFixed(decimalPlaces) : Math.floor(currentNum).toString();

      setDisplayValue(`${formattedNum}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(`${isDecimal ? targetNum.toFixed(decimalPlaces) : targetNum.toString()}${suffix}`);
      }
    };

    const animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasAnimated, rawValue]);

  return (
    <span ref={containerRef} className="inline-block transition-all duration-300">
      {hasAnimated ? displayValue : initialFormat}
    </span>
  );
}

export function DescriptionAbout() {
  const { data: aboutData } = useAboutPage();

  const title =
    aboutData?.descriptionTitle ||
    "Celebrating timeless craftsmanship, we create luxury furniture thoughtfully designed to elevate every home, blending elegance, comfort, and lasting quality for refined living and extraordinary lifestyle experiences.";
  const content =
    aboutData?.descriptionContent ||
    "From our humble beginnings, we have dedicated ourselves to creating furniture and interiors that embody elegance, quality, and sophistication. Every piece is thoughtfully designed, combining artisanal craftsmanship, premium materials, and timeless aesthetics.";

  const stats =
    aboutData?.stats && aboutData.stats.length > 0
      ? aboutData.stats
      : [
          { value: "15+", label: "Years of Atelier Excellence" },
          { value: "500+", label: "Bespoke Furniture Projects" },
          { value: "100%", label: "Sustainably Sourced Hardwoods" },
          { value: "1000+", label: "Satisfied Atelier Clients" },
        ];

  return (
    <section className="w-full py-16 sm:py-24">
      <div className="container">
        {/* Centered Single-Column Container */}
        <div className="flex flex-col items-start text-left">
          {/* Main Prominent Paragraph / Title */}
          <h2
            className="font-heading text-2xl sm:text-4xl lg:text-[48px] font-normal leading-[130%] tracking-tight text-grey-950 mb-8 sm:mb-10 whitespace-pre-line"
            style={{ color: "var(--color-grey-950, #292929)" }}
          >
            {title}
          </h2>

          {/* Secondary Text Paragraph */}
          <p
            className="font-body text-xs sm:text-sm lg:text-[15px] font-normal leading-[160%] tracking-[0.2px] text-grey-950/80 max-w-195 mb-16 sm:mb-20 lg:mb-24 whitespace-pre-line"
            style={{ color: "var(--color-grey-950, #292929)" }}
          >
            {content}
          </p>

          {/* Statistics Section: 4-Column Horizontal Grid */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pt-8 sm:pt-12 border-t border-grey-200/60">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-start">
                <span className="font-heading text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] font-normal leading-none mb-2 tabular-nums" style={{ color: "var(--color-primary-800, #93215C)" }}>
                  <AnimatedCounter rawValue={stat.value} />
                </span>
                <span className="font-body text-sm sm:text-base font-medium leading-[150%] text-grey-950" style={{ color: "var(--color-grey-950, #292929)" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DescriptionAbout;
