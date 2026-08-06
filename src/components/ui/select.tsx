"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: (SelectOption | string)[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options array into object structure
  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border bg-white font-body text-sm font-medium text-grey-950 transition-all duration-200 cursor-pointer shadow-2xs ${
          isOpen
            ? "border-primary-950 ring-2 ring-primary-950/20 shadow-md"
            : "border-secondary-300 hover:border-primary-950/60"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        style={isOpen ? { borderColor: "var(--color-primary-950, #62103A)" } : {}}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-primary-950" : "text-grey-500"
          }`}
          style={isOpen ? { color: "var(--color-primary-950, #62103A)" } : {}}
        />
      </button>

      {/* Floating Dropdown Panel */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 top-full mt-1.5 z-50 p-1.5 rounded-xl border border-secondary-200 bg-white/98 backdrop-blur-xl shadow-2xl overflow-y-auto max-h-60 animate-in fade-in zoom-in-95 duration-150"
          style={{
            borderColor: "rgba(98, 16, 58, 0.2)",
            boxShadow: "0 12px 32px -4px rgba(44, 34, 30, 0.18)",
          }}
        >
          {normalizedOptions.map((option) => {
            const isSelected = option.value === value;

            return (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-body cursor-pointer transition-colors duration-150 ${
                  isSelected
                    ? "bg-primary-950/10 font-bold text-primary-950"
                    : "text-grey-900 hover:bg-secondary-100 hover:text-primary-950"
                }`}
                style={
                  isSelected
                    ? {
                        backgroundColor: "rgba(98, 16, 58, 0.08)",
                        color: "var(--color-primary-950, #62103A)",
                      }
                    : {}
                }
              >
                <span className="truncate">{option.label}</span>
                {isSelected && (
                  <Check
                    className="w-4 h-4 shrink-0 text-primary-950"
                    style={{ color: "var(--color-primary-950, #62103A)" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
