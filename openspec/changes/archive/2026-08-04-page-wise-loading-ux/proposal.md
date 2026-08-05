## Why

The current global `loading.tsx` renders a generic grey spinner that clashes with the luxury aesthetic of Good Choice Furniture. Implementing tailored page-wise route loading skeletons prevents layout shift, enhances visual feedback, and provides a premium luxury feel across all routes in the Next.js App Router.

## What Changes

- Replace generic global spinner in `src/app/loading.tsx` with a luxury brand monogram animation (Burgundy `#62103A` pulse ring & serif typography).
- Add `src/app/(shop)/loading.tsx` for Home Page skeleton (Hero banner shimmer + Category circles + Product grid).
- Add `src/app/(shop)/products/loading.tsx` for Product Listing Page skeleton (Filter sidebar + 12 Product card skeletons).
- Add `src/app/(shop)/products/[slug]/loading.tsx` for Product Detail Page skeleton (Gallery skeleton + Info & Add to Cart button skeleton).

## Capabilities

### New Capabilities
- `route-loading-skeletons`: Page-specific route loading skeletons and luxury brand loader for Next.js App Router.

### Modified Capabilities

## Impact

- `src/app/loading.tsx`: Updated to luxury brand loader.
- `src/app/(shop)/loading.tsx`: Home page route loading skeleton created.
- `src/app/(shop)/products/loading.tsx`: Products catalog route loading skeleton created.
- `src/app/(shop)/products/[slug]/loading.tsx`: Product detail route loading skeleton created.
