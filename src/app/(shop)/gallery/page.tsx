import { Metadata } from "next";
import { GalleryHeader } from "@/components/features/gallery/GalleryHeader";
import { GalleryPageClient } from "@/components/features/gallery/GalleryPageClient";
import { getGalleryItemsFromAPI } from "@/services/galleryService";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Craftsmanship & Project Gallery | Good Choice Furniture",
  description:
    "Browse our dynamic portfolio of luxury Arabic majlis, custom upholstered sofas, bespoke woodworking, and master architectural furniture installations.",
};

export default async function GalleryPage() {
  const initialData = await getGalleryItemsFromAPI();

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Top Luxury Banner Header */}
      <section className="px-4 pt-4">
        <GalleryHeader />
      </section>

      {/* Main Container with Pure-CSS Masonry Gallery */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        <GalleryPageClient initialData={initialData} />
      </main>
    </div>
  );
}
