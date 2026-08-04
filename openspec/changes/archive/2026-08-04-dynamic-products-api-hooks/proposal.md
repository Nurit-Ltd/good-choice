## Why

The product catalog (`/products`) and product detail (`/products/[slug]`) pages require pure, uncompromised Strapi API integration and unified TanStack React Query hooks without introducing any new visual UI designs or changing the current layout.

## What Changes

- Preserve 100% of existing UI design, styling, and layout structure across catalog and product detail pages.
- Wire Order CTA button in `ProductDetailSection.tsx` to consume dynamic WhatsApp number from site settings instead of hardcoded number.
- Remove synthetic price multiplier (`base_price * 1.2`) in `catalogService.ts` and map actual discount price / specifications / key features from Strapi API.
- Unify `use-products.ts` React Query hooks to consume `catalogService.ts` layer with caching (`staleTime`).

## Capabilities

### New Capabilities
- `products-api-hooks`: Pure Strapi API integration and unified React Query hooks for product catalog and product detail pages without design changes.

### Modified Capabilities

## Impact

- `src/services/catalogService.ts`: Refactored to eliminate dummy price/specs fallbacks.
- `src/hooks/use-products.ts`: Updated to wrap `catalogService` layer using TanStack React Query (`useQuery`).
- `src/components/features/products/ProductDetailSection.tsx`: Updated Order CTA to use dynamic WhatsApp number from site settings.
