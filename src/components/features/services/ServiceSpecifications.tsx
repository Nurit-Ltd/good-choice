"use client";

import { ServiceSpecification } from "@/types/service";
import { CheckCircle2, ShieldAlert } from "lucide-react";

interface ServiceSpecificationsProps {
  features?: string[];
  specifications?: ServiceSpecification[];
}

export function ServiceSpecifications({ features = [], specifications = [] }: ServiceSpecificationsProps) {
  if (features.length === 0 && specifications.length === 0) return null;

  return (
    <section className="w-full py-10 border-t border-secondary-200/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Key Feature Highlights */}
        {features.length > 0 && (
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-heading text-xl font-bold text-grey-950 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Service Features & Quality Commitments
            </h3>
            <div className="p-6 rounded-2xl bg-white border border-secondary-200/80 shadow-xs space-y-3">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 py-1.5 border-b border-secondary-100 last:border-0">
                  <span className="w-2 h-2 rounded-full bg-primary-950 mt-2 shrink-0" style={{ backgroundColor: "var(--color-primary-950, #62103A)" }} />
                  <span className="font-body text-sm font-medium text-grey-800 leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right Column: Technical Specifications */}
        {specifications.length > 0 && (
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-heading text-xl font-bold text-grey-950 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }} />
              Technical Specifications & Standards
            </h3>
            <div className="p-6 rounded-2xl bg-white border border-secondary-200/80 shadow-xs divide-y divide-secondary-100">
              {specifications.map((spec, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-sm">
                  <span className="font-body font-semibold text-grey-900">{spec.label}</span>
                  <span className="font-body text-grey-650 text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
