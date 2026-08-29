"use client";

import React, { useState } from "react";
import { useGallery } from "@/hooks/useGallery";
import { MasonryGalleryGrid } from "@/components/features/gallery/MasonryGalleryGrid";
import { GalleryLightboxModal } from "@/components/features/gallery/GalleryLightboxModal";
import { GallerySkeleton } from "@/components/features/gallery/GallerySkeleton";
import { useSiteSettings } from "@/hooks/use-site-settings";

interface GalleryPageClientProps {
  initialData?: any[];
}

export function GalleryPageClient({ initialData }: GalleryPageClientProps = {}) {
  const { data: galleryItems, isLoading } = useGallery(initialData);
  const { data: settings } = useSiteSettings();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const whatsappNumber =
    settings?.socialLinks?.whatsapp || settings?.whatsappUrl || "+8801700000000";

  if (isLoading && (!galleryItems || galleryItems.length === 0)) {
    return <GallerySkeleton />;
  }

  const items = galleryItems || [];

  const handleOpenLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <MasonryGalleryGrid items={items} onOpenLightbox={handleOpenLightbox} />

      {/* Interactive Lightbox Modal */}
      <GalleryLightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={items}
        currentIndex={selectedPhotoIndex}
        onIndexChange={setSelectedPhotoIndex}
        whatsappNumber={whatsappNumber}
      />
    </>
  );
}

export default GalleryPageClient;
