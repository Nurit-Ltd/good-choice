## 1. Strapi Backend Components & Schemas

- [x] 1.1 Create Strapi repeatable components: `service.process-step`, `service.feature-item`, and `service.specification`
- [x] 1.2 Create `Service Category` Collection Type schema (`api::service-category.service-category`) with name, slug, order_by, is_active, and relation to `Service`
- [x] 1.3 Create `Services Page` Single Type schema (`api::services-page.services-page`) with Header Title, Catalog Title, Details Page Shared Section Headings, and SEO component
- [x] 1.4 Refactor `Service` Collection Type schema (`api::service.service`) to eliminate raw JSON fields (`features`, `process_steps`) in favor of repeatable components and category relation

## 2. Strapi Permissions & Seeding

- [x] 2.1 Enable public permissions (`find`, `findOne`) for `services-page` and `service-category` in Strapi
- [x] 2.2 Seed default `Services Page` and `Service Categories` content in Strapi database

## 3. Next.js Layer 1 Services & Types

- [x] 3.1 Update `src/types/service.ts` with new interfaces for `ServicesPageData` (including details shared titles), `ServiceCategoryItem`, and updated `ServiceItem`
- [x] 3.2 Create `src/services/servicesPageService.ts` for fetching `services-page` data with tag `services-page` and fallback data
- [x] 3.3 Update `src/services/service.service.ts` to normalize repeatable components and fetch dynamic categories

## 4. Next.js Layer 2 Hooks

- [x] 4.1 Create `src/hooks/useServicesPage.ts` with TanStack React Query caching
- [x] 4.2 Create `src/hooks/useServiceCategories.ts` for dynamic category tabs
- [x] 4.3 Update `src/hooks/useServices.ts` to support category filtering via relation

## 5. Next.js Layer 3 UI Components & Pages

- [x] 5.1 Update `ServicesHeader.tsx` to consume dynamic title from Strapi
- [x] 5.2 Update `ServicesCardGrid.tsx` to dynamically render `catalog_title` and category tabs from Strapi data
- [x] 5.3 Update `ServiceTopSwitcherStrip.tsx`, `ServiceProcessTabs.tsx`, `ServiceSpecifications.tsx`, `ServiceGalleryLightbox.tsx`, and `RelatedServicesCarousel.tsx` to consume shared section titles from `useServicesPage()`
- [x] 5.4 Integrate updated header & services components into `/services/page.tsx` and `/services/[slug]/page.tsx`

## 6. Verification & Validation

- [x] 6.1 Verify Strapi admin panel displays `Services Page`, `Services`, and `Service Categories` without errors (and verifies `User` is hidden from Content Manager)
- [x] 6.2 Test Next.js build (`npm run build`) and verify `/services` and `/services/[slug]` in the browser
