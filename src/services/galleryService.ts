/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchStrapiAPI, getStrapiMediaUrl } from './strapi';
import { GalleryItem, GalleryCategory, ImageAspectRatio } from '@/types/gallery';
import { MOCK_GALLERY_ITEMS } from '@/data/mock-gallery';

/**
 * Normalize raw Strapi v5 response item into clean GalleryItem interface
 */
export function normalizeStrapiGallery(item: any, index: number): GalleryItem {
  if (!item) return {} as GalleryItem;

  const attributes = item.attributes || item;

  const getMediaUrl = (media: any): string => {
    if (!media) return '';
    const mediaObj = media.data ? media.data.attributes || media.data : media;
    const url = mediaObj?.url || mediaObj?.formats?.large?.url || mediaObj?.formats?.medium?.url || '';
    return getStrapiMediaUrl(url);
  };

  const rawAspectRatio = attributes.aspect_ratio || attributes.aspectRatio || 'portrait';
  let aspectRatio: ImageAspectRatio = 'portrait';
  let width = 800;
  let height = 1000;

  if (rawAspectRatio === 'tall') {
    aspectRatio = 'tall';
    width = 800;
    height = 1200;
  } else if (rawAspectRatio === 'landscape') {
    aspectRatio = 'landscape';
    width = 1200;
    height = 800;
  } else if (rawAspectRatio === 'square') {
    aspectRatio = 'square';
    width = 800;
    height = 800;
  } else {
    aspectRatio = 'portrait';
    width = 800;
    height = 1000;
  }

  const rawImageUrl = getMediaUrl(attributes.image);

  return {
    id: item.documentId || item.id || attributes.slug || `gallery-${index + 1}`,
    title: attributes.title || 'Bespoke Craftsmanship',
    category: (attributes.category as GalleryCategory) || 'Luxury Sofas',
    imageUrl: rawImageUrl || MOCK_GALLERY_ITEMS[index % MOCK_GALLERY_ITEMS.length]?.imageUrl || '/images/services/service-1.webp',
    aspectRatio,
    width,
    height,
    description: attributes.short_description || attributes.shortDescription || attributes.description || '',
    tags: Array.isArray(attributes.tags) ? attributes.tags : [attributes.category || 'Bespoke'],
    serviceSlug: attributes.service_slug || attributes.serviceSlug || '',
    isFeatured: Boolean(attributes.is_featured ?? attributes.isFeatured ?? false),
  };
}

/**
 * Layer 1: Fetch all gallery items from Strapi API
 * Endpoint: /galleries?filters[is_active][$eq]=true&sort=order_by:asc&populate=*
 */
export async function getGalleryItemsFromAPI(): Promise<GalleryItem[]> {
  try {
    const { data, error } = await fetchStrapiAPI<any[]>('/galleries?filters[is_active][$eq]=true&sort=order_by:asc&populate=*', {
      tags: ['gallery'],
      revalidate: 60,
    });

    if (error || !data || !Array.isArray(data) || data.length === 0) {
      return MOCK_GALLERY_ITEMS;
    }

    const items = data.map(normalizeStrapiGallery);
    return items.length > 0 ? items : MOCK_GALLERY_ITEMS;
  } catch (err) {
    console.warn('[galleryService.ts] Failed to fetch galleries from Strapi, falling back to mock:', err);
    return MOCK_GALLERY_ITEMS;
  }
}
