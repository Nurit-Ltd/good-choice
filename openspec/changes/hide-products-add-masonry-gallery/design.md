## Context

The navigation currently features "Product" with a rich categories mega menu. The user wants all "Product" entry points hidden from the Navbar while keeping the routes and code intact. A new "Gallery" item must be added pointing to a brand new `/gallery` route featuring a Pinterest-style dynamic masonry gallery. Additionally, a non-intrusive floating social dock (WhatsApp, Instagram, Facebook) must be introduced with strict anti-overlap safeguards across all devices while preserving the existing footer links.

## Goals / Non-Goals

**Goals:**
- Update `src/config/site.ts` `navLinks` to `Home`, `Services`, `Gallery`, `About`, `Contact`.
- Create `/gallery` page with:
  - Pinterest-style Pure CSS Masonry (`columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6` with `break-inside-avoid`).
  - Dynamic dataset supporting various aspect ratios (`tall`, `portrait`, `square`, `landscape`).
  - Category filter pills with real-time count badges and live search.
  - Interactive Lightbox with keyboard navigation (Esc, Left/Right arrow keys), full image view, and WhatsApp custom inquiry CTA.
  - Loading skeleton matching the multi-column masonry structure.
- Create `FloatingSocialDock.tsx`:
  - Desktop: Vertical glassmorphic dock on the right screen edge (`top-1/2 -translate-y-1/2`) with tooltip slide-in on hover.
  - Mobile: Safe bottom-right docked/floating integration with drag/touch-safe boundaries and `z-40` to avoid modal/sheet obstruction.
  - Keep footer social links in `FooterBottomBar.tsx` unchanged.

**Non-Goals:**
- Deleting the existing `/products` or `/products/[slug]` routes or backend product APIs.

## Decisions

### Decision 1: Pure CSS Masonry Grid over Heavy JS Layout Libraries
- **Choice**: Use Tailwind CSS `columns-1 sm:columns-2 md:columns-3 lg:columns-4` with `break-inside-avoid` on items.
- **Rationale**: Blazing fast 60fps rendering, zero layout shift, completely responsive, and native image loading.

### Decision 2: Anti-Overlap Floating Social Dock
- **Choice**: `z-40` positioning with pointer-events isolation and right-center anchoring on desktop; draggable/compact bottom placement on mobile.
- **Rationale**: Ensures critical buttons, bottom checkout CTAs, and full-screen modals are never covered or blocked.

### Decision 3: 3-Layer Frontend Pattern for Gallery
- **Layer 1**: `src/types/gallery.ts` and `src/data/mock-gallery.ts`.
- **Layer 2**: `src/hooks/useGallery.ts` (supports category filtering, search, and dynamic fallback).
- **Layer 3**: `MasonryGalleryGrid.tsx`, `GalleryLightboxModal.tsx`, `GalleryHeader.tsx`, `GallerySkeleton.tsx`, and `GalleryPageClient.tsx`.

## Risks / Trade-offs

- **[Images Jumping During Load]** → Provide placeholder background colors and explicit aspect ratios or width/height metrics to prevent content jumps before images load.
- **[Floating Elements Blocking Mobile Controls]** → Clamp floating dock boundary to screen edges with touch-safe paddings.
