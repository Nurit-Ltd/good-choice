"use client";

import { useServices } from "@/hooks/useServices";
import { ServicesCardGrid } from "@/components/features/services/ServicesCardGrid";
import { ServicesSkeleton } from "@/components/features/services/ServicesSkeleton";

export function ServicesPageClient() {
  const { data: services, isLoading } = useServices();

  if (isLoading && (!services || services.length === 0)) {
    return <ServicesSkeleton />;
  }

  return <ServicesCardGrid services={services} />;
}

export default ServicesPageClient;
