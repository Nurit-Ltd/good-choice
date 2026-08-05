## Why

Currently, when Strapi backend entries (such as categories, craftsmanship images, or banners) do not have uploaded images or configured text, static mock assets are displayed as fallbacks. This misleads the Admin into believing data is populated in Strapi CMS. Replacing static mock assets with dynamic `/categories` API integration and explicit visual placeholder frames (`ImageWithFallback` with placeholder indicators) ensures the Admin immediately sees when data is missing in Strapi CMS.

## What Changes

- Update `getHomePageData()` in `src/services/homePageService.ts` to dynamically fetch active categories from `/categories?filters[is_active][$eq]=true&populate=*` for `shopByRoom`.
- Eliminate static mock images in `ShopByRoom.tsx`, `MadeFurniture.tsx`, `Collections.tsx`, and `Banner.tsx`.
- Implement explicit placeholder frames (stylized neutral image frame with brand/media placeholder icon and subtle "Upload Image in Admin" tooltip/badge) when Strapi media is `null` or unpopulated.
- Maintain 100% exact layout boundaries and structure while giving clear visual feedback for unpopulated Strapi fields.

## Capabilities

### New Capabilities
- `explicit-home-placeholders`: Dynamic Strapi `/categories` fetching and explicit visual placeholder frames when Strapi backend entries or media assets are missing.

### Modified Capabilities
<!-- None -->

## Impact

- **Affected Code**: `src/services/homePageService.ts`, `src/components/features/home/ShobByRoom.tsx`, `src/components/features/home/MadeFurniture.tsx`, `src/components/features/home/Collections.tsx`, `src/components/features/home/Banner.tsx`, `src/components/ui/ImageWithFallback.tsx`.
- **APIs**: Strapi REST API (`/categories`, `/home-page`, `/hero-banners`, `/products`).
- **Dependencies**: React Query, Lucide icons.
