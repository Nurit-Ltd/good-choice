## Why

The remaining Home Page components (`ShopByRoom`, `MadeFurniture`, `RecentlyCrafted`, `Collections`, `Explore`, `Experiences`, `Faq`) must be fully dynamic, consuming backend data from Strapi REST API via Layer 1 `homePageService.ts` and Layer 2 `useHomePageData()` TanStack React Query hook. To prevent backend overload, all components will share a single React Query queryKey (`['home-page-data']`) with a 10-minute client staleTime. The right-side Collections slider will dynamically pull featured products (Option A).

## What Changes

- Update Layer 1 `homePageService.ts` to map all home page sections (`shopByRoom`, `craftsmanship`, `collections`, `experiences`, `faq`, and `featuredProducts`).
- Refactor `ShopByRoom.tsx` to consume dynamic titles and room category cards with `ImageWithFallback`.
- Refactor `MadeFurniture.tsx` to consume dynamic craftsmanship left/right titles, paragraphs, and images.
- Refactor `RecentlyCrafted.tsx` to render dynamic product cards slider with skeleton loading state when fetching.
- Refactor `Collections.tsx` to consume dynamic collection titles and map featured catalog products (Option A) into its right-side sticky scroll stream.
- Refactor `Explore.tsx` to render dynamic product grid with skeleton loading state.
- Refactor `Experiences.tsx` and `Faq.tsx` to consume dynamic section headers and items.
- Update `src/app/page.tsx` to render the dynamic Home page layout.

## Capabilities

### New Capabilities
- `dynamic-home-sections`: Dynamic rendering of all Home page sections using a single shared React Query cache (`useHomePageData`), featuring skeleton loaders and featured product collection stream.

### Modified Capabilities
<!-- None -->

## Impact

- **Affected Code**: `src/components/features/home/` (`ShobByRoom.tsx`, `MadeFurniture.tsx`, `RecentlyCrafted.tsx`, `Collections.tsx`, `Explore.tsx`, `Experiences.tsx`, `Faq.tsx`), `src/services/homePageService.ts`, `src/app/page.tsx`.
- **APIs**: Strapi REST API (`/home-page`, `/categories`, `/products`).
- **Dependencies**: React Query (`useHomePageData`).
