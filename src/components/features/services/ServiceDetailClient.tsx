"use client";

import { RelatedServicesCarousel } from "@/components/features/services/RelatedServicesCarousel";
import { ServiceDetailHero } from "@/components/features/services/ServiceDetailHero";
import { ServiceGalleryLightbox } from "@/components/features/services/ServiceGalleryLightbox";
import { ServiceProcessTabs } from "@/components/features/services/ServiceProcessTabs";
import { ServiceQuoteModal } from "@/components/features/services/ServiceQuoteModal";
import { ServicesHeader } from "@/components/features/services/ServicesHeader";
import { ServiceSpecifications } from "@/components/features/services/ServiceSpecifications";
import { useServices, useSingleService } from "@/hooks/useServices";
import { Loader2 } from "lucide-react";
import { useState } from "react";

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
      <div className="pt-4 px-4">
        <ServicesHeader title={service.title} subtitle={service.shortDescription} currentSlug={slug} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Hero Section */}
        <ServiceDetailHero service={service} onOpenQuoteModal={() => setQuoteModalOpen(true)} />

        {/* Process Tabs Workflow */}
        <ServiceProcessTabs steps={service.processSteps || []} />

        {/* Features & Specifications */}
        <ServiceSpecifications features={service.features || []} specifications={service.specifications || []} />

        {/* Gallery Lightbox */}
        <ServiceGalleryLightbox gallery={service.gallery || []} title={service.title} />

        {/* Related Services */}
        <RelatedServicesCarousel services={allServices || []} currentSlug={slug} />

        {/* Interactive Consultation Quote Modal */}
        <ServiceQuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} service={service} />
      </div>
    </div>
  );
}
