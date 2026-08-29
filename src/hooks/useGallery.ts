"use client";

import { useQuery } from "@tanstack/react-query";
import { GalleryItem, GalleryCategory } from "@/types/gallery";
import { MOCK_GALLERY_ITEMS } from "@/data/mock-gallery";
import { getGalleryItemsFromAPI } from "@/services/galleryService";

export const GALLERY_CATEGORIES: ("All" | GalleryCategory)[] = [
  "All",
  "Luxury Sofas",
  "Arabic Majlis",
  "Beds & Headboards",
  "Dining & Tables",
  "Lighting & Decor",
  "Restoration & Repair",
  "Commercial Fitting",
];

export function useGallery(initialData?: GalleryItem[]) {
  return useQuery<GalleryItem[]>({
    queryKey: ["craftsmanship-gallery"],
    queryFn: async () => {
      return await getGalleryItemsFromAPI();
    },
    initialData: initialData && initialData.length > 0 ? initialData : MOCK_GALLERY_ITEMS,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
