## Purpose

Defines requirements for pure Strapi API integration and unified React Query hooks for product catalog and product detail pages while maintaining existing visual UI designs intact.

## ADDED Requirements

### Requirement: Dynamic WhatsApp Order CTA Link
The system SHALL generate the Order Now WhatsApp link in `ProductDetailSection` using the dynamic support/whatsapp number from site settings without hardcoded numbers.

#### Scenario: User clicks Order Now on product page
- **WHEN** user clicks Order Now on a product detail page
- **THEN** the system opens WhatsApp pre-populated with the product name using the store's configured WhatsApp number.

### Requirement: Eliminate Synthetic Price and Spec Fallbacks
The system SHALL map actual product price, original price, specifications, and key features directly from Strapi attributes without inventing artificial price multipliers or static specs.

#### Scenario: Displaying product details
- **WHEN** product details are retrieved from Strapi
- **THEN** price and specifications reflect actual Strapi record attributes.

### Requirement: Unified React Query Layer 2 Hooks
The system SHALL provide `useProductsQuery` and `useProductDetailQuery` hooks in `use-products.ts` backed by `catalogService.ts` for fast client-side caching and data access.

#### Scenario: Client component querying products
- **WHEN** a client component uses `useProducts` or `useProductBySlug`
- **THEN** the hook fetches via `catalogService` with TanStack React Query caching.
