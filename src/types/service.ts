export type ServiceCategory =
  | "Bespoke Furniture"
  | "Interior Design"
  | "Restoration & Repair"
  | "Architectural Millwork"
  | "Commercial & Office";

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
  shortDescription: string;
  description: string;
  iconName?: string;
  featureImage: string;
  bannerImage?: string;
  gallery?: string[];
  features: string[];
  processSteps: ProcessStep[];
  specifications?: ServiceSpecification[];
  isFeatured: boolean;
  pricingStartingFrom?: string;
  orderBy?: number;
  isActive?: boolean;
}
