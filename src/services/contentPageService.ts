/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchStrapiAPI } from './strapi';

export interface ContentPageData {
  title: string;
  slug: string;
  subtitle?: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  updatedAt?: string;
}

const DEFAULT_PAGES: Record<string, ContentPageData> = {
  about: {
    title: 'About Good Choice Furniture',
    slug: 'about',
    subtitle: 'Crafting luxury curved furniture & Scandinavian minimalist interiors since 2018.',
    content: `
# Our Philosophy
At Good Choice Furniture, we believe your space should be an oasis of comfort, elegance, and quiet luxury. Every piece of furniture in our atelier is sculpted with care, utilizing eco-certified timbers, high-resilience foam, and custom tactile fabrics.

## Handcrafted Excellence
Our master craftsmen combine traditional joinery with modern ergonomics to build pieces that are made to last generations.
    `,
  },
  contact: {
    title: 'Get in Touch',
    slug: 'contact',
    subtitle: 'Have a question or custom design request? Our interior advisors are here to help.',
    content: `
### Visit Our Experience Center
**Address**: House 12, Road 45, Gulshan 2, Dhaka, Bangladesh  
**Email**: support@goodchoice.com  
**Phone**: +880 1700-000000  

**Operating Hours**: Saturday – Thursday (10:00 AM – 8:00 PM)
    `,
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    subtitle: 'Your privacy and data protection are fundamental to our business.',
    content: `
### Information Collection
We collect information required to process your order, provide delivery updates, and personalize your shopping experience. We never sell or share your personal details with third-party marketers.
    `,
  },
  terms: {
    title: 'Terms & Conditions',
    slug: 'terms',
    subtitle: 'Please review our terms governing purchases, warranties, and delivery.',
    content: `
### Standard Warranty
All bespoke furniture pieces include a 5-year structural framework warranty. Normal wear and fabric aging are excluded.
    `,
  },
  'terms-and-conditions': {
    title: 'Terms and Conditions',
    slug: 'terms-and-conditions',
    subtitle: 'Detailed terms governing online purchases and delivery policies.',
    content: `
### Delivery & Assembly
We provide white-glove inside-home delivery and assembly across Dhaka and major divisional cities in Bangladesh.
    `,
  },
};

/**
 * Layer 1 Content Page Fetcher with On-Demand ISR Tag Caching
 */
export async function getContentPageBySlug(slug: string): Promise<ContentPageData> {
  const normalizedSlug = slug.toLowerCase().trim();

  const { data, error } = await fetchStrapiAPI<any>(`/pages?filters[slug][$eq]=${encodeURIComponent(normalizedSlug)}`, {
    tags: ['legal-pages', `page-${normalizedSlug}`],
  });

  if (error || !data) {
    return DEFAULT_PAGES[normalizedSlug] || {
      title: normalizedSlug.replace(/-/g, ' ').toUpperCase(),
      slug: normalizedSlug,
      content: 'Content coming soon.',
    };
  }

  const items = Array.isArray(data) ? data : (data as any)?.data || [];
  if (items.length === 0) {
    return DEFAULT_PAGES[normalizedSlug] || {
      title: normalizedSlug.replace(/-/g, ' ').toUpperCase(),
      slug: normalizedSlug,
      content: 'Content coming soon.',
    };
  }

  const item = items[0];
  const attrs = item.attributes || item;

  return {
    title: attrs.title || normalizedSlug,
    slug: attrs.slug || normalizedSlug,
    subtitle: attrs.subtitle || '',
    content: attrs.content || attrs.body || '',
    metaTitle: attrs.seo?.metaTitle,
    metaDescription: attrs.seo?.metaDescription,
    updatedAt: attrs.updatedAt,
  };
}
