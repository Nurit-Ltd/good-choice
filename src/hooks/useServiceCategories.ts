import { useQuery } from "@tanstack/react-query";
import { getServiceCategoriesFromAPI } from "@/services/service.service";
import { ServiceCategoryItem } from "@/types/service";

export const DEFAULT_SERVICE_CATEGORIES: ServiceCategoryItem[] = [
  { id: 1, name: "Bespoke Furniture", slug: "bespoke-furniture", orderBy: 1, isActive: true },
  { id: 2, name: "Interior Design", slug: "interior-design", orderBy: 2, isActive: true },
  { id: 3, name: "Restoration & Repair", slug: "restoration-repair", orderBy: 3, isActive: true },
  { id: 4, name: "Architectural Millwork", slug: "architectural-millwork", orderBy: 4, isActive: true },
  { id: 5, name: "Commercial & Office", slug: "commercial-office", orderBy: 5, isActive: true },
];

/**
 * Layer 2 Hook for Service Categories with Fallback
 */
export function useServiceCategories() {
  const query = useQuery({
    queryKey: ["service-categories"],
    queryFn: async (): Promise<ServiceCategoryItem[]> => {
      const apiResult = await getServiceCategoriesFromAPI();
      if (apiResult && apiResult.length > 0) {
        return apiResult;
      }
      return DEFAULT_SERVICE_CATEGORIES;
    },
    staleTime: 1000 * 60 * 15,
  });

  return {
    ...query,
    data: query.data || DEFAULT_SERVICE_CATEGORIES,
  };
}
