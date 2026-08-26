## 1. Navigation Updates

- [x] 1.1 Update `src/config/site.ts` `navLinks` to hide "Product" and add "Gallery" (`/gallery`).
- [x] 1.2 Update `DesktopNav.tsx`, `MobileSheet.tsx`, and `Navbar.tsx` to ensure seamless rendering of the new Gallery navigation item.

## 2. Floating Social Dock

- [x] 2.1 Implement `FloatingSocialDock.tsx` in `src/components/shared/` supporting WhatsApp, Instagram, and Facebook with desktop vertical glassmorphism and mobile anti-overlap positioning.
- [x] 2.2 Integrate `FloatingSocialDock.tsx` into `src/components/layout/Navbar.tsx` or root layout while preserving existing `FooterBottomBar.tsx` social icons.

## 3. Gallery Data Layer & Types

- [x] 3.1 Define `GalleryItem` and `GalleryCategory` interfaces in `src/types/gallery.ts`.
- [x] 3.2 Create `src/data/mock-gallery.ts` containing diverse craftsmanship photos with variable aspect ratios (tall, portrait, square, wide landscape).
- [x] 3.3 Create `src/hooks/useGallery.ts` following Layer 2 TanStack Query guidelines.

## 4. UI Components & Gallery Route

- [x] 4.1 Implement `GalleryHeader.tsx` in `src/components/features/gallery/`.
- [x] 4.2 Implement `MasonryGalleryGrid.tsx` with pure CSS column masonry, hover card overlays, and category filtering.
- [x] 4.3 Implement `GalleryLightboxModal.tsx` with full-screen view, zoom, and WhatsApp inquiry CTA.
- [x] 4.4 Implement `GallerySkeleton.tsx` and `GalleryPageClient.tsx`.
- [x] 4.5 Create `src/app/(shop)/gallery/page.tsx` and `loading.tsx`.

## 5. Verification & Testing

- [x] 5.1 Verify Navbar links (Home, Services, Gallery, About, Contact) on both desktop and mobile drawer.
- [x] 5.2 Verify Floating Social Dock responsiveness, hover tooltips, and zero-overlap across screen widths.
- [x] 5.3 Verify `/gallery` page responsive masonry layout, image aspect ratios, category filter tabs, and lightbox interactions.
- [x] 5.4 Run TypeScript type check (`npx tsc --noEmit`) to ensure zero errors.
