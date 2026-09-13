## 1. Strapi CMS Schema & Admin Configuration

- [x] 1.1 Hide `Project Gallery` (`api::gallery.gallery`) in Strapi Content Manager sidebar via `pluginOptions: { "content-manager": { "visible": false } }`
- [x] 1.2 Refactor `Gallery Page` Single Type (`api::gallery-page.gallery-page`): remove `header_subtitle`, add `catalog_title`, `search_placeholder`, `whatsapp_button_text`, and `service_button_text`
- [x] 1.3 Update Strapi `src/bootstrap/metadatas.ts` and sync `strapi_core_store_settings` for `api::gallery-page.gallery-page` with clean human-readable labels and edit layout

## 2. Next.js Layer 1 Services & Layer 2 Hooks

- [x] 2.1 Update `src/types/gallery.ts` to define `GalleryPageData` interface and updated `GalleryItem` fields
- [x] 2.2 Create `src/services/galleryPageService.ts` to fetch `Gallery Page` CMS settings with tag `gallery-page`
- [x] 2.3 Refactor `src/services/galleryService.ts` to aggregate images from `/services?populate=*&filters[is_active][$eq]=true`, mapping cover image + gallery photos with automatic aspect ratio calculation
- [x] 2.4 Update `src/hooks/useGallery.ts` and create `src/hooks/useGalleryPage.ts` with dynamic category extraction and TanStack Query caching

## 3. Next.js Layer 3 UI Components & Lightbox Refactoring

- [x] 3.1 Update `src/components/features/gallery/GalleryHeader.tsx` to render dynamic `header_title` from CMS without subtitle
- [x] 3.2 Update `src/components/features/gallery/MasonryGalleryGrid.tsx` to render dynamic `catalog_title`, dynamic category filter pills with counts, and remove all card tag badges
- [x] 3.3 Update `src/components/features/gallery/GalleryLightboxModal.tsx` to remove all tag pills and render dynamic button texts (`whatsapp_button_text`, `service_button_text`) with direct link to service
- [x] 3.4 Update `src/app/(shop)/gallery/page.tsx` and `GalleryPageClient.tsx` to pass CMS page settings and aggregated services photography

## 4. Verification & Validation

- [x] 4.1 Verify Strapi admin panel: confirm `Project Gallery` is hidden from sidebar and `Gallery Page` has clean editable fields
- [x] 4.2 Verify Next.js build (`npx tsc --noEmit`) passes with 0 errors
- [x] 4.3 Test `/gallery` in browser to confirm dynamic services images, category tabs, and lightbox conversion buttons
