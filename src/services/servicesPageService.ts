/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchStrapiAPI } from './strapi';
import { ServicesPageData } from '@/types/service';

export const DEFAULT_SERVICES_PAGE_DATA: ServicesPageData = {
  headerTitle: 'Our Craftsmanship & Services',
  catalogTitle: 'All Craftsmanship Offerings',
  detailSwitcherTitle: 'Explore All Craftsmanship Services',
  workflowBadgeText: 'Step-by-Step Workflow',
  workflowSectionTitle: 'How We Deliver Service Excellence',
  workflowSectionSubtitle: 'Click on any step below to explore our meticulous quality control timeline.',
  featuresSectionTitle: 'Service Features & Quality Commitments',
  specificationsSectionTitle: 'Technical Specifications & Standards',
  gallerySectionTitle: 'Completed Project Showcase',
  relatedBadgeText: 'Explore Complementary Offerings',
  relatedSectionTitle: 'Related Craftsmanship Services',
  consultationButtonText: 'Request Custom Consultation',
  whatsappInquiryButtonText: 'WhatsApp Inquiry',
  metaTitle: 'Bespoke Furniture & Craftsmanship Services | Good Choice',
  metaDescription: 'Explore bespoke woodworking, 3D spatial interior planning, fine upholstery tailoring, and antique furniture restoration care by Good Choice Furniture.',
};

/**
 * Layer 1 Services Page Fetcher with On-Demand ISR Tag Caching
 * Endpoint: /services-page?populate=*
 */
export async function getServicesPageData(): Promise<ServicesPageData> {
  try {
    const { data, error } = await fetchStrapiAPI<any>('/services-page?populate=*', {
      tags: ['services-page'],
      revalidate: 60,
    });

    if (error || !data) {
      return DEFAULT_SERVICES_PAGE_DATA;
    }

    const attrs = data.attributes || data;

    return {
      headerTitle: attrs.header_title || DEFAULT_SERVICES_PAGE_DATA.headerTitle,
      catalogTitle: attrs.catalog_title || DEFAULT_SERVICES_PAGE_DATA.catalogTitle,
      detailSwitcherTitle: attrs.detail_switcher_title || DEFAULT_SERVICES_PAGE_DATA.detailSwitcherTitle,
      workflowBadgeText: attrs.workflow_badge_text || DEFAULT_SERVICES_PAGE_DATA.workflowBadgeText,
      workflowSectionTitle: attrs.workflow_section_title || DEFAULT_SERVICES_PAGE_DATA.workflowSectionTitle,
      workflowSectionSubtitle: attrs.workflow_section_subtitle || DEFAULT_SERVICES_PAGE_DATA.workflowSectionSubtitle,
      featuresSectionTitle: attrs.features_section_title || DEFAULT_SERVICES_PAGE_DATA.featuresSectionTitle,
      specificationsSectionTitle: attrs.specifications_section_title || DEFAULT_SERVICES_PAGE_DATA.specificationsSectionTitle,
      gallerySectionTitle: attrs.gallery_section_title || DEFAULT_SERVICES_PAGE_DATA.gallerySectionTitle,
      relatedBadgeText: attrs.related_badge_text || DEFAULT_SERVICES_PAGE_DATA.relatedBadgeText,
      relatedSectionTitle: attrs.related_section_title || DEFAULT_SERVICES_PAGE_DATA.relatedSectionTitle,
      consultationButtonText: attrs.consultation_button_text || DEFAULT_SERVICES_PAGE_DATA.consultationButtonText,
      whatsappInquiryButtonText: attrs.whatsapp_inquiry_button_text || DEFAULT_SERVICES_PAGE_DATA.whatsappInquiryButtonText,
      metaTitle: attrs.seo?.metaTitle || DEFAULT_SERVICES_PAGE_DATA.metaTitle,
      metaDescription: attrs.seo?.metaDescription || DEFAULT_SERVICES_PAGE_DATA.metaDescription,
    };
  } catch (err) {
    console.warn('[servicesPageService.ts] Failed to fetch services page data:', err);
    return DEFAULT_SERVICES_PAGE_DATA;
  }
}
