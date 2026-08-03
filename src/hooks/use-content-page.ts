import { useQuery } from '@tanstack/react-query';
import { getContentPageBySlug, ContentPageData } from '@/services/contentPageService';

/**
 * Layer 2 Hook for Legal & Informational Pages
 */
export function useContentPage(slug: string, initialData?: ContentPageData) {
  return useQuery({
    queryKey: ['content-page', slug],
    queryFn: () => getContentPageBySlug(slug),
    initialData,
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 60, // 1 hour client cache
  });
}
