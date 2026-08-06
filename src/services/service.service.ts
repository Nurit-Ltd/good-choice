/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchStrapiAPI, getStrapiMediaUrl } from "./strapi";
import { ServiceItem } from "@/types/service";

/**
 * Normalize raw Strapi v5 response item into clean ServiceItem interface
 */
export function normalizeStrapiService(item: any): ServiceItem {
  if (!item) return {} as ServiceItem;

  const attributes = item.attributes || item;

  const getMediaField = (media: any): string => {
    if (!media) return "";
    const mediaObj = media.data ? media.data.attributes || media.data : media;
    const url = mediaObj?.url || mediaObj?.formats?.medium?.url || mediaObj?.formats?.small?.url || "";
    return getStrapiMediaUrl(url);
  };

  const getMediaArray = (mediaArray: any): string[] => {
    if (!mediaArray) return [];
    const list = Array.isArray(mediaArray.data) ? mediaArray.data : Array.isArray(mediaArray) ? mediaArray : [];
    return list.map((m: any) => {
      const mediaObj = m.attributes || m;
      return getStrapiMediaUrl(mediaObj?.url || "");
    }).filter(Boolean);
  };

  return {
    id: item.documentId || item.id || attributes.slug || Math.random(),
    title: attributes.title || "Untitled Service",
    slug: attributes.slug || "",
    category: attributes.category || "Bespoke Furniture",
    shortDescription: attributes.short_description || attributes.shortDescription || "",
    description: attributes.description || "",
    iconName: attributes.icon_name || attributes.iconName || "Hammer",
    featureImage: getMediaField(attributes.feature_image || attributes.featureImage),
    bannerImage: getMediaField(attributes.banner_image || attributes.bannerImage),
    gallery: getMediaArray(attributes.gallery),
    features: Array.isArray(attributes.features) ? attributes.features : [],
    processSteps: Array.isArray(attributes.process_steps) ? attributes.process_steps : Array.isArray(attributes.processSteps) ? attributes.processSteps : [],
    isFeatured: Boolean(attributes.is_featured ?? attributes.isFeatured),
    pricingStartingFrom: attributes.pricing_starting_from || attributes.pricingStartingFrom || "",
    orderBy: attributes.order_by ?? attributes.orderBy ?? 0,
    isActive: attributes.is_active ?? attributes.isActive ?? true,
  };
}

/**
 * Layer 1: Fetch all services from Strapi API
 */
export async function getServicesFromAPI(): Promise<ServiceItem[]> {
  try {
    const { data, error } = await fetchStrapiAPI<any[]>("/services?populate=*&sort=order_by:asc", {
      tags: ["services"],
      revalidate: 60,
    });

    if (error || !data || !Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data.map(normalizeStrapiService);
  } catch (err) {
    console.warn("[service.service.ts] Failed to fetch services from Strapi:", err);
    return [];
  }
}

/**
 * Layer 1: Fetch single service by slug from Strapi API
 */
export async function getServiceBySlugFromAPI(slug: string): Promise<ServiceItem | null> {
  try {
    const { data, error } = await fetchStrapiAPI<any[]>(`/services?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`, {
      tags: [`service-${slug}`],
      revalidate: 60,
    });

    if (error || !data || !Array.isArray(data) || data.length === 0) {
      return null;
    }

    return normalizeStrapiService(data[0]);
  } catch (err) {
    console.warn(`[service.service.ts] Failed to fetch service slug '${slug}':`, err);
    return null;
  }
}
