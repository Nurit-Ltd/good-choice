import { fetchStrapiAPI } from './strapi';

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  announcementText: string;
  supportPhone: string;
  supportEmail: string;
  address: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'Good Choice Furniture',
  tagline: 'Modern Curved Furniture & Minimalist Interiors',
  logoUrl: '/images/logo.png',
  announcementText: '✨ Express Shipping Available Across Bangladesh | Free Delivery on Orders Over ৳25,000',
  supportPhone: '+880 1700-000000',
  supportEmail: 'support@goodchoice.com',
  address: 'Gulshan 2, Dhaka, Bangladesh',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await fetchStrapiAPI<Partial<SiteSettings>>('/settings', {
    tags: ['global-settings'],
  });

  if (error || !data) {
    return DEFAULT_SETTINGS;
  }

  return {
    ...DEFAULT_SETTINGS,
    ...data,
  };
}
