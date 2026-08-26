## Why

The business is focusing primarily on bespoke craftsmanship, custom spatial interior services, and tailored furniture portfolios. To streamline customer navigation and conversion:
1. All "Product" links and mega menus must be hidden from the Navbar while preserving the underlying product codebase.
2. A dedicated "Gallery" navigation link and a dynamic, high-performance Pinterest-style Masonry Gallery (`/gallery`) must be introduced to showcase real craft executions.
3. A non-intrusive, zero-overlap Floating Social Dock (WhatsApp, Instagram, Facebook) must be added alongside existing footer links to maximize customer inquiries without obstructing content on any device.

## What Changes

- **Navbar Navigation Refactoring**:
  - Remove "Product" and its mega menu from both Desktop Navigation (`DesktopNav.tsx`) and Mobile Drawer (`MobileSheet.tsx`).
  - Introduce "Gallery" (`/gallery`) into `siteConfig.navLinks` and navigation components (`Home`, `Services`, `Gallery`, `About`, `Contact`).
  - Preserve all existing product routes, services, and components intact in the codebase without active navigation links.
- **Dynamic Pinterest-Style Masonry Gallery Route (`/gallery`)**:
  - Create the new route `src/app/(shop)/gallery/page.tsx` and `GalleryPageClient.tsx`.
  - Implement a dynamic Pure-CSS Masonry grid (`columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6`) supporting variable image heights (portrait, square, tall, landscape).
  - Implement interactive image card hover effects with title, category badge, and zoom preview trigger.
  - Implement full-screen glassmorphic Lightbox Modal with next/prev navigation, zoom, and a direct "Inquire on WhatsApp / Request Custom Piece" CTA.
  - Implement category filtering (e.g., All, Bespoke Sofas, Arabic Majlis, Beds & Wardrobes, Dining Tables, Lighting & Decor).
  - Create high-quality dynamic mock/API data layer for craftsmanship gallery items.
- **Floating Social Dock with Anti-Overlap Protection (`FloatingSocialDock.tsx`)**:
  - Desktop: Vertical floating glassmorphic dock fixed on the screen edge (`right-4 top-1/2 -translate-y-1/2`) featuring WhatsApp, Instagram, and Facebook with smooth tooltip expand on hover.
  - Mobile/Tablet: Zero-overlap positioning with touch-safe boundaries and lower z-index than modal lightboxes to prevent content obstruction.
  - Footer social icons in `FooterBottomBar.tsx` remain completely intact.

## Capabilities

### New Capabilities
- `masonry-craftsmanship-gallery`: A responsive, dynamic Pinterest-style multi-column masonry gallery with category filters, variable aspect ratio image support, and an interactive full-screen lightbox preview.
- `floating-social-dock`: A non-intrusive, responsive floating social action dock with anti-overlap positioning and tooltips.

### Modified Capabilities
- `dynamic-navbar-navigation`: Navigation links updated to remove "Product" entries and introduce "Gallery".

## Impact

- **Configuration**: Updates `src/config/site.ts` `navLinks`.
- **Navigation & Layout Components**:
  - `src/components/layout/Navbar.tsx`, `DesktopNav.tsx`, `MobileSheet.tsx`.
  - `src/components/shared/FloatingSocialDock.tsx` (New floating social dock).
- **New Route & Feature Components**:
  - `src/app/(shop)/gallery/page.tsx`
  - `src/app/(shop)/gallery/GalleryPageClient.tsx`
  - `src/components/features/gallery/MasonryGalleryGrid.tsx`
  - `src/components/features/gallery/GalleryLightboxModal.tsx`
  - `src/components/features/gallery/GalleryHeader.tsx`
  - `src/components/features/gallery/GallerySkeleton.tsx`
  - `src/data/mock-gallery.ts`
  - `src/types/gallery.ts`
  - `src/hooks/useGallery.ts`
