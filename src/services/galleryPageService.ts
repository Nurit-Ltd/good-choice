/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchStrapiAPI } from './strapi';
import { GalleryPageData } from '@/types/gallery';

export const DEFAULT_GALLERY_PAGE_DATA: GalleryPageData = {
  headerTitle: 'Craftsmanship & Project Gallery',
  catalogTitle: 'All Craftsmanship Creations',
  searchPlaceholder: 'Search by keyword, wood, majlis...',
  whatsappButtonText: 'Inquire on WhatsApp',
  serviceButtonText: 'View Craftsmanship Service',
  seo: {
    metaTitle: 'Craftsmanship & Project Gallery | Good Choice Furniture',
    metaDescription:
      'Browse our dynamic portfolio of luxury Arabic majlis, custom upholstered sofas, bespoke woodworking, and master architectural furniture installations.',
  },
};

/**
 * Layer 1 Gallery Page Fetcher with On-Demand ISR Tag Caching
 * Endpoint: /gallery-page?populate=*
 */
export async function getGalleryPageData(): Promise<GalleryPageData> {
  try {
    const { data, error } = await fetchStrapiAPI<any>('/gallery-page?populate=*', {
      tags: ['gallery-page'],
      revalidate: 60,
    });

    if (error || !data) {
      return DEFAULT_GALLERY_PAGE_DATA;
    }

    const attrs = data.attributes || data;

    return {
      headerTitle: attrs.header_title || DEFAULT_GALLERY_PAGE_DATA.headerTitle,
      catalogTitle: attrs.catalog_title || DEFAULT_GALLERY_PAGE_DATA.catalogTitle,
      searchPlaceholder: attrs.search_placeholder || DEFAULT_GALLERY_PAGE_DATA.searchPlaceholder,
      whatsappButtonText: attrs.whatsapp_button_text || DEFAULT_GALLERY_PAGE_DATA.whatsappButtonText,
      serviceButtonText: attrs.service_button_text || DEFAULT_GALLERY_PAGE_DATA.serviceButtonText,
      seo: {
        metaTitle: attrs.seo?.metaTitle || DEFAULT_GALLERY_PAGE_DATA.seo?.metaTitle,
        metaDescription: attrs.seo?.metaDescription || DEFAULT_GALLERY_PAGE_DATA.seo?.metaDescription,
        keywords: attrs.seo?.keywords || '',
      },
    };
  } catch (err) {
    console.warn('[galleryPageService.ts] Failed to fetch gallery page data:', err);
    return DEFAULT_GALLERY_PAGE_DATA;
  }
}
