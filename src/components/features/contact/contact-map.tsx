"use client";

import dynamic from "next/dynamic";

// Dynamically import Leaflet map with SSR disabled to prevent window object errors during build
const LeafletMapInner = dynamic(
  () => import("@/components/features/contact/leaflet-map-inner"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[450px] bg-stone-100 animate-pulse flex items-center justify-center text-stone-400 font-body text-sm">
        Loading Interactive Map...
      </div>
    ),
  }
);

export function ContactMap() {
  return (
    <section className="w-full py-12 lg:py-16">
      <div className="w-full h-[450px] sm:h-[550px] lg:h-[650px] relative overflow-hidden bg-stone-100">
        <LeafletMapInner />
      </div>
    </section>
  );
}

export default ContactMap;
