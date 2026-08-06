import { Metadata } from "next";
import { ServicesHeader } from "@/components/features/services/ServicesHeader";
import { ServicesPageClient } from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Bespoke Furniture & Interior Craftsmanship Services | Good Choice",
  description:
    "Explore bespoke woodworking, 3D spatial interior planning, fine upholstery tailoring, and antique furniture restoration care by Good Choice Furniture.",
};

export default function ServicesPage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Top Luxury Banner Header */}
      <section className="px-4 pt-4">
        <ServicesHeader />
      </section>

      {/* Main Container with Bento Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        <ServicesPageClient />
      </main>
    </div>
  );
}
