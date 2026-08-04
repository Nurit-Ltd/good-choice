# route-loading-skeletons Specification

## Purpose
Defines requirements for route-specific loading skeletons and luxury brand loader in the Next.js App Router.
## Requirements
### Requirement: Global Luxury Brand Loader
The system SHALL display an elegant brand monogram loading UI with burgundy accent palette (`#62103A`) in the root `src/app/loading.tsx`.

#### Scenario: Navigating to uncached pages
- **WHEN** user initiates a full app navigation or uncached route loading
- **THEN** the system displays the brand loader with luxury typography and subtle animated pulse ring.

### Requirement: Home Page Route Skeleton
The system SHALL display a home-specific skeleton (`src/app/(shop)/loading.tsx`) that matches the hero banner, category slider, and product grid dimensions during home page route loading.

#### Scenario: Home page loading state
- **WHEN** the home page route is suspended or loading data
- **THEN** the system renders a warm neutral shimmer layout mirroring the home page structure.

### Requirement: Product Listing Route Skeleton
The system SHALL display a catalog skeleton (`src/app/(shop)/products/loading.tsx`) containing sidebar filters and product card grid placeholders during product listing navigation.

#### Scenario: Products catalog loading state
- **WHEN** user navigates to `/products` or filters products
- **THEN** the system displays the sidebar skeleton and 12 product card shimmer skeletons.

### Requirement: Product Detail Route Skeleton
The system SHALL display a product detail skeleton (`src/app/(shop)/products/[slug]/loading.tsx`) containing image gallery, title, price, and CTA placeholders during product page navigation.

#### Scenario: Product detail page loading state
- **WHEN** user opens a product page (`/products/[slug]`)
- **THEN** the system renders the gallery and product info shimmer placeholders.

