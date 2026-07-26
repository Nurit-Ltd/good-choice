"use client";

import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const DEFAULT_FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "What are the shipping options?",
    answer:
      "We offer various shipping options to ensure your order arrives safely and promptly. Standard shipping typically takes 5-7 business days, while express options are available for faster delivery. You can choose your preferred method at checkout.",
  },
  {
    id: "faq-2",
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of delivery for most items in their original condition. Please contact our support team to initiate a return process.",
  },
  {
    id: "faq-3",
    question: "How do I care?",
    answer:
      "Use a soft, dry cloth to clean dust regularly. Avoid direct exposure to harsh sunlight and liquid spills to preserve the premium wood and fabric finish.",
  },
  {
    id: "faq-4",
    question: "Do you offer warranties?",
    answer:
      "Yes, all Good Choice bespoke furniture pieces come with a 5-year structural warranty covering materials and manufacturing craftsmanship.",
  },
  {
    id: "faq-5",
    question: "Can I track my order?",
    answer:
      "Once your order ships, we will send a confirmation email with live tracking details and direct contact for our delivery team.",
  },
];

interface FaqProps {
  title?: string;
  items?: FaqItem[];
  className?: string;
}

export function Faq({
  title = "Frequently Asked\nQuestions",
  items = DEFAULT_FAQ_ITEMS,
  className = "",
}: FaqProps) {
  // First item open by default (matching Figma inspect state)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`w-full pt-16 sm:pt-20 lg:pt-24 ${className}`}>
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16 xl:gap-24">
          
          {/* Left Column: Section Title (Figma Spec: 64px, Legquinne, 110% line-height, -0.64px letter-spacing) */}
          <div className="w-full lg:w-5/12 shrink-0">
            <h2
              className="font-heading text-4xl sm:text-5xl lg:text-[64px] font-normal leading-[110%] tracking-[-0.64px] text-grey-950 whitespace-pre-line"
              style={{ color: "var(--color-grey-950, #292929)" }}
            >
              {title}
            </h2>
          </div>

          {/* Right Column: Accordion Items List */}
          <div className="w-full lg:w-7/12 flex flex-col border-t border-grey-200/80">
            {items.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.id}
                  className="border-b last:border-b-0 border-grey-200/80 transition-colors duration-200"
                >
                  {/* Question Button Header */}
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="w-full py-5 sm:py-6 flex items-center justify-between gap-4 text-left cursor-pointer group focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="font-body text-xl sm:text-[24px] font-normal leading-[110%] tracking-[-0.24px] text-grey-950 group-hover:text-primary-950 transition-colors duration-200"
                      style={{ color: "var(--color-grey-950, #292929)" }}
                    >
                      {item.question}
                    </span>

                    {/* Toggle Icon (+ / - in Primary Burgundy) */}
                    <span
                      className="shrink-0 transition-transform duration-300"
                      style={{ color: "var(--color-primary-950, #62103A)" }}
                    >
                      {isOpen ? (
                        <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-primary-950" />
                      ) : (
                        <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-primary-950" />
                      )}
                    </span>
                  </button>

                  {/* Accordion Answer Content (Smooth height transition) */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0 pb-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="font-body text-sm sm:text-base font-normal leading-[130%] tracking-[-0.16px] text-grey-950/80 max-w-3xl"
                        style={{ color: "var(--color-grey-950, #292929)" }}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
