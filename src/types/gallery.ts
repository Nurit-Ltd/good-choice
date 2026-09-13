export type GalleryCategory = string;

export type ImageAspectRatio = "tall" | "portrait" | "square" | "landscape";

export interface GalleryItem {
  id: string | number;
  title: string;
  category: string;
  imageUrl: string;
  aspectRatio: ImageAspectRatio;
  width: number;
  height: number;
  description?: string;
  tags?: string[];
  serviceTitle?: string;
  serviceSlug?: string;
  isFeatured?: boolean;
  projectIndex?: number;
}

export interface GalleryPageData {
  headerTitle: string;
  catalogTitle: string;
  searchPlaceholder: string;
  whatsappButtonText: string;
  serviceButtonText: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
}
