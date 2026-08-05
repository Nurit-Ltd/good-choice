/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchStrapiAPI, getStrapiMediaUrl } from './strapi';

export interface ContactPageData {
  headerTitle: string;
  headerSubtitle: string;
  headerBannerUrl?: string;
  addressTitle: string;
  addressLine: string;
  supportEmail: string;
  supportPhone: string;
  whatsappPhone: string;
  businessHours: string;
  latitude: number;
  longitude: number;
  mapZoom: number;
}

const DEFAULT_CONTACT_DATA: ContactPageData = {
  headerTitle: 'Contact Us',
  headerSubtitle: 'Have a question or custom design request? Our interior advisors are here to help.',
  addressTitle: 'Experience Center',
  addressLine: 'C.R. No:82686, Muaither, Umm Al Dome St, Doha, Qatar, Ar Rayyan',
  supportEmail: 'goodchoicefurniture@gmail.com',
  supportPhone: '1234-5678',
  whatsappPhone: '1234-5678',
  businessHours: 'Saturday – Thursday (10:00 AM – 8:00 PM)',
  latitude: 25.275,
  longitude: 51.428,
  mapZoom: 14,
};

/**
 * Layer 1 Service for Contact Us Page
 * Endpoint: /contact-page?populate=*
 */
export async function getContactPageData(): Promise<ContactPageData> {
  const { data, error } = await fetchStrapiAPI<any>('/contact-page?populate=*', {
    tags: ['contact-page'],
  });

  if (error || !data) {
    return DEFAULT_CONTACT_DATA;
  }

  const attrs = data.attributes || data;

  return {
    headerTitle: attrs.header_title || DEFAULT_CONTACT_DATA.headerTitle,
    headerSubtitle: attrs.header_subtitle || DEFAULT_CONTACT_DATA.headerSubtitle,
    headerBannerUrl: attrs.header_banner?.url ? getStrapiMediaUrl(attrs.header_banner.url) : undefined,
    addressTitle: attrs.address_title || DEFAULT_CONTACT_DATA.addressTitle,
    addressLine: attrs.address_line || DEFAULT_CONTACT_DATA.addressLine,
    supportEmail: attrs.support_email || DEFAULT_CONTACT_DATA.supportEmail,
    supportPhone: attrs.support_phone || DEFAULT_CONTACT_DATA.supportPhone,
    whatsappPhone: attrs.whatsapp_phone || attrs.whatsapp_number || DEFAULT_CONTACT_DATA.whatsappPhone,
    businessHours: attrs.business_hours || DEFAULT_CONTACT_DATA.businessHours,
    latitude: Number(attrs.latitude) || DEFAULT_CONTACT_DATA.latitude,
    longitude: Number(attrs.longitude) || DEFAULT_CONTACT_DATA.longitude,
    mapZoom: Number(attrs.map_zoom) || DEFAULT_CONTACT_DATA.mapZoom,
  };
}
