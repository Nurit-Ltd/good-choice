/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchStrapiAPI, getStrapiMediaUrl } from './strapi';

export interface AboutStatItem {
  value: string;
  label: string;
}

export interface AboutApproachItem {
  title: string;
  description: string;
  iconName?: string;
}

export interface AboutPageData {
  heroTitle: string;
  heroSubtitle: string;
  heroBanner: string;
  heroImages: string[];
  descriptionTitle: string;
  descriptionContent: string;
  stats: AboutStatItem[];
  handcraftTitle: string;
  handcraftSubtitle: string;
  handcraftImage1: string;
  handcraftImage2: string;
  approachTitle: string;
  approachItems: AboutApproachItem[];
  visionaryQuote: string;
  visionaryAuthorName: string;
  visionaryAuthorRole: string;
  visionaryAuthorPhoto: string;
  metaTitle?: string;
  metaDescription?: string;
}

const DEFAULT_ABOUT_DATA: AboutPageData = {
  heroTitle: 'Luxury Shaped by Timeless Design',
  heroSubtitle: 'Our creations embody refined aesthetics, meticulous craftsmanship, and enduring quality, thoughtfully designed for elevated modern lifestyles.',
  heroBanner: '/images/about/hero/ah-1.jpg',
  heroImages: [
    '/images/about/hero/ah-1.jpg',
    '/images/about/hero/ah-2.jpg',
    '/images/about/hero/ah-3.png',
    '/images/about/hero/ah-4.png',
  ],
  descriptionTitle: 'Our Philosophy',
  descriptionContent:
    'At Good Choice Furniture, we believe your space should be an oasis of comfort, elegance, and quiet luxury. Every piece of furniture in our atelier is sculpted with care, utilizing eco-certified timbers, high-resilience foam, and custom tactile fabrics.\n\nOur master craftsmen combine traditional joinery with modern ergonomics to build pieces that are made to last generations.',
  stats: [
    { value: '15+', label: 'Years of Atelier Excellence' },
    { value: '120+', label: 'Bespoke Furniture Designs' },
    { value: '4.9/5', label: 'Client Satisfaction Rating' },
    { value: '100%', label: 'Sustainably Sourced Timber' },
  ],
  handcraftTitle: 'Handcrafted Perfection',
  handcraftSubtitle: 'Every joint, curved armrest, and hand-stitched seam reflects our unwavering dedication to uncompromising quality.',
  handcraftImage1: '/images/home/furniture-made-process/art-furniture.webp',
  handcraftImage2: '/images/home/furniture-made-process/made-furniture.webp',
  approachTitle: 'Our Approach to Luxury',
  approachItems: [
    {
      title: 'Ergonomic Sculpting',
      description: 'Precision-contoured silhouettes engineered for flawless posture support and unparalleled seating comfort.',
    },
    {
      title: 'Eco-Certified Hardwoods',
      description: 'Responsibly harvested kiln-dried timber frames built for decades of structural stability.',
    },
    {
      title: 'Tactile Textile Selection',
      description: 'Curated bouclés, textured linens, and stain-resistant velvets imported from premier European mills.',
    },
  ],
  visionaryQuote: 'Furniture should not just occupy space; it should breathe life, harmony, and timeless elegance into your daily living.',
  visionaryAuthorName: 'Alexander V. Lindqvist',
  visionaryAuthorRole: 'Founder & Principal Craftsman',
  visionaryAuthorPhoto: '/images/about/hero/ah-1.jpg',
};

/**
 * Layer 1 About Page Fetcher with On-Demand ISR Tag Caching
 * Endpoint: /about-page?populate=*
 */
export async function getAboutPageData(): Promise<AboutPageData> {
  const { data, error } = await fetchStrapiAPI<any>('/about-page?populate=*', {
    tags: ['about-page'],
  });

  if (error || !data) {
    return DEFAULT_ABOUT_DATA;
  }

  const attrs = data.attributes || data;

  return {
    heroTitle: attrs.hero_title || DEFAULT_ABOUT_DATA.heroTitle,
    heroSubtitle: attrs.hero_subtitle || DEFAULT_ABOUT_DATA.heroSubtitle,
    heroBanner: attrs.hero_banner?.url ? getStrapiMediaUrl(attrs.hero_banner.url) : DEFAULT_ABOUT_DATA.heroBanner,
    heroImages: Array.isArray(attrs.hero_images) && attrs.hero_images.length > 0
      ? attrs.hero_images.map((img: any) => getStrapiMediaUrl(img.url))
      : DEFAULT_ABOUT_DATA.heroImages,
    descriptionTitle: attrs.description_title || DEFAULT_ABOUT_DATA.descriptionTitle,
    descriptionContent: attrs.description_content || DEFAULT_ABOUT_DATA.descriptionContent,
    stats: Array.isArray(attrs.stats) && attrs.stats.length > 0 ? attrs.stats : DEFAULT_ABOUT_DATA.stats,
    handcraftTitle: attrs.handcraft_title || DEFAULT_ABOUT_DATA.handcraftTitle,
    handcraftSubtitle: attrs.handcraft_subtitle || DEFAULT_ABOUT_DATA.handcraftSubtitle,
    handcraftImage1: attrs.handcraft_image_1?.url
      ? getStrapiMediaUrl(attrs.handcraft_image_1.url)
      : DEFAULT_ABOUT_DATA.handcraftImage1,
    handcraftImage2: attrs.handcraft_image_2?.url
      ? getStrapiMediaUrl(attrs.handcraft_image_2.url)
      : DEFAULT_ABOUT_DATA.handcraftImage2,
    approachTitle: attrs.approach_title || DEFAULT_ABOUT_DATA.approachTitle,
    approachItems:
      Array.isArray(attrs.approach_items) && attrs.approach_items.length > 0
        ? attrs.approach_items
        : DEFAULT_ABOUT_DATA.approachItems,
    visionaryQuote: attrs.visionary_quote || DEFAULT_ABOUT_DATA.visionaryQuote,
    visionaryAuthorName: attrs.visionary_author_name || DEFAULT_ABOUT_DATA.visionaryAuthorName,
    visionaryAuthorRole: attrs.visionary_author_role || DEFAULT_ABOUT_DATA.visionaryAuthorRole,
    visionaryAuthorPhoto: attrs.visionary_author_photo?.url
      ? getStrapiMediaUrl(attrs.visionary_author_photo.url)
      : DEFAULT_ABOUT_DATA.visionaryAuthorPhoto,
    metaTitle: attrs.seo?.metaTitle,
    metaDescription: attrs.seo?.metaDescription,
  };
}
