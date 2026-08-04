/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchStrapiAPI, getStrapiMediaUrl } from './strapi';

export interface FooterSectionLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterSectionLink[];
}

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
  storeAddress: string;
  storeMapsUrl: string;
  copyrightText: string;
  footerBio: string;
  socialLinks: {
    whatsapp?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  footerSections: FooterSection[];
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'Good Choice Furniture',
  tagline: 'Modern Curved Furniture & Minimalist Interiors',
  logoUrl: '/icons/logo.svg',
  navbarLogoUrl: '/icons/logo.svg',
  footerLogoUrl: '/icons/logo.svg',
  announcementText: '✨ Express Shipping Available Across Bangladesh | Free Delivery on Orders Over ৳25,000',
  supportPhone: '123456789',
  whatsappNumber: '8801700000000',
  whatsappUrl: 'https://wa.me/974123456789',
  supportEmail: 'goodchoiceno1@gmail.com',
  address: 'C.R. No:82686, Muaither, Umm Al Dome St, Doha, Qatar, Ar Rayyan',
  storeAddress: 'C.R. No:82686, Muaither, Umm Al Dome St, Doha, Qatar, Ar Rayyan',
  storeMapsUrl: 'https://maps.google.com/?q=Muaither+Umm+Al+Dome+St+Doha+Qatar',
  copyrightText: '© 2026 Good Choice Furniture. All rights reserved.',
  footerBio: 'Good Choice Furniture — Scandinavian minimalist design and luxury curved furniture crafted with premium materials.',
  socialLinks: {
    whatsapp: 'https://wa.me/974123456789',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  footerSections: [
    {
      title: 'Services 1',
      links: [
        { label: 'New Sofa Making', href: '/products?category=Chairs' },
        { label: 'Arabic Majlis Making', href: '/products?category=Beds' },
        { label: 'Dining Table Making', href: '/products?category=Dining%20Room' },
        { label: 'Dressing Mirror Making', href: '/products?category=Home%20Decor' },
      ],
    },
    {
      title: 'Services 2',
      links: [
        { label: 'Sofa & Chair Upholstery', href: '/products?category=Chairs' },
        { label: 'Curtain Installation', href: '/products?category=Home%20Decor' },
        { label: 'Bed/Head Box', href: '/products?category=Beds' },
        { label: 'Blind Installation', href: '/products?category=Home%20Decor' },
      ],
    },
    {
      title: 'Services 3',
      links: [
        { label: 'Wallpaper Installation', href: '/products?category=Home%20Decor' },
        { label: 'Cabinet/Cupboard Installation', href: '/products?category=Wardrobes' },
        { label: 'Barkiya PVC', href: '/products?category=Home%20Decor' },
      ],
    },
  ],
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
    whatsappUrl: attrs.social_links?.whatsapp || `https://wa.me/${whatsappNum}`,
    supportEmail: attrs.support_email || DEFAULT_SETTINGS.supportEmail,
    address: attrs.store_address || attrs.address || DEFAULT_SETTINGS.address,
    storeAddress: attrs.store_address || DEFAULT_SETTINGS.storeAddress,
    storeMapsUrl: attrs.store_maps_url || DEFAULT_SETTINGS.storeMapsUrl,
    copyrightText: attrs.copyright_text || DEFAULT_SETTINGS.copyrightText,
    footerBio: attrs.footer_bio || DEFAULT_SETTINGS.footerBio,
    socialLinks: attrs.social_links || DEFAULT_SETTINGS.socialLinks,
    footerSections: Array.isArray(attrs.footer_sections) && attrs.footer_sections.length > 0
      ? attrs.footer_sections
      : DEFAULT_SETTINGS.footerSections,
  };
}
