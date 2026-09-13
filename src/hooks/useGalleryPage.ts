import { useQuery } from "@tanstack/react-query";
import { getGalleryPageData, DEFAULT_GALLERY_PAGE_DATA } from "@/services/galleryPageService";
import { GalleryPageData } from "@/types/gallery";

/**
 * Layer 2 Hook for Gallery Page CMS Settings with TanStack Query
 */
export function useGalleryPage(initialData?: GalleryPageData) {
  const query = useQuery({
    queryKey: ["gallery-page-data"],
    queryFn: () => getGalleryPageData(),
    initialData,
    staleTime: 1000 * 60 * 15, // 15 mins
  });

  return {
    ...query,
    data: query.data || DEFAULT_GALLERY_PAGE_DATA,
  };
}
