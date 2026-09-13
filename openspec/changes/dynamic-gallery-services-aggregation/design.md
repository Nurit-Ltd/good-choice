## Context

See `proposal.md` for motivation and background. 
The system operates under a headless decoupled architecture (Next.js 15 App Router frontend + Strapi v5 CMS). Content editors manage their craftsmanship offerings under `api::service.service`. Each service holds a `feature_image` (Cover Image) and `gallery` (Past Project Showcase Photos array). The existing `/gallery` page used static mock data and hardcoded categories.

## Goals / Non-Goals

**Goals:**
- Eliminate dual content entry by automatically pulling all images from active Strapi Services into `/gallery`.
- Hide redundant `Project Gallery` (`api::gallery.gallery`) in Strapi Content Manager to prevent editor confusion.
- Make all page headlines (`catalog_title`, `header_title`), search placeholder, and action buttons (`whatsapp_button_text`, `service_button_text`) dynamic through the `Gallery Page` Single Type in Strapi.
- Remove all tag pill clutter from grid cards and the lightbox modal.
- Derive category filter tabs dynamically from active service categories with responsive badge counts.
- Calculate aspect ratios automatically from image dimensions without requiring admin manual input.

**Non-Goals:**
- Removing the `galleries` table from the database entirely (we only hide it from Content Manager via `pluginOptions` to preserve existing schemas without data loss).
- Modifying the core Next.js routing structure.

## Decisions

### Decision 1: Pure Services Image Aggregation in Layer 1 (`galleryService.ts`)
- **Approach**: In `getGalleryItemsFromAPI()`, fetch all active services (`/services?populate=*&filters[is_active][$eq]=true`). Iterate through services and flatten each service's `feature_image` and `gallery` items into a unified array of `GalleryItem`s.
- **Alternatives Considered**:
  - *Option B (Hybrid)*: Merge both `services` and `galleries` collections. Rejected based on user direction: client wants a single source of truth inside Services.
  - *Option C (DB Webhook / Cron)*: Create a background sync job in Strapi that populates `galleries` from `services`. Rejected as unnecessary database duplication and latency; runtime aggregation with Next.js ISR tag caching (`revalidate: 60`) is instant, resilient, and requires zero database synchronization overhead.

### Decision 2: Automatic Aspect Ratio Derivation from Cloudinary Dimensions
- **Approach**: When mapping each image, inspect `formats.large` or root `width` and `height`.
  - If `width / height >= 1.25` → `landscape` (`aspect-[16/10]`)
  - If `width / height <= 0.8` → `portrait` (`aspect-[3/4]`)
  - If `width / height <= 0.65` → `tall` (`aspect-[9/14]`)
  - Otherwise → `square` (`aspect-square`)
- **Rationale**: Completely frees the content editor from having to manually designate aspect ratios.

### Decision 3: Dynamic Category Extraction & Filtering
- **Approach**: The filter tabs will be computed dynamically from the unique category names present in the aggregated items (or from `useServiceCategories()`). The `"All"` tab will always be first with the total item count, followed by the specific category pills with accurate sub-counts.
- **Rationale**: Eliminates the hardcoded 8-category enum and guarantees every pill shown corresponds to real, available projects.

### Decision 4: Strapi Single Type `Gallery Page` Schema Refactor
- **Approach**: Update `src/api/gallery-page/content-types/gallery-page/schema.json` to:
  - Remove `header_subtitle`.
  - Add `catalog_title` (String, default: "All Craftsmanship Creations").
  - Add `search_placeholder` (String, default: "Search by keyword, wood, majlis...").
  - Add `whatsapp_button_text` (String, default: "Inquire on WhatsApp").
  - Add `service_button_text` (String, default: "View Craftsmanship Service").
  - Update `src/bootstrap/metadatas.ts` to sync field labels and layouts.

### Decision 5: Tag Clutter Elimination & Minimalist Luxury Card UX
- **Approach**: Remove the tags rendering block from `MasonryGalleryGrid.tsx` and `GalleryLightboxModal.tsx`. Cards will display:
  - Floating top Category badge (`item.category`)
  - Bottom gradient overlay on hover with Service Title (`item.title`) and a subtle project indicator (`Project Showcase #N`)
  - In Lightbox: High-res image on left, and on the right: Category badge, Title, Service description, and two prominent dynamic action buttons (`Inquire on WhatsApp` + `View Craftsmanship Service →`).

## Risks / Trade-offs

- **[Risk] Services with many images might increase payload size**:
  - *Mitigation*: Strapi's `/services?populate=*` returns Cloudinary image objects with thumbnail, small, and medium formats. In Next.js, `next/image` delivers optimized WEBP/AVIF sizes with responsive `sizes` attribute.
- **[Risk] Service without category relation**:
  - *Mitigation*: Fallback to `service.category` or `"Craftsmanship"`.
- **[Risk] Empty services database**:
  - *Mitigation*: Retain a clean fallback state with the empty-state component prompting to reset filters.

## Migration Plan

1. Update Strapi `api::gallery.gallery` schema with `pluginOptions.content-manager.visible = false`.
2. Update Strapi `api::gallery-page.gallery-page` schema with new fields.
3. Update `src/bootstrap/metadatas.ts` and sync `strapi_core_store_settings`.
4. Update Next.js Layer 1 `galleryService.ts` and `galleryPageService.ts`.
5. Update Next.js Layer 2 `useGallery.ts` and `useGalleryPage.ts`.
6. Update Next.js Layer 3 components (`GalleryHeader.tsx`, `MasonryGalleryGrid.tsx`, `GalleryLightboxModal.tsx`, and `/gallery/page.tsx`).
7. Run `npx tsc --noEmit` and verify live pages in browser.
