"use client";

import { RelatedServicesCarousel } from "@/components/features/services/RelatedServicesCarousel";
import { ServiceDetailHero } from "@/components/features/services/ServiceDetailHero";
import { ServiceGalleryLightbox } from "@/components/features/services/ServiceGalleryLightbox";
import { ServiceProcessTabs } from "@/components/features/services/ServiceProcessTabs";
import { ServiceQuoteModal } from "@/components/features/services/ServiceQuoteModal";
import { ServicesHeader } from "@/components/features/services/ServicesHeader";
import { ServiceSpecifications } from "@/components/features/services/ServiceSpecifications";
import { ServiceDetailSkeleton } from "@/components/features/services/ServiceDetailSkeleton";
import { ServiceTopSwitcherStrip } from "@/components/features/services/ServiceTopSwitcherStrip";
import { useServices, useSingleService } from "@/hooks/useServices";
import { useState } from "react";

interface ServiceDetailClientProps {
  slug: string;
}

export function ServiceDetailClient({ slug }: ServiceDetailClientProps) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const { data: service, isLoading } = useSingleService(slug);
  const { data: allServices } = useServices();

  if (isLoading || !service) {
    return <ServiceDetailSkeleton />;
  }

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Top Luxury Banner Header */}
      <div className="pt-4 px-4">
        <ServicesHeader title={service.title} subtitle={service.shortDescription} currentSlug={slug} />
      </div>

      {/* Top Slim Service Switcher Strip Hook */}
      <ServiceTopSwitcherStrip services={allServices || []} currentSlug={slug} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <ServiceDetailHero service={service} onOpenQuoteModal={() => setQuoteModalOpen(true)} />

        {/* Process Tabs Workflow */}
        <ServiceProcessTabs steps={service.processSteps || []} />

        {/* Features & Specifications */}
        <ServiceSpecifications features={service.features || []} specifications={service.specifications || []} />

        {/* Gallery Lightbox */}
        <ServiceGalleryLightbox gallery={service.gallery || []} title={service.title} />

        {/* Related Services at Bottom */}
        <RelatedServicesCarousel services={allServices || []} currentSlug={slug} />

        {/* Interactive Consultation Quote Modal */}
        <ServiceQuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} service={service} />
      </div>
    </div>
  );
}

export default ServiceDetailClient;
