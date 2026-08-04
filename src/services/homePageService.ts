/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchStrapiAPI, getStrapiMediaUrl } from '@/services/strapi';
import { getProducts } from '@/services/productService';
import { Product } from '@/types/product';

export interface BannerSlide {
  id: string;
  image: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

export interface HeroBannerData {
  title: string;
  subtitle: string;
  slides: BannerSlide[];
}

export interface RoomItemData {
  id: string;
  title: string;
  image: string;
  href: string;
}

export interface ShopByRoomData {
  title: string;
  subtitle: string;
  items: RoomItemData[];
}

export interface CraftsmanshipData {
  leftTitle: string;
  leftParagraphs: string[];
  leftImage: string;
  rightTitle: string;
  rightParagraphs: string[];
  rightImage: string;
}

export interface CollectionItemData {
  id: string;
  name: string;
  image: string;
  href: string;
}

export interface CollectionsData {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  backgroundImage: string;
  items: CollectionItemData[];
}

export interface ExperienceItemData {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ExperiencesData {
  title: string;
  subtitle: string;
  items: ExperienceItemData[];
}

export interface FaqItemData {
  id: string;
  question: string;
  answer: string;
}

export interface FaqData {
  title: string;
  items: FaqItemData[];
}

export interface HomePageData {
  banner: HeroBannerData;
  shopByRoom: ShopByRoomData;
  craftsmanship: CraftsmanshipData;
  recentlyCrafted: {
    title: string;
    products: Product[];
  };
  collections: CollectionsData;
  explore: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonHref: string;
    products: Product[];
  };
  experiences: ExperiencesData;
  faq: FaqData;
}

export const DEFAULT_HOME_DATA: HomePageData = {
  banner: {
    title: '',
    subtitle: '',
    slides: [],
  },
  shopByRoom: {
    title: '',
    subtitle: '',
    items: [],
  },
  craftsmanship: {
    leftTitle: '',
    leftParagraphs: [],
    leftImage: '',
    rightTitle: '',
    rightParagraphs: [],
    rightImage: '',
  },
  recentlyCrafted: {
    title: '',
    products: [],
  },
  collections: {
    title: '',
    subtitle: '',
    buttonText: '',
    buttonHref: '/products',
    backgroundImage: '',
    items: [],
  },
  explore: {
    title: '',
    subtitle: '',
    buttonText: '',
    buttonHref: '/products',
    products: [],
  },
  experiences: {
    title: 'Crafted Experiences for Your Home',
    subtitle: 'Delivering bespoke furniture and interior solutions meticulously designed to elevate every space with elegance, comfort, and timeless craftsmanship.',
    items: [
      { id: 'exp-sofa', title: 'New Sofa Making', description: 'Luxury sofas crafted with meticulous care, combining elegance, durability, and superior craftsmanship.', iconName: 'SofaIcon' },
      { id: 'exp-majlis', title: 'Arabic Majlis Making', description: 'Exquisitely handcrafted Arabic Majlis offering luxurious comfort, elegant design, and superior craftsmanship.', iconName: 'ArabicMajlisIcon' },
      { id: 'exp-dining', title: 'Dining Table Making', description: 'Luxury dining tables designed for sophistication, comfort, and lasting quality.', iconName: 'DiningTableIcon' },
      { id: 'exp-mirror', title: 'Dressing Mirror Making', description: 'Custom dressing mirrors designed with elegance, style, and premium craftsmanship.', iconName: 'DressingMirrorIcon' },
    ],
  },
  faq: {
    title: 'Frequently Asked\nQuestions',
    items: [
      { id: 'faq-1', question: 'What are the shipping options?', answer: 'We offer various shipping options to ensure your order arrives safely and promptly. Standard shipping typically takes 5-7 business days, while express options are available for faster delivery.' },
      { id: 'faq-2', question: 'What is your return policy?', answer: 'We accept returns within 30 days of delivery for most items in their original condition. Please contact our support team to initiate a return process.' },
      { id: 'faq-3', question: 'How do I care for bespoke furniture?', answer: 'Use a soft, dry cloth to clean dust regularly. Avoid direct exposure to harsh sunlight and liquid spills to preserve the premium wood and fabric finish.' },
      { id: 'faq-4', question: 'Do you offer warranties?', answer: 'Yes, all Good Choice bespoke furniture pieces come with a 5-year structural warranty covering materials and manufacturing craftsmanship.' },
      { id: 'faq-5', question: 'Can I track my order?', answer: 'Once your order ships, we will send a confirmation email with live tracking details and direct contact for our delivery team.' },
    ],
  },
};

/**
 * Layer 1 Home Page Fetcher with On-Demand ISR Tag Caching
 */
export async function getHomePageData(): Promise<HomePageData> {
  const products = await getProducts({ limit: 12 });

  const { data: heroBanners } = await fetchStrapiAPI<Array<any>>('/hero-banners?filters[is_active][$eq]=true&sort=order_by:asc&populate=*', {
    tags: ['home-page', 'hero-banners'],
  });

  const { data: categories } = await fetchStrapiAPI<Array<any>>('/categories?filters[is_active][$eq]=true&sort=order_by:asc&populate=*', {
    tags: ['categories'],
  });

  const { data: homeConfig } = await fetchStrapiAPI<any>('/home-page?populate=*', {
    tags: ['home-page'],
  });

  const { data: craftedExperiences } = await fetchStrapiAPI<Array<any>>('/crafted-experiences?sort=order_by:asc&populate=*', {
    tags: ['home-page', 'crafted-experiences'],
  });

  const { data: faqs } = await fetchStrapiAPI<Array<any>>('/faqs?sort=order_by:asc&populate=*', {
    tags: ['home-page', 'faqs'],
  });

  const homeAttrs = homeConfig?.attributes || homeConfig || {};

  const parsedBanners: BannerSlide[] = (heroBanners && Array.isArray(heroBanners) && heroBanners.length > 0)
    ? heroBanners.map((b: any, idx: number) => {
        const attrs = b.attributes || b;
        const rawImg = Array.isArray(attrs.banner_images) && attrs.banner_images.length > 0
          ? attrs.banner_images[0]?.url || attrs.banner_images[0]
          : attrs.image?.url || attrs.image;
        return {
          id: attrs.id || b.id || `slide-${idx}`,
          image: rawImg ? getStrapiMediaUrl(typeof rawImg === 'string' ? rawImg : rawImg?.url) : '',
          alt: attrs.title || 'Home Banner',
          title: attrs.title || '',
          subtitle: attrs.short_description || '',
        };
      })
    : [];

  const parsedCategories: RoomItemData[] = (categories && Array.isArray(categories) && categories.length > 0)
    ? categories.map((cat: any, idx: number) => {
        const attrs = cat.attributes || cat;
        const rawImg = attrs.banner_image?.url || attrs.banner_image || attrs.icon?.url || attrs.icon;
        return {
          id: String(attrs.id || cat.id || `cat-${idx}`),
          title: attrs.name || '',
          image: rawImg ? getStrapiMediaUrl(typeof rawImg === 'string' ? rawImg : rawImg?.url) : '',
          href: `/products?category=${encodeURIComponent(attrs.name || '')}`,
        };
      })
    : [];

  const parsedExperiences: ExperienceItemData[] = (craftedExperiences && Array.isArray(craftedExperiences) && craftedExperiences.length > 0)
    ? craftedExperiences.map((exp: any, idx: number) => {
        const attrs = exp.attributes || exp;
        const iconMediaUrl = attrs.icon_media?.url ? getStrapiMediaUrl(attrs.icon_media.url) : '';
        return {
          id: String(attrs.id || exp.id || `exp-${idx}`),
          title: attrs.title || '',
          description: attrs.description || '',
          iconName: iconMediaUrl || attrs.icon_name || 'SofaIcon',
        };
      })
    : [];

  const parsedFaqs: FaqItemData[] = (faqs && Array.isArray(faqs) && faqs.length > 0)
    ? faqs.map((f: any, idx: number) => {
        const attrs = f.attributes || f;
        return {
          id: String(attrs.id || f.id || `faq-${idx}`),
          question: attrs.question || '',
          answer: attrs.answer || '',
        };
      })
    : [];

  return {
    banner: {
      title: homeAttrs.hero_title || '',
      subtitle: homeAttrs.hero_subtitle || '',
      slides: parsedBanners,
    },
    shopByRoom: {
      title: homeAttrs.shop_by_room_title || '',
      subtitle: homeAttrs.shop_by_room_subtitle || '',
      items: parsedCategories,
    },
    craftsmanship: {
      leftTitle: homeAttrs.craftsmanship_left_title || '',
      leftParagraphs: Array.isArray(homeAttrs.craftsmanship_left_paragraphs) && homeAttrs.craftsmanship_left_paragraphs.length > 0
        ? homeAttrs.craftsmanship_left_paragraphs
        : [],
      leftImage: homeAttrs.craftsmanship_left_image?.url ? getStrapiMediaUrl(homeAttrs.craftsmanship_left_image.url) : '',
      rightTitle: homeAttrs.craftsmanship_right_title || '',
      rightParagraphs: Array.isArray(homeAttrs.craftsmanship_right_paragraphs) && homeAttrs.craftsmanship_right_paragraphs.length > 0
        ? homeAttrs.craftsmanship_right_paragraphs
        : [],
      rightImage: homeAttrs.craftsmanship_right_image?.url ? getStrapiMediaUrl(homeAttrs.craftsmanship_right_image.url) : '',
    },
    recentlyCrafted: {
      title: homeAttrs.recently_crafted_title || '',
      products: products.slice(0, 12),
    },
    collections: {
      title: homeAttrs.collections_title || '',
      subtitle: homeAttrs.collections_subtitle || '',
      buttonText: homeAttrs.collections_button_text || '',
      buttonHref: homeAttrs.collections_button_href || '/products',
      backgroundImage: homeAttrs.collections_background_image?.url ? getStrapiMediaUrl(homeAttrs.collections_background_image.url) : '',
      items: products.length > 0
        ? products.slice(0, 8).map((p: Product) => ({
            id: String(p.id),
            name: p.name,
            image: p.images?.[0] || '',
            href: `/products/${p.slug}`,
          }))
        : [],
    },
    explore: {
      title: homeAttrs.explore_title || '',
      subtitle: homeAttrs.explore_subtitle || '',
      buttonText: homeAttrs.explore_button_text || '',
      buttonHref: homeAttrs.explore_button_href || '/products',
      products: products.slice(0, 8),
    },
    experiences: {
      title: homeAttrs.experiences_title || DEFAULT_HOME_DATA.experiences.title,
      subtitle: homeAttrs.experiences_subtitle || DEFAULT_HOME_DATA.experiences.subtitle,
      items: parsedExperiences.length > 0 ? parsedExperiences : DEFAULT_HOME_DATA.experiences.items,
    },
    faq: {
      title: homeAttrs.faq_title || DEFAULT_HOME_DATA.faq.title,
      items: parsedFaqs.length > 0 ? parsedFaqs : DEFAULT_HOME_DATA.faq.items,
    },
  };
}

