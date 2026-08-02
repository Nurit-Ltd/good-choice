import { fetchStrapiAPI, getStrapiMediaUrl } from './strapi';
import { Product } from '@/types/product';
import { getProducts } from './productService';

export interface BannerSlide {
  id: string | number;
  image: string;
  alt: string;
}

export interface HomeBannerData {
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

export interface ExperienceItemData {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FaqItemData {
  id: string;
  question: string;
  answer: string;
}

export interface HomePageData {
  banner: HomeBannerData;
  shopByRoom: {
    title: string;
    subtitle: string;
    items: RoomItemData[];
  };
  craftsmanship: CraftsmanshipData;
  recentlyCrafted: {
    title: string;
    products: Product[];
  };
  collections: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonHref: string;
    items: CollectionItemData[];
  };
  explore: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonHref: string;
    products: Product[];
  };
  experiences: {
    title: string;
    subtitle: string;
    items: ExperienceItemData[];
  };
  faq: {
    title: string;
    items: FaqItemData[];
  };
}

const DEFAULT_HOME_DATA: HomePageData = {
  banner: {
    title: 'Sculpted Simplicity',
    subtitle: 'Explore curved silhouettes and minimalist craftsmanship designed to bring warmth, balance, and quiet luxury to modern living spaces.',
    slides: [
      { id: 'slide-1', image: '/images/home/banner/banner-hero-1.webp', alt: 'Sculpted Simplicity Living Room' },
      { id: 'slide-2', image: '/images/home/banner/banner-hero-2.webp', alt: 'Modern Curved Furniture' },
      { id: 'slide-3', image: '/images/home/banner/banner-hero-3.webp', alt: 'Bespoke Interior Craftsmanship' },
    ],
  },
  shopByRoom: {
    title: 'Shop By Room',
    subtitle: 'Bespoke furniture designed with premium materials, timeless aesthetics, and precision craftsmanship for refined modern interiors.',
    items: [
      { id: '1', title: 'Living Room', image: '/images/home/room/room-1.png', href: '/products?category=Living%20Room' },
      { id: '2', title: 'Dining Room', image: '/images/home/room/room-2.png', href: '/products?category=Dining%20Room' },
      { id: '3', title: 'Bed Room', image: '/images/home/room/room-3.png', href: '/products?category=Beds' },
      { id: '4', title: 'Study Room', image: '/images/home/room/room-4.png', href: '/products?category=Wardrobes' },
      { id: '5', title: 'Kitchen & Bar', image: '/images/home/room/room-1.png', href: '/products?category=Dining%20Room' },
      { id: '6', title: 'Outdoor Lounge', image: '/images/home/room/room-2.png', href: '/products?category=Outdoor' },
    ],
  },
  craftsmanship: {
    leftTitle: 'The Art of\nFurniture Making',
    leftParagraphs: [
      'Every Good Choice Furniture piece begins with a simple belief: exceptional furniture requires exceptional care. Our artisans spend years perfecting their craft, ensuring that each table, chair, and cabinet meets the exacting standards that have defined Scandinavian design for generations.',
      'The result? Furniture that improves with age, grows more beautiful with time, and becomes an integral part of your home\'s story.',
    ],
    leftImage: '/images/home/furniture-made-process/art-furniture.webp',
    rightTitle: 'Made with Care for a\nCleaner Future',
    rightParagraphs: [
      'At Good Choice Furniture, we prioritize eco-friendly materials and ethical production practices in every aspect of our business. Our unwavering commitment to sustainability ensures that every piece of furniture we create is made with a sense of responsibility towards the environment.',
      'We believe that our choices impact the planet, and we strive to make a positive difference through our high-quality designs.',
    ],
    rightImage: '/images/home/furniture-made-process/made-furniture.webp',
  },
  recentlyCrafted: {
    title: 'Recently Crafted',
    products: [],
  },
  collections: {
    title: 'Grand Atelier\nFurniture\nCollection',
    subtitle: 'Collections',
    buttonText: 'Browse Collections',
    buttonHref: '/products',
    items: [
      { id: 'col-1', name: 'Alcoroque', image: '/images/home/collections/collection-1.png', href: '/products?collection=alcoroque-1' },
      { id: 'col-2', name: 'Alcoroque', image: '/images/home/collections/collection-2.png', href: '/products?collection=alcoroque-2' },
      { id: 'col-3', name: 'Alcoroque', image: '/images/home/collections/collection-3.png', href: '/products?collection=alcoroque-3' },
      { id: 'col-4', name: 'Gauguin', image: '/images/home/collections/collection-1.png', href: '/products?collection=gauguin' },
    ],
  },
  explore: {
    title: 'Explore Elevated Living\nEssentials',
    subtitle: 'Curated furniture pieces blending refined design, premium materials, and exceptional comfort to elevate everyday living beautifully.',
    buttonText: 'Browse All',
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
  // Fetch dynamic products for home sections
  const products = await getProducts();

  // Try fetching hero banners from Strapi
  const { data: heroBanners } = await fetchStrapiAPI<Array<{ id: number; title: string; image: { url: string } }>>('/hero-banners?populate=*', {
    tags: ['home-page', 'hero-banners'],
  });

  const parsedBanners: BannerSlide[] = (heroBanners && Array.isArray(heroBanners) && heroBanners.length > 0)
    ? heroBanners.map((b, idx) => ({
        id: b.id || `slide-${idx}`,
        image: getStrapiMediaUrl(b.image?.url),
        alt: b.title || 'Home Banner',
      }))
    : DEFAULT_HOME_DATA.banner.slides;

  return {
    ...DEFAULT_HOME_DATA,
    banner: {
      ...DEFAULT_HOME_DATA.banner,
      slides: parsedBanners,
    },
    recentlyCrafted: {
      title: DEFAULT_HOME_DATA.recentlyCrafted.title,
      products: products.slice(0, 12),
    },
    explore: {
      ...DEFAULT_HOME_DATA.explore,
      products: products.slice(0, 8),
    },
  };
}
