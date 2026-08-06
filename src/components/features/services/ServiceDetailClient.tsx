"use client";

import { useState } from "react";
import { useSingleService, useServices } from "@/hooks/useServices";
import { ServicesHeader } from "@/components/features/services/ServicesHeader";
import { ServiceDetailHero } from "@/components/features/services/ServiceDetailHero";
import { ServiceProcessTabs } from "@/components/features/services/ServiceProcessTabs";
import { ServiceSpecifications } from "@/components/features/services/ServiceSpecifications";
import { ServiceGalleryLightbox } from "@/components/features/services/ServiceGalleryLightbox";
import { RelatedServicesCarousel } from "@/components/features/services/RelatedServicesCarousel";
import { ServiceQuoteModal } from "@/components/features/services/ServiceQuoteModal";
import { Loader2 } from "lucide-react";

interface ServiceDetailClientProps {
  slug: string;
}

export function ServiceDetailClient({ slug }: ServiceDetailClientProps) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const { data: service, isLoading } = useSingleService(slug);
  const { data: allServices } = useServices();

  if (isLoading || !service) {
    return (
      <div className="w-full py-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }} />
          <p className="font-body text-sm text-grey-600">Loading Service Details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Top Header */}
      <div className="pt-4">
        <ServicesHeader
          title={service.title}
          subtitle={service.shortDescription}
          currentSlug={slug}
        />
      </div>

      {/* Hero Section */}
      <ServiceDetailHero
        service={service}
        onOpenQuoteModal={() => setQuoteModalOpen(true)}
      />

      {/* Process Tabs Workflow */}
      <ServiceProcessTabs steps={service.processSteps || []} />

      {/* Features & Specifications */}
      <ServiceSpecifications
        features={service.features || []}
        specifications={service.specifications || []}
      />

      {/* Gallery Lightbox */}
      <ServiceGalleryLightbox
        gallery={service.gallery || []}
        title={service.title}
      />

      {/* Related Services */}
      <RelatedServicesCarousel
        services={allServices || []}
        currentSlug={slug}
      />

      {/* Interactive Consultation Quote Modal */}
      <ServiceQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        service={service}
      />
    </div>
  );
}
