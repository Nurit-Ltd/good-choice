/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchStrapiAPI, getStrapiMediaUrl } from './strapi';

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  navbarLogoUrl: string;
  footerLogoUrl: string;
  announcementText: string;
  supportPhone: string;
  whatsappNumber: string;
  whatsappUrl: string;
  supportEmail: string;
  address: string;
  copyrightText: string;
  footerBio: string;
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
  logoUrl: '/icons/logo.svg',
  navbarLogoUrl: '/icons/logo.svg',
  footerLogoUrl: '/icons/logo.svg',
  announcementText: '✨ Express Shipping Available Across Bangladesh | Free Delivery on Orders Over ৳25,000',
  supportPhone: '+880 1700-000000',
  whatsappNumber: '8801700000000',
  whatsappUrl: 'https://wa.me/8801700000000',
  supportEmail: 'support@goodchoice.com',
  address: 'Gulshan 2, Dhaka, Bangladesh',
  copyrightText: '© 2026 Good Choice Furniture. All rights reserved.',
  footerBio: 'Good Choice Furniture — Scandinavian minimalist design and luxury curved furniture crafted with premium materials.',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
};

/**
 * Layer 1 Site Settings Fetcher with On-Demand ISR Tag Caching
 * Endpoint: /site-setting?populate=*
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await fetchStrapiAPI<any>('/site-setting?populate=*', {
    tags: ['global-settings'],
  });

  if (error || !data) {
    return DEFAULT_SETTINGS;
  }

  const attrs = data.attributes || data;
  const whatsappNum = attrs.whatsapp_number || attrs.support_phone?.replace(/[^\d]/g, '') || DEFAULT_SETTINGS.whatsappNumber;

  return {
    siteName: attrs.site_name || DEFAULT_SETTINGS.siteName,
    tagline: attrs.tagline || DEFAULT_SETTINGS.tagline,
    logoUrl: attrs.navbar_logo?.url ? getStrapiMediaUrl(attrs.navbar_logo.url) : DEFAULT_SETTINGS.logoUrl,
    navbarLogoUrl: attrs.navbar_logo?.url ? getStrapiMediaUrl(attrs.navbar_logo.url) : DEFAULT_SETTINGS.navbarLogoUrl,
    footerLogoUrl: attrs.footer_logo?.url ? getStrapiMediaUrl(attrs.footer_logo.url) : DEFAULT_SETTINGS.footerLogoUrl,
    announcementText: attrs.announcement_text || DEFAULT_SETTINGS.announcementText,
    supportPhone: attrs.support_phone || DEFAULT_SETTINGS.supportPhone,
    whatsappNumber: whatsappNum,
    whatsappUrl: `https://wa.me/${whatsappNum}`,
    supportEmail: attrs.support_email || DEFAULT_SETTINGS.supportEmail,
    address: attrs.address || DEFAULT_SETTINGS.address,
    copyrightText: attrs.copyright_text || DEFAULT_SETTINGS.copyrightText,
    footerBio: attrs.footer_bio || DEFAULT_SETTINGS.footerBio,
    socialLinks: attrs.social_links || DEFAULT_SETTINGS.socialLinks,
  };
}
