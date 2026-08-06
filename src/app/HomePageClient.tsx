"use client";

import { Banner } from "@/components/features/home/Banner";
import { Collections } from "@/components/features/home/Collections";
import { Experiences } from "@/components/features/home/Experiences";
import { Explore } from "@/components/features/home/Explore";
import { Faq } from "@/components/features/home/Faq";
import { MadeFurniture } from "@/components/features/home/MadeFurniture";
import { RecentlyCrafted } from "@/components/features/home/RecentlyCrafted";
import { ShopByRoom } from "@/components/features/home/ShobByRoom";
import { useHomePageData } from "@/hooks/use-home";
import { HomePageData } from "@/services/homePageService";
import { Loader2 } from "lucide-react";

interface HomePageClientProps {
  initialData?: HomePageData;
}

export function HomePageClient({ initialData }: HomePageClientProps) {
  const { isLoading } = useHomePageData(initialData);

  if (isLoading && !initialData) {
    return (
      <div className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-[#FAF7F2] text-grey-950 p-6 z-50">
        <div className="flex flex-col items-center gap-6 max-w-sm text-center">
          <div className="relative flex items-center justify-center w-20 h-20">
            <div className="absolute inset-0 rounded-full border-2 border-primary-950/20 animate-ping opacity-75" />
            <div
              className="relative w-16 h-16 rounded-full text-white flex items-center justify-center shadow-lg"
              style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
            >
              <span className="font-heading text-xl font-medium tracking-widest">GC</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <h2 className="font-heading text-2xl font-normal tracking-wide text-grey-950">
              Good Choice
            </h2>
            <p className="font-body text-xs tracking-widest uppercase font-medium text-stone-500">
              Bespoke Furniture & Craftsmanship
            </p>
          </div>

          <div className="flex items-center gap-2 text-primary-950 pt-2" style={{ color: "var(--color-primary-950, #62103A)" }}>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="font-body text-xs font-semibold">Loading Collections...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16 space-y-0">
      {/* Hero Banner Section */}
      <section className="px-4 pt-4">
        <Banner />
      </section>

      {/* Shop By Room Section */}
      <ShopByRoom />

      {/* Made Furniture Craftsmanship Section */}
      <MadeFurniture />

      {/* Recently Crafted Slider Section */}
      <RecentlyCrafted />

      {/* Grand Atelier Collections Section */}
      <Collections />

      {/* Explore Elevated Living Essentials Section */}
      <Explore />

      {/* Crafted Experiences Section */}
      <Experiences />

      {/* Frequently Asked Questions Section */}
      <Faq />
    </div>
  );
}
