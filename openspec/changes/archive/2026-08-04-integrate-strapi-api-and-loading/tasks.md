## 1. Environment & Config Setup

- [x] 1.1 Update `next.config.ts` to include `res.cloudinary.com` in `images.remotePatterns`.
- [x] 1.2 Verify `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:1337/api/v1` and `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337`.

## 2. Strapi Data Seeding (Products, Navigation & Site Info)

- [x] 2.1 Create a Strapi seeding script (`scripts/seed-strapi.mjs`) to read existing mock text data (Categories, Brands, Products, Navbar links, Mega-menu, Footer bio, Contact info, Social links) and post them to Strapi `/api/v1/` REST endpoints and `/site-setting`.
- [x] 2.2 Execute the seed script against local Strapi (`http://localhost:1337`) to populate categories, brands, products, navbar links, and site settings into PostgreSQL DB.

## 3. Stylish Image Placeholder System

- [x] 3.1 Create a styled `ImagePlaceholder` / `ImageWithFallback` component that renders a subtle background gradient/color and a sleek vector icon (e.g. `Armchair`, `Package`, `Image`) when image URL is missing or fails to load.
- [x] 3.2 Update `getStrapiMediaUrl()` and card components (`ProductCard`, `CategoryCard`, etc.) to use the placeholder fallback without breaking layout aspect ratios.

## 4. Layer 1 Services Refactoring (Mock Removal)

- [x] 4.1 Refactor `productService.ts` and `catalogService.ts` to eliminate `MOCK_PRODUCTS` fallbacks and return clean empty arrays `[]` or `null` when Strapi REST API returns empty/error.
- [x] 4.2 Refactor `homePageService.ts` to eliminate `DEFAULT_HOME_DATA` fallbacks and return clean empty states when Strapi API returns empty/error.
- [x] 4.3 Refactor `siteSettingService.ts` to fetch dynamic navbar links, footer bio, contact details from Strapi while keeping fixed SVG icons intact.
- [x] 4.4 Ensure Cloudinary image URLs (`https://res.cloudinary.com/...`) are passed through `getStrapiMediaUrl()` without modification.

## 5. Layer 2 Hooks & Empty/Loading State Management

- [x] 5.1 Verify `use-products`, `use-catalog`, `use-home`, and `use-site-settings` hooks expose React Query `isLoading` and `isPending` states accurately.
- [x] 5.2 Implement UI Skeleton loading components (e.g. `ProductCardSkeleton`, `CatalogSkeleton`, `HomeSectionSkeleton`) across pages.
- [x] 5.3 Implement Button Spinner loading indicators for action buttons (e.g., "Add to Cart", form submit) and disable buttons during pending mutations.
- [x] 5.4 Implement graceful Empty State components for empty product catalogs, categories, or home page sections without changing existing UI design/layout.

## 6. Verification & Testing

- [x] 6.1 Run catalog and home pages with local Strapi running (verify seeded products, categories, navbar links, and footer info load dynamically).
- [x] 6.2 Test empty state rendering when Strapi returns empty datasets.
- [x] 6.3 Verify Cloudinary images render cleanly in Next `<Image />` without host errors and placeholders display cleanly for missing images.
- [x] 6.4 Verify 100% UI visual design parity, navbar links preservation, and zero broken layouts.
