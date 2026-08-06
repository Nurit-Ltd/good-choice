"use client";

import { useServices } from "@/hooks/useServices";
import { ServicesBentoGrid } from "@/components/features/services/ServicesBentoGrid";
import { ServicesSkeleton } from "@/components/features/services/ServicesSkeleton";

export function ServicesPageClient() {
  const { data: services, isLoading } = useServices();

  if (isLoading && (!services || services.length === 0)) {
    return <ServicesSkeleton />;
  }

  return <ServicesBentoGrid services={services} />;
}
