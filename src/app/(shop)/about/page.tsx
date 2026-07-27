import { Metadata } from "next";
import { HeroAbout } from "@/components/features/about/hero-about";
import { DescriptionAbout } from "@/components/features/about/description-about";
import { VisionaryBrand } from "@/components/features/about/visionary-brand";
import { Handcraft } from "@/components/features/about/handcraft";
import { ApproachLuxury } from "@/components/features/about/approach-luxury";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Celebrating timeless craftsmanship, we create luxury furniture thoughtfully designed to elevate every home, blending elegance, comfort, and lasting quality.",
};

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Two-Column Hero Section */}
      <HeroAbout />

      {/* Centered Single-Column Description & 4-Column Statistics Section */}
      <DescriptionAbout />

      {/* The Visionary Behind the Brand Section */}
      <VisionaryBrand />

      {/* Handcrafted with Purpose and Precision Section */}
      <Handcraft />

      {/* An Uncompromising Approach to Luxury Section */}
      <ApproachLuxury />
    </div>
  );
}
