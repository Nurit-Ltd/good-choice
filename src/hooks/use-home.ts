import { useQuery } from '@tanstack/react-query';
import { getHomePageData, HomePageData } from '@/services/homePageService';

/**
 * Layer 2 Hook for Home Page Data
 * Consumes Layer 1 getHomePageData service with TanStack React Query caching.
 */
export function useHomePageData(initialData?: HomePageData) {
  return useQuery({
    queryKey: ['home-page-data'],
    queryFn: () => getHomePageData(),
    initialData,
    staleTime: 1000 * 60 * 10, // 10 minutes client-side stale time
  });
}
