/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchStrapiAPI, getStrapiMediaUrl } from './strapi';
import { GalleryItem, ImageAspectRatio } from '@/types/gallery';
import { MOCK_GALLERY_ITEMS } from '@/data/mock-gallery';

/**
 * Automatically calculate aspect ratio from media image dimensions
 */
function calculateAspectRatio(media: any): { aspectRatio: ImageAspectRatio; width: number; height: number } {
  const width = media?.width || media?.formats?.large?.width || media?.formats?.medium?.width || 800;
  const height = media?.height || media?.formats?.large?.height || media?.formats?.medium?.height || 800;
  const ratio = width / height;

  let aspectRatio: ImageAspectRatio = 'portrait';
  if (ratio >= 1.25) {
    aspectRatio = 'landscape';
  } else if (ratio <= 0.65) {
    aspectRatio = 'tall';
  } else if (ratio <= 0.85) {
    aspectRatio = 'portrait';
  } else {
    aspectRatio = 'square';
  }

  return { aspectRatio, width, height };
}

/**
 * Extract unified gallery items from a single Strapi service record
 */
function extractGalleryItemsFromService(serviceItem: any): GalleryItem[] {
  if (!serviceItem) return [];

  const attrs = serviceItem.attributes || serviceItem;
  const serviceId = serviceItem.documentId || serviceItem.id || attrs.slug || String(Math.random());
  const serviceTitle = attrs.title || 'Bespoke Craftsmanship';
  const serviceSlug = attrs.slug || '';
  const serviceCategory =
    attrs.service_category?.name ||
    attrs.service_category?.attributes?.name ||
    attrs.category ||
    'Bespoke Craftsmanship';
  const serviceDescription = attrs.short_description || attrs.description || '';

  const items: GalleryItem[] = [];

  // 1. Service Cover Image (feature_image)
  const coverMedia = attrs.feature_image?.data?.attributes || attrs.feature_image?.data || attrs.feature_image;
  if (coverMedia?.url) {
    const { aspectRatio, width, height } = calculateAspectRatio(coverMedia);
    items.push({
      id: `${serviceId}-cover`,
      title: coverMedia.caption || coverMedia.alternativeText || serviceTitle,
      category: serviceCategory,
      imageUrl: getStrapiMediaUrl(coverMedia.url),
      aspectRatio,
      width,
      height,
      description: serviceDescription,
      serviceTitle,
      serviceSlug,
      isFeatured: Boolean(attrs.is_featured),
      projectIndex: 1,
    });
  }

  // 2. Service Project Showcase Photos (gallery array)
  const galleryRaw = attrs.gallery?.data || attrs.gallery || [];
  const galleryList = Array.isArray(galleryRaw) ? galleryRaw : [galleryRaw];

  galleryList.forEach((photoObj: any, index: number) => {
    const photoMedia = photoObj?.attributes || photoObj;
    if (photoMedia?.url) {
      // Avoid duplicate if cover image is identical to first gallery photo
      if (coverMedia?.url && getStrapiMediaUrl(photoMedia.url) === getStrapiMediaUrl(coverMedia.url)) {
        return;
      }

      const { aspectRatio, width, height } = calculateAspectRatio(photoMedia);
      const photoTitle = photoMedia.caption || photoMedia.alternativeText || serviceTitle;

      items.push({
        id: `${serviceId}-photo-${photoMedia.id || index + 1}`,
        title: photoTitle,
        category: serviceCategory,
        imageUrl: getStrapiMediaUrl(photoMedia.url),
        aspectRatio,
        width,
        height,
        description: serviceDescription,
        serviceTitle,
        serviceSlug,
        isFeatured: Boolean(attrs.is_featured),
        projectIndex: items.length + 1,
      });
    }
  });

  return items;
}

/**
 * Layer 1: Fetch all active services and aggregate their photography into GalleryItems
 * Endpoint: /services?populate=*&filters[is_active][$eq]=true&sort=order_by:asc
 */
export async function getGalleryItemsFromAPI(): Promise<GalleryItem[]> {
  try {
    const { data, error } = await fetchStrapiAPI<any[]>(
      '/services?populate=*&filters[is_active][$eq]=true&sort=order_by:asc',
      {
        tags: ['services', 'gallery'],
        revalidate: 60,
      }
    );

    if (error || !data || !Array.isArray(data) || data.length === 0) {
      return MOCK_GALLERY_ITEMS;
    }

    const aggregatedItems: GalleryItem[] = [];
    for (const service of data) {
      const items = extractGalleryItemsFromService(service);
      aggregatedItems.push(...items);
    }

    return aggregatedItems.length > 0 ? aggregatedItems : MOCK_GALLERY_ITEMS;
  } catch (err) {
    console.warn('[galleryService.ts] Failed to aggregate gallery items from services:', err);
    return MOCK_GALLERY_ITEMS;
  }
}
