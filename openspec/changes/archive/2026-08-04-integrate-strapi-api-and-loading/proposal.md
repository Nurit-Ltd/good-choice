## Why

The Next.js frontend currently relies on hardcoded mock fallback data (`MOCK_PRODUCTS`, `DEFAULT_HOME_DATA`) and lacks clean empty state management when Strapi API responses are empty or failing. Connecting the frontend directly to the local Strapi v5 REST API (`http://localhost:1337/api/v1`), seeding products, categories, brands, site settings, navbar/footer navigation links, and contact information into Strapi, handling missing images with stylish placeholder backgrounds/icons, supporting Cloudinary media URLs, and standardizing 2-tier loading (UI Skeletons and Button Spinners) will create a production-ready, dynamic e-commerce interface while strictly preserving the existing UI design and layout.

## What Changes

- Remove hardcoded mock data (`MOCK_PRODUCTS`, `DEFAULT_HOME_DATA`, hardcoded fallbacks in `catalogService.ts`, `productService.ts`, `homePageService.ts`, etc.).
- Create a Data Seeding script/utility (`scripts/seed-strapi.mjs`) to populate local Strapi v5 with:
  - Products, Categories, Brands text metadata.
  - Home Page banner/craftsmanship/experience text content.
  - Site Settings, Navbar menu items/links, Footer bio, contact info (phone, email, address, whatsapp), and social links.
- Implement a **Stylish Image Placeholder Component / Resolver** (icon + gradient background) for items without images so that layout aspect ratios and visual aesthetics remain 100% intact.
- Connect Layer 1 services directly to local Strapi REST API (`/api/v1`) using environment variable `NEXT_PUBLIC_API_URL`.
- Support Cloudinary media URLs by updating `next.config.ts` `remotePatterns` to allow `res.cloudinary.com`.
- Implement clean Empty States when Strapi returns empty arrays `[]` or `null` without altering any existing UI design or layout structure.
- Implement 2-tier loading:
  - **UI-Level Skeleton Loading**: For page initialization, catalog filtering, and section fetching using React Query `isLoading`/`isPending`.
  - **Button-Level Spinner Loading**: For action buttons ("Add to Cart", "Apply Coupon", "Checkout", etc.) with disabled states during pending mutations.

## Capabilities

### New Capabilities
- `strapi-api-integration`: Pure Strapi REST API communication in Layer 1 services without mock fallbacks, supporting Cloudinary media URLs.
- `empty-and-loading-states`: 2-tier loading UX (UI Skeletons + Button Spinners) and clean Empty State handling while preserving 100% UI layout parity.
- `strapi-data-seeding-and-placeholders`: Seeding script to populate Strapi DB with products, categories, navbar/footer links, and site settings, combined with a stylish image placeholder system to prevent layout breakage when media is missing.

### Modified Capabilities
<!-- None -->

## Impact

- **Affected Code**: `src/services/`, `src/hooks/`, `src/components/`, `scripts/` (for seed), `next.config.ts`, `.env.local`.
- **APIs**: Strapi REST API (`/hero-banners`, `/products`, `/categories`, `/brands`, `/home-page`, `/site-setting`, etc.).
- **Dependencies**: Next.js App Router, TanStack React Query, Lucide Icons.
