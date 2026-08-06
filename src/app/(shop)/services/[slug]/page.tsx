import { Metadata } from "next";
import { getServiceBySlugFromAPI } from "@/services/service.service";
import { MOCK_SERVICES } from "@/data/mock-services";
import { ServiceDetailClient } from "@/components/features/services/ServiceDetailClient";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  const service =
    (await getServiceBySlugFromAPI(slug)) ||
    MOCK_SERVICES.find((s) => s.slug === slug) ||
    MOCK_SERVICES[0];

  return {
    title: `${service.title} | Good Choice Services`,
    description: service.shortDescription || service.description,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  return (
    <div className="w-full min-h-screen flex flex-col">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full pb-16">
        <ServiceDetailClient slug={slug} />
      </main>
    </div>
  );
}
