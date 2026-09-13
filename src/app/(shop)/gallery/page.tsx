import { Metadata } from "next";
import { GalleryHeader } from "@/components/features/gallery/GalleryHeader";
import { GalleryPageClient } from "@/components/features/gallery/GalleryPageClient";
import { getGalleryItemsFromAPI } from "@/services/galleryService";
import { getGalleryPageData } from "@/services/galleryPageService";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getGalleryPageData();

  return {
    title: pageData.seo?.metaTitle || `${pageData.headerTitle} | Good Choice Furniture`,
    description:
      pageData.seo?.metaDescription ||
      "Browse our dynamic portfolio of luxury Arabic majlis, custom upholstered sofas, bespoke woodworking, and master architectural furniture installations.",
  };
}

export default async function GalleryPage() {
  const [initialData, pageData] = await Promise.all([
    getGalleryItemsFromAPI(),
    getGalleryPageData(),
  ]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Top Luxury Banner Header */}
      <section className="px-4 pt-4">
        <GalleryHeader title={pageData.headerTitle} />
      </section>

      {/* Main Container with Pure-CSS Masonry Gallery */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        <GalleryPageClient initialData={initialData} initialPageData={pageData} />
      </main>
    </div>
  );
}
