## Context

See `proposal.md` for motivation. The frontend architecture follows a strict 3-Layer pattern (`src/services/` -> `src/hooks/` -> `src/components/`). Currently, services return mock fallback data arrays (`MOCK_PRODUCTS`, `DEFAULT_HOME_DATA`, `DEFAULT_SETTINGS`) whenever Strapi API returns null/empty. To transition to real Strapi data smoothly without losing content, we will seed existing text data, site configuration, navbar links, and footer info into Strapi, while handling missing images using a stylish placeholder system.

## Goals / Non-Goals

**Goals:**
- Seed existing frontend text mock data (Products, Categories, Brands, Home Page text, Navbar navigation links, Footer bio/contact info) into Strapi v5 local database via REST API / Seed script.
- Connect Layer 1 services (`catalogService`, `productService`, `homePageService`, `siteSettingService`) directly to Strapi REST API (`http://localhost:1337/api/v1`).
- Completely remove mock fallback arrays (`MOCK_PRODUCTS`, `DEFAULT_HOME_DATA`) from Layer 1 services.
- Provide a **Stylish Image Placeholder System** (modern gradient background + Lucide icon) whenever an image is missing or null, ensuring 0% layout breakage.
- Add `res.cloudinary.com` to `next.config.ts` `remotePatterns` for Cloudinary asset handling.
- Expose React Query `isLoading` and `isPending` to render UI Skeleton components and Action Button Spinners.
- Maintain 100% visual layout parity with zero CSS/design changes.

**Non-Goals:**
- Redesigning UI components or altering existing layout grids.
- Changing SVG vector icons in Navbar/Footer (icons stay fixed, only labels/links/info are dynamic).

## Decisions

1. **Strapi Data Seeding Script**:
   - *Decision*: Create a Node.js seed script (`scripts/seed-strapi.mjs`) that posts existing mock text records (`RAW_PRODUCTS_DATA`, `DEFAULT_HOME_DATA`, `siteConfig` navbar links, `DEFAULT_SETTINGS` contact info) to local Strapi `/api/v1/categories`, `/api/v1/brands`, `/api/v1/products`, `/api/v1/site-setting`.
   - *Rationale*: Populates Strapi instantly with rich text content, navbar links, and footer info so that navigation elements never disappear when dynamic data fetching is active.

2. **Navbar & Footer Information Seeding**:
   - *Decision*: Map `siteConfig` (navLinks, megaMenu, contact numbers) and `DEFAULT_SETTINGS` (supportPhone, whatsappNumber, email, address, socialLinks, footerBio, copyrightText) into Strapi `site-setting` endpoint during seed execution.
   - *Rationale*: Ensures zero visual loss on Navbar and Footer components when reading from Strapi API.

3. **Stylish Image Placeholder Component**:
   - *Decision*: Build a reusable `ImageWithFallback` or `PlaceholderImage` component (and update `getStrapiMediaUrl`) that renders a refined background (e.g. `bg-stone-100 dark:bg-stone-800`) with a subtle icon (`Armchair` / `Package` / `Image`) when the image URL is missing or fails to load.
   - *Rationale*: Prevents broken `img` tags or layout collapsing while preserving modern luxury aesthetics.

4. **Pure Layer 1 API Return Type (No Fallback Mocks)**:
   - *Decision*: Layer 1 functions will return `{ products: [], total: 0 }` or `null` on missing data/error instead of falling back to `MOCK_PRODUCTS`.
   - *Rationale*: Allows Layer 2 React Query to detect authentic empty states and communicate loading states correctly to Layer 3 UI.

5. **2-Tier Loading Strategy**:
   - *Decision*:
     - **UI Level**: Use React Query `isLoading`/`isPending` to render Skeleton components.
     - **Button Level**: Use `isPending` state on mutation hooks to render inline Spinner + `disabled` attribute on action buttons.

## Risks / Trade-offs

- [Products seeded without images] → Displayed cleanly using styled placeholder boxes until user uploads real images via Strapi Admin.
- [Strapi server offline/down] → UI will display empty state components gracefully instead of breaking.
