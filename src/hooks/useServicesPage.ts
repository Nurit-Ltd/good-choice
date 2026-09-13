import { useQuery } from "@tanstack/react-query";
import { getServicesPageData, DEFAULT_SERVICES_PAGE_DATA } from "@/services/servicesPageService";
import { ServicesPageData } from "@/types/service";

/**
 * Layer 2 Hook for Services Page CMS Settings with TanStack Query
 */
export function useServicesPage(initialData?: ServicesPageData) {
  const query = useQuery({
    queryKey: ["services-page-data"],
    queryFn: () => getServicesPageData(),
    initialData,
    staleTime: 1000 * 60 * 15, // 15 mins
  });

  return {
    ...query,
    data: query.data || DEFAULT_SERVICES_PAGE_DATA,
  };
}
