"use client";

import { useServices } from "@/hooks/useServices";
import { ServicesBentoGrid } from "@/components/features/services/ServicesBentoGrid";
import { Loader2 } from "lucide-react";

export function ServicesPageClient() {
  const { data: services, isLoading } = useServices();

  if (isLoading && (!services || services.length === 0)) {
    return (
      <div className="w-full py-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }} />
          <p className="font-body text-sm text-grey-600">Loading Craftsmanship Services...</p>
        </div>
      </div>
    );
  }

  return <ServicesBentoGrid services={services} />;
}
