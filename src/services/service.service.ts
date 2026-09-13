/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchStrapiAPI, getStrapiMediaUrl } from "./strapi";
import { ServiceItem, ServiceCategoryItem } from "@/types/service";

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

  // Extract category from either relation or legacy string
  const serviceCategoryObj = attributes.service_category?.data?.attributes || attributes.service_category || null;
  const categoryName = serviceCategoryObj?.name || attributes.category || "Bespoke Furniture";

  // Normalize repeatable components or legacy json
  const rawFeatures = attributes.features || [];
  const features: string[] = Array.isArray(rawFeatures)
    ? rawFeatures.map((f: any) => (typeof f === "string" ? f : f?.text || f?.title || "")).filter(Boolean)
    : [];

  const rawSteps = attributes.process_steps || attributes.processSteps || [];
  const processSteps = Array.isArray(rawSteps)
    ? rawSteps.map((s: any, idx: number) => ({
        step: s?.step ?? idx + 1,
        title: s?.title || `Step ${idx + 1}`,
        description: s?.description || "",
        duration: s?.duration || "",
      }))
    : [];

  const rawSpecs = attributes.specifications || [];
  const specifications = Array.isArray(rawSpecs)
    ? rawSpecs
        .map((sp: any) => ({
          label: sp?.label || "",
          value: sp?.value || "",
        }))
        .filter((sp: any) => sp.label && sp.value)
    : [];

  const mainImage = getMediaField(attributes.feature_image || attributes.featureImage || attributes.banner_image || attributes.bannerImage);

  return {
    id: item.documentId || item.id || attributes.slug || Math.random(),
    title: attributes.title || "Untitled Service",
    slug: attributes.slug || "",
    category: categoryName,
    serviceCategory: serviceCategoryObj
      ? {
          id: attributes.service_category?.id || 0,
          name: serviceCategoryObj.name,
          slug: serviceCategoryObj.slug,
          description: serviceCategoryObj.description,
          orderBy: serviceCategoryObj.order_by ?? 0,
          isActive: serviceCategoryObj.is_active ?? true,
        }
      : undefined,
    shortDescription: attributes.short_description || attributes.shortDescription || "",
    description: attributes.description || "",
    iconName: attributes.icon_name || attributes.iconName || "Hammer",
    featureImage: mainImage,
    bannerImage: mainImage,
    gallery: getMediaArray(attributes.gallery),
    features,
    processSteps,
    specifications,
    highlight1Title: attributes.highlight_1_title || "Certified Craftsmanship",
    highlight1Subtitle: attributes.highlight_1_subtitle || "5-Year Structural Guarantee",
    highlight2Title: attributes.highlight_2_title || "Fast Turnaround",
    highlight2Subtitle: attributes.highlight_2_subtitle || attributes.duration || "14-21 Working Days",
    duration: attributes.duration || attributes.highlight_2_subtitle || "14-21 Working Days",
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
    const { data, error } = await fetchStrapiAPI<any[]>(
      `/services?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
      {
        tags: [`service-${slug}`],
        revalidate: 60,
      }
    );

    if (error || !data || !Array.isArray(data) || data.length === 0) {
      return null;
    }

    return normalizeStrapiService(data[0]);
  } catch (err) {
    console.warn(`[service.service.ts] Failed to fetch service slug '${slug}':`, err);
    return null;
  }
}

/**
 * Layer 1: Fetch all service categories from Strapi API
 */
export async function getServiceCategoriesFromAPI(): Promise<ServiceCategoryItem[]> {
  try {
    const { data, error } = await fetchStrapiAPI<any[]>("/service-categories?sort=order_by:asc", {
      tags: ["service-categories"],
      revalidate: 60,
    });

    if (error || !data || !Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data.map((item: any) => {
      const attrs = item.attributes || item;
      return {
        id: item.documentId || item.id,
        name: attrs.name,
        slug: attrs.slug,
        description: attrs.description || "",
        orderBy: attrs.order_by ?? 0,
        isActive: attrs.is_active ?? true,
      };
    });
  } catch (err) {
    console.warn("[service.service.ts] Failed to fetch service categories:", err);
    return [];
  }
}
