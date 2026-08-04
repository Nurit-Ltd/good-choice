## 1. Service Layer Refactoring

- [x] 1.1 Remove static `DEFAULT_HOME_DATA` text fallbacks and arrays from `src/services/homePageService.ts`.
- [x] 1.2 Implement Strapi REST API query for `/crafted-experiences` in `getHomePageData()`.
- [x] 1.3 Implement Strapi REST API query for `/faqs` in `getHomePageData()`.

## 2. Image and Empty State Placeholders

- [x] 2.1 Update `ImageWithFallback` UI component to handle missing/empty image URLs with SVG placeholders.
- [x] 2.2 Update `Banner`, `ShobByRoom`, `MadeFurniture`, `RecentlyCrafted`, `Collections`, `Explore`, `Experiences`, and `Faq` components to render clean empty states / admin-friendly placeholders when text or list items are missing from Strapi.

## 3. Verification

- [x] 3.1 Verify home page renders dynamically without runtime errors when content fields or images are omitted in Strapi.
