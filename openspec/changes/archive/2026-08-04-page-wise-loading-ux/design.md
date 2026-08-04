## Context

See `proposal.md` for motivation. Currently only a generic `src/app/loading.tsx` spinner exists.

## Goals / Non-Goals

**Goals:**
- Design brand-tailored loaders using existing UI components (`ProductCardSkeleton`, custom shimmer blocks, Tailwind animate-pulse).
- Implement route-specific loading files (`loading.tsx`) in Next.js App Router directories.

**Non-Goals:**
- Modifying backend APIs or data fetchers.

## Decisions

### Decision 1: Root Brand Loader (`src/app/loading.tsx`)
- Centered layout with brand monogram "GC", burgundy pulsing ring (`#62103A`), and warm serif text "Good Choice Furniture".

### Decision 2: Home Route Skeleton (`src/app/(shop)/loading.tsx`)
- Hero Banner Shimmer (Aspect 75vh, Warm Neutral `#FAF7F2`).
- 4 Category Circle Skeletons.
- 4 Product Card Skeletons.

### Decision 3: Products Catalog Skeleton (`src/app/(shop)/products/loading.tsx`)
- Left Filter Sidebar Skeleton (Desktop 280px).
- Right Product Grid Skeleton (12 `ProductCardSkeleton` items).

### Decision 4: Product Detail Skeleton (`src/app/(shop)/products/[slug]/loading.tsx`)
- Left 50% Image Gallery Skeleton (Square aspect with thumbnails).
- Right 50% Product Info Skeleton (Title line, price line, options line, button line).

## Risks / Trade-offs

- None.
