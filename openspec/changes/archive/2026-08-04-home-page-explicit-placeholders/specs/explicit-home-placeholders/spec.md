## Purpose

Provides dynamic Strapi `/categories` REST API fetching for `ShopByRoom` and explicit placeholder visual indicators for unpopulated images/data across all Home Page components.

## ADDED Requirements

### Requirement: Dynamic Category Fetching for Shop By Room
The `homePageService.ts` SHALL fetch active categories from `/api/v1/categories?filters[is_active][$eq]=true&populate=*` and map category name, slug, and media image (`banner_image` or `icon`) into `shopByRoom.items`.

#### Scenario: User views Shop By Room section
- **WHEN** Home page renders `ShopByRoom`
- **THEN** system displays real Strapi categories (`Microcontrollers & Boards`, `Boards`, etc.) with their uploaded images and `/products?category=...` links

### Requirement: Explicit Placeholder Image Frames for Unpopulated Media
When a Strapi entry (category, hero banner, craftsmanship story, collection background) has `null` or missing media, the UI SHALL render an explicit visual placeholder frame (neutral styled container with media placeholder icon) instead of static mock demo images.

#### Scenario: Admin views a section with unpopulated image in Strapi
- **WHEN** a category or section image is null in Strapi CMS
- **THEN** system renders a clean placeholder image frame clearly indicating that image data is unpopulated in Strapi
