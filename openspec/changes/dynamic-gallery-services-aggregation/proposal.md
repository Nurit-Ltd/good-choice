## Why

The current `/gallery` page relies on hardcoded mock items or an isolated Strapi `Project Gallery` collection type, requiring clients to upload project photography twice: once under Services and again under Project Gallery. Furthermore, the gallery categories are hardcoded, tags clutter the cards and lightbox modal, and page headings/button texts cannot be edited from Strapi. 

This change unifies the craftsmanship portfolio by automatically aggregating all photography uploaded across active Strapi Services (`feature_image` and `gallery` showcase photos) into the dynamic Pinterest-style Masonry Gallery, organizes them by Service Category, hides the redundant `Project Gallery` collection in Strapi, eliminates tag clutter, and exposes all page titles and CTA button labels through the `Gallery Page` Single Type in Strapi CMS.

## What Changes

- **Strapi Content Manager Sidebar Cleanup**: Set `"pluginOptions": { "content-manager": { "visible": false } }` on `api::gallery.gallery` so clients are not confused by redundant collection types and manage all craftsmanship photos directly inside Services.
- **Strapi Gallery Page Single Type Refactor**:
  - Remove `header_subtitle` (as requested: top banner will only have title, no subtitle).
  - Add `catalog_title` (default: *"All Craftsmanship Creations"*, editable in Strapi).
  - Add `search_placeholder` (default: *"Search by keyword, wood, majlis..."*).
  - Add `whatsapp_button_text` (default: *"Inquire on WhatsApp"*).
  - Add `service_button_text` (default: *"View Craftsmanship Service"*).
  - Update `metadatas.ts` and form layout for `api::gallery-page.gallery-page`.
- **Automated Service Image Aggregation (Next.js Layer 1)**:
  - Update `src/services/galleryService.ts` to fetch all active services with `populate=*`.
  - Extract both `feature_image` (Cover Image) and array of `gallery` (Past Project Showcase Photos) from each service.
  - Automatically calculate image aspect ratio (`portrait`, `landscape`, `square`) based on Cloudinary media dimensions (`width / height`).
  - Map each photo to a `GalleryItem` with its Service Category name, service title (or image caption if provided), service slug, and photo index.
- **Dynamic Category Filter Tabs (Next.js Layer 2 & 3)**:
  - Replace static `GALLERY_CATEGORIES` enum in `src/hooks/useGallery.ts` and `MasonryGalleryGrid.tsx` with dynamically extracted categories based on active service categories.
  - Dynamic count badges for each category.
- **Tag Removal & Clutter-Free Presentation**:
  - Completely remove all tag badges from `MasonryGalleryGrid.tsx` cards and `GalleryLightboxModal.tsx`.
  - Present cards cleanly with category badge, service title, and project showcase indicator without repetitive copy-pasted paragraph text.
- **Dynamic Lightbox Modal & Header**:
  - Consume dynamic button labels (`whatsapp_button_text` and `service_button_text`) from `Gallery Page` CMS data.
  - Connect `GalleryHeader.tsx` to dynamic `header_title` from Strapi.

## Capabilities

### New Capabilities
- `dynamic-gallery-services-aggregation`: Automated aggregation of service photography into the dynamic masonry gallery, dynamic category-based filtering, clean tag-free lightbox presentation with CMS-managed headings and buttons, and Strapi single-type integration.

### Modified Capabilities
<!-- None -->

## Impact

- **Backend (Strapi)**:
  - `src/api/gallery/content-types/gallery/schema.json`: hide from Content Manager.
  - `src/api/gallery-page/content-types/gallery-page/schema.json`: update fields (add catalog_title, button texts, remove subtitle).
  - `src/bootstrap/metadatas.ts`: update labels, descriptions, and layouts for `gallery-page`.
  - `strapi_core_store_settings`: sync new layout for `gallery-page`.
- **Frontend (Next.js)**:
  - `src/types/gallery.ts`: update interfaces for `GalleryPageData` and `GalleryItem`.
  - `src/services/galleryService.ts`: aggregation engine and gallery-page fetching.
  - `src/hooks/useGallery.ts` & `src/hooks/useGalleryPage.ts`: TanStack Query hooks with dynamic categories.
  - `src/components/features/gallery/GalleryHeader.tsx`: dynamic header title.
  - `src/components/features/gallery/MasonryGalleryGrid.tsx`: dynamic catalog title, dynamic category pills, no tags.
  - `src/components/features/gallery/GalleryLightboxModal.tsx`: dynamic CTA button labels, no tags, direct service links.
  - `src/app/(shop)/gallery/page.tsx`: server-side prefetching and metadata from Strapi.
