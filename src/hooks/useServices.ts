import { useQuery } from "@tanstack/react-query";
import { getServicesFromAPI, getServiceBySlugFromAPI } from "@/services/service.service";
import { MOCK_SERVICES } from "@/data/mock-services";
import { ServiceItem } from "@/types/service";

/**
 * Layer 2 Hook for Services List with Mock Fallback Engine
 */
export function useServices() {
  const query = useQuery({
    queryKey: ["services-list"],
    queryFn: async (): Promise<ServiceItem[]> => {
      const apiResult = await getServicesFromAPI();
      if (apiResult && apiResult.length > 0) {
        return apiResult;
      }
      return MOCK_SERVICES;
    },
    staleTime: 1000 * 60 * 5, // 5 mins
  });

  const services = query.data || MOCK_SERVICES;

  // Filter top 3 featured services for Navbar Mega Menu
  const featuredServices = services.filter((s) => s.isFeatured).slice(0, 3);
  const megaMenuFeatured = featuredServices.length > 0 ? featuredServices : services.slice(0, 3);

  // Total available services count string format (e.g. 12+ Services or 8+ Services)
  const totalCount = services.length;
  const totalCountLabel = totalCount >= 10 ? `${totalCount}+` : `${totalCount}+`;

  return {
    ...query,
    data: services,
    featuredServices: megaMenuFeatured,
    totalCount,
    totalCountLabel,
  };
}

/**
 * Layer 2 Hook for Single Service Detail with Mock Fallback
 */
export function useSingleService(slug: string) {
  return useQuery({
    queryKey: ["single-service", slug],
    queryFn: async (): Promise<ServiceItem | null> => {
      if (!slug) return null;
      const apiResult = await getServiceBySlugFromAPI(slug);
      if (apiResult) return apiResult;
      return MOCK_SERVICES.find((s) => s.slug === slug) || MOCK_SERVICES[0] || null;
    },
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 10,
  });
}
