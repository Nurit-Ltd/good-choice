import { useQuery } from '@tanstack/react-query';
import { getContactPageData } from '@/services/contactService';

/**
 * Layer 2 Hook for Contact Us Page Data
 * Consumes Layer 1 getContactPageData with TanStack React Query caching.
 */
export function useContactPage() {
  return useQuery({
    queryKey: ['contact-page'],
    queryFn: () => getContactPageData(),
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });
}
