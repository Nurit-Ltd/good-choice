"use client";

import { useState } from "react";
import { ProcessStep } from "@/types/service";
import { CheckCircle2, Clock, Layers } from "lucide-react";

interface ServiceProcessTabsProps {
  steps: ProcessStep[];
}

export function ServiceProcessTabs({ steps }: ServiceProcessTabsProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  if (!steps || steps.length === 0) return null;

  const currentStep = steps[activeStepIndex] || steps[0];

  return (
    <section className="w-full py-12 border-t border-secondary-200/80">
      <div className="space-y-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-secondary-200/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-4 h-4 text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }} />
              <span className="font-body text-xs font-semibold uppercase tracking-wider text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }}>
                Step-by-Step Workflow
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-grey-950">
              How We Deliver Service Excellence
            </h2>
          </div>
          <p className="font-body text-xs text-grey-600 max-w-md">
            Click on any step below to explore our meticulous quality control timeline.
          </p>
        </div>

        {/* Step Tab Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {steps.map((step, index) => {
            const isActive = activeStepIndex === index;

            return (
              <button
                key={step.step || index}
                type="button"
                onClick={() => setActiveStepIndex(index)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 ${
                  isActive
                    ? "bg-primary-950 text-white border-primary-950 shadow-lg scale-102"
                    : "bg-white text-grey-900 border-secondary-200/80 hover:bg-secondary-50 hover:border-secondary-300"
                }`}
                style={
                  isActive
                    ? { backgroundColor: "var(--color-primary-950, #62103A)", color: "#ffffff" }
                    : {}
                }
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                      isActive ? "bg-white/20 text-white" : "bg-secondary-200/60 text-primary-950"
                    }`}
                  >
                    0{index + 1}
                  </span>
                  {isActive && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>

                <div>
                  <h4 className="font-heading text-sm font-bold line-clamp-1">
                    {step.title}
                  </h4>
                  {step.duration && (
                    <span className={`text-[11px] font-body block mt-0.5 ${isActive ? "text-white/80" : "text-grey-500"}`}>
                      ⏳ {step.duration}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Content Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-secondary-100/70 border border-secondary-200 flex flex-col sm:flex-row items-start justify-between gap-6 shadow-inner">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-primary-950 bg-white border border-secondary-200">
                Phase 0{activeStepIndex + 1} of 0{steps.length}
              </span>
              {currentStep.duration && (
                <span className="flex items-center gap-1 font-body text-xs text-grey-650">
                  <Clock className="w-3.5 h-3.5" />
                  Estimated Time: {currentStep.duration}
                </span>
              )}
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-grey-950">
              {currentStep.title}
            </h3>

            <p className="font-body text-sm sm:text-base text-grey-750 leading-relaxed max-w-3xl">
              {currentStep.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
