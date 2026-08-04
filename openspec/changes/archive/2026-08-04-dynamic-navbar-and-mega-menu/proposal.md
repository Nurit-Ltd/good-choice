## Why

The Navbar component currently uses static configuration files for its Mega Menu links, promotional cards, and announcement text. Connecting the entire Navbar and Mega Menu dynamically to the local Strapi REST API (`http://localhost:1337/api/v1`) using a hybrid relational strategy will allow admins to manage navigation links, parent-child category trees, and promotional campaign banners from the Strapi Admin Panel while guaranteeing 100% UI layout stability and line-wrap protection.

## What Changes

- Connect Navbar (`Navbar.tsx`, `DesktopNav.tsx`, `MegaMenuPanel.tsx`, `MobileSheet.tsx`) to Strapi `site-setting`, `categories`, and `ads-banners` API endpoints.
- Map Mega Menu columns dynamically from Strapi Parent-Child Categories (`GET /api/v1/categories?filters[parent][$null]=true&populate=children`), capped at a maximum of 8 Parent Categories (4 columns × 2 rows grid).
- Add CSS single-line truncation (`whitespace-nowrap truncate`) to all category headers and sub-item labels to prevent layout distortion or awkward line wraps.
- Map Mega Menu promotional cards dynamically to Strapi Ads Banners (`GET /api/v1/ads-banners?filters[placement][$eq]=mega_menu`), supporting image URLs (Cloudinary/local) and clickable target URLs.
- Update `scripts/seed-strapi.mjs` and Strapi bootstrap `seed.ts` with complete example seeding for navbar links, parent-child categories, and mega-menu promo cards so admins can edit them immediately from Strapi Admin (`http://localhost:1337/admin`).

## Capabilities

### New Capabilities
- `dynamic-navbar-navigation`: Dynamic rendering of Navbar items, announcement bar, logo, and contact info from Strapi site settings API.
- `dynamic-mega-menu-and-promos`: Dynamic mapping of Parent-Child category tree and promotional ad cards into the Mega Menu with max-8 grid capping and line-wrap protection.

### Modified Capabilities
<!-- None -->

## Impact

- **Affected Code**: `src/components/layout/Navbar.tsx`, `src/components/layout/navbar/MegaMenuPanel.tsx`, `src/components/layout/navbar/DesktopNav.tsx`, `src/components/layout/navbar/MobileSheet.tsx`, `src/services/siteSettingService.ts`, `src/services/catalogService.ts`, `scripts/seed-strapi.mjs`, Strapi `src/bootstrap/seed.ts`.
- **APIs**: Strapi REST API (`/site-setting`, `/categories`, `/ads-banners`).
- **Dependencies**: React Query, Lucide Icons, Next.js Image.
