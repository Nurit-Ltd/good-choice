import { useQuery } from '@tanstack/react-query';
import { getContactPageData, ContactPageData } from '@/services/contactPageService';

/**
 * Layer 2 Hook for Contact Us Page Data
 * Consumes Layer 1 getContactPageData service with TanStack React Query caching.
 */
export function useContactPage(initialData?: ContactPageData) {
  return useQuery({
    queryKey: ['contact-page-data'],
    queryFn: () => getContactPageData(),
    initialData,
    staleTime: 1000 * 60 * 30, // 30 minutes client-side stale time
  });
}
