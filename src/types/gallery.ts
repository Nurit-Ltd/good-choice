export type GalleryCategory =
  | "Luxury Sofas"
  | "Arabic Majlis"
  | "Beds & Headboards"
  | "Dining & Tables"
  | "Lighting & Decor"
  | "Restoration & Repair"
  | "Commercial Fitting";

export type ImageAspectRatio = "tall" | "portrait" | "square" | "landscape";

export interface GalleryItem {
  id: string | number;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  aspectRatio: ImageAspectRatio;
  width: number;
  height: number;
  description?: string;
  tags?: string[];
  serviceSlug?: string;
  isFeatured?: boolean;
}
