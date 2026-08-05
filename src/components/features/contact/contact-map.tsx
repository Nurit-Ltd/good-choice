"use client";

import dynamic from "next/dynamic";
import { useContactPage } from "@/hooks/use-contact";
import { useSiteSettings } from "@/hooks/use-site-settings";

// Dynamically import Leaflet map with SSR disabled to prevent window object errors during build
const LeafletMapInner = dynamic(
  () => import("@/components/features/contact/leaflet-map-inner"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-112.5 bg-stone-100 animate-pulse flex items-center justify-center text-stone-400 font-body text-sm">
        Loading Interactive Map...
      </div>
    ),
  }
);

export function ContactMap() {
  const { data: contact } = useContactPage();
  const { data: settings } = useSiteSettings();

  const lat = contact?.latitude || 25.275;
  const lng = contact?.longitude || 51.428;
  const zoom = contact?.mapZoom || 14;
  const storeName = settings?.siteName || "Good Choice Furniture";
  const address = contact?.addressLine || settings?.storeAddress || settings?.address || "C.R. No:82686, Muaither, Umm Al Dome St, Doha, Qatar, Ar Rayyan";
  const mapsUrl = settings?.storeMapsUrl || `https://maps.google.com/?q=${lat},${lng}`;

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="w-full h-112.5 sm:h-137.5 lg:h-162.5 relative overflow-hidden bg-stone-100">
        <LeafletMapInner
          coords={[lat, lng]}
          zoom={zoom}
          storeName={storeName}
          address={address}
          mapsUrl={mapsUrl}
        />
      </div>
    </section>
  );
}

export default ContactMap;
