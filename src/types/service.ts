export type ServiceCategory = string;

export interface ServiceCategoryItem {
  id: string | number;
  name: string;
  slug: string;
  description?: string;
  orderBy?: number;
  isActive?: boolean;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration?: string;
}

export interface ServiceSpecification {
  label: string;
  value: string;
}

export interface ServiceItem {
  id: string | number;
  title: string;
  slug: string;
  category: ServiceCategory;
  serviceCategory?: ServiceCategoryItem;
  shortDescription: string;
  description: string;
  iconName?: string;
  featureImage: string;
  bannerImage?: string;
  gallery?: string[];
  features: string[];
  processSteps: ProcessStep[];
  specifications?: ServiceSpecification[];
  highlight1Title?: string;
  highlight1Subtitle?: string;
  highlight2Title?: string;
  highlight2Subtitle?: string;
  duration?: string;
  isFeatured: boolean;
  pricingStartingFrom?: string;
  orderBy?: number;
  isActive?: boolean;
}

export interface ServicesPageData {
  headerTitle: string;
  catalogTitle: string;
  detailSwitcherTitle: string;
  workflowBadgeText: string;
  workflowSectionTitle: string;
  workflowSectionSubtitle: string;
  featuresSectionTitle: string;
  specificationsSectionTitle: string;
  gallerySectionTitle: string;
  relatedBadgeText: string;
  relatedSectionTitle: string;
  consultationButtonText: string;
  whatsappInquiryButtonText: string;
  metaTitle?: string;
  metaDescription?: string;
}
