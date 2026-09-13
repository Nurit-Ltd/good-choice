"use client";

import { useServices } from "@/hooks/useServices";
import { useServicesPage } from "@/hooks/useServicesPage";
import { useServiceCategories } from "@/hooks/useServiceCategories";
import { ServicesHeader } from "@/components/features/services/ServicesHeader";
import { ServicesCardGrid } from "@/components/features/services/ServicesCardGrid";
import { ServicesSkeleton } from "@/components/features/services/ServicesSkeleton";
import { ServicesPageData } from "@/types/service";

interface ServicesPageClientProps {
  initialData?: ServicesPageData;
}

export function ServicesPageClient({ initialData }: ServicesPageClientProps) {
  const { data: pageData } = useServicesPage(initialData);
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: categories } = useServiceCategories();

  if (servicesLoading && (!services || services.length === 0)) {
    return <ServicesSkeleton />;
  }

  return (
    <>
      {/* Top Luxury Banner Header */}
      <section className="px-4 pt-4">
        <ServicesHeader title={pageData.headerTitle} />
      </section>

      {/* Main Container with Services Card Grid */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        <ServicesCardGrid
          services={services}
          categories={categories}
          catalogTitle={pageData.catalogTitle}
        />
      </main>
    </>
  );
}

export default ServicesPageClient;
