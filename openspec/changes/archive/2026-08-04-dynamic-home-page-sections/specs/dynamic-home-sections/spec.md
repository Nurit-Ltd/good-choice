## Purpose

Provides dynamic fetching, shared single-query caching, skeleton loading, and featured product slider integration for all remaining Home page sections.

## ADDED Requirements

### Requirement: Shared TanStack React Query Cache for Home Sections
All Home page components SHALL consume data through `useHomePageData()` sharing `queryKey: ['home-page-data']` with a 10-minute client staleTime to prevent duplicate backend REST requests.

#### Scenario: User navigates or mounts Home page
- **WHEN** Home page renders multiple sections
- **THEN** system executes ONLY ONE batch query to fetch all home configuration and product data, serving all 8 sections from memory

### Requirement: Collections Featured Products Slider (Option A)
The `Collections` component SHALL dynamically populate its right-side sticky scroll stream using featured products fetched from Strapi REST API (`/products?filters[feature_product][$eq]=true`).

#### Scenario: User scrolls through Grand Atelier Collections section
- **WHEN** user scrolls down to the Collections section
- **THEN** system displays featured furniture products in the right-side sticky scroll stream with title, image, and product link

### Requirement: Skeleton Loading & Image Fallback Protection
All product-dependent sections (`RecentlyCrafted`, `Explore`) SHALL render skeleton loaders during initial data fetching, and ALL image components SHALL use `ImageWithFallback` to prevent broken image layout shifts.

#### Scenario: Network delay or missing asset
- **WHEN** data is loading or an image URL is broken
- **THEN** system displays sleek skeleton placeholders or brand-tailored image fallbacks
