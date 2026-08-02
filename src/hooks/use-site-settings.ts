import { useQuery } from '@tanstack/react-query';
import { getSiteSettings, SiteSettings } from '@/services/siteSettingService';

/**
 * Layer 2 Hook for Site Settings (Header, Footer, Logo, Announcement Bar)
 */
export function useSiteSettings(initialData?: SiteSettings) {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: () => getSiteSettings(),
    initialData,
    staleTime: 1000 * 60 * 60, // 1 hour client stale time
  });
}
