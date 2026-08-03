import { useQuery } from '@tanstack/react-query';
import { getAboutPageData, AboutPageData } from '@/services/aboutPageService';

/**
 * Layer 2 Hook for About Us Page Data
 * Consumes Layer 1 getAboutPageData service with TanStack React Query caching.
 */
export function useAboutPage(initialData?: AboutPageData) {
  return useQuery({
    queryKey: ['about-page-data'],
    queryFn: () => getAboutPageData(),
    initialData,
    staleTime: 1000 * 60 * 30, // 30 minutes client-side stale time
  });
}
