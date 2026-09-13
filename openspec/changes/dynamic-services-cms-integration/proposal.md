## Why

Currently, the Good Choice Furniture Services section lacks dedicated CMS page-level management (`services-page` Single Type), leaving the `/services` header banner and SEO unmanageable by content editors. Furthermore, the `Service` collection type relies on raw JSON fields (`features`, `process_steps`) that require technical JSON syntax editing, while categories are hardcoded as an enum rather than dynamic, manageable categories.

This change introduces full-stack dynamic integration: a human-friendly Strapi CMS architecture with zero raw JSON fields, a dedicated `Service Category` collection type, a `Services Page` Single Type for header banner & SEO, and seamless 3-layer Next.js frontend consumption with on-demand ISR caching.

## What Changes

- **Strapi Backend**:
  - Create `Services Page` (`services-page`) Single Type with clearly labeled, relevant fields for both listing and details pages:
    - **Listing Page (`/services`)**:
      - `header_title`: Page Header Title (default: "Our Craftsmanship & Services")
      - `catalog_title`: Catalog Section Title (default: "All Craftsmanship Offerings")
    - **Details Page Shared Titles (`/services/[slug]`)**:
      - `detail_switcher_title`: Top Service Switcher Title (default: "Explore All Craftsmanship Services")
      - `workflow_badge_text`: Workflow Badge Label (default: "Step-by-Step Workflow")
      - `workflow_section_title`: Workflow Section Title (default: "How We Deliver Service Excellence")
      - `workflow_section_subtitle`: Workflow Helper Text (default: "Click on any step below to explore our meticulous quality control timeline.")
      - `features_section_title`: Features Heading (default: "Service Features & Quality Commitments")
      - `specifications_section_title`: Specifications Heading (default: "Technical Specifications & Standards")
      - `gallery_section_title`: Gallery Heading (default: "Completed Project Showcase")
      - `related_badge_text`: Related Services Badge (default: "Explore Complementary Offerings")
      - `related_section_title`: Related Services Heading (default: "Related Craftsmanship Services")
      - `consultation_button_text`: Primary CTA Label (default: "Request Custom Consultation")
      - `whatsapp_inquiry_button_text`: WhatsApp CTA Label (default: "WhatsApp Inquiry")
    - **SEO**:
      - `seo`: Component `shared.seo` (metaTitle, metaDescription, shareImage)
  - Create `Service Category` (`service-category`) Collection Type with `name`, `slug`, `description`, `order_by`, `is_active`, and a one-to-many relation with `Service`.
  - Refactor `Service` (`service`) Collection Type to **ELIMINATE ALL RAW JSON FIELDS**:
    - Replace raw `process_steps` JSON with repeatable component `service.process-step` (`step`, `title`, `description`, `duration`).
    - Replace raw `features` JSON with repeatable component `service.feature-item` (`text`).
    - Add repeatable component `service.specification` (`label`, `value`).
    - Add highlight badges support (`service.highlight` or structured fields: `highlight_1_title`, `highlight_1_subtitle`, `highlight_2_title`, `highlight_2_subtitle`).
    - Replace enum `category` with relation to `service-category`.
  - Enable public read permissions (`find`, `findOne`) for `services-page` and `service-categories`.

- **Next.js Frontend (3-Layer Architecture)**:
  - **Layer 1 (`src/services/`)**:
    - Add `servicesPageService.ts` to fetch `services-page` data with tag `services-page`.
    - Update `service.service.ts` to fetch dynamic service categories and parse repeatable components instead of raw JSON.
  - **Layer 2 (`src/hooks/`)**:
    - Add `useServicesPage()` hook with TanStack Query.
    - Add `useServiceCategories()` hook.
    - Update `useServices()` and `useSingleService()` to handle dynamic category relations and repeatable components.
  - **Layer 3 (`src/components/features/services/`)**:
    - Update `ServicesHeader.tsx` to display dynamic header title from Strapi.
    - Update `ServicesCardGrid.tsx` to display dynamic `catalog_title` ("All Craftsmanship Offerings") and dynamic category tabs.
    - Update `ServicesCardGrid.tsx` to populate category pills dynamically from Strapi `Service Category` data.
    - Update `ServiceProcessTabs.tsx`, `ServiceSpecifications.tsx`, and `ServiceDetailHero.tsx` to consume the structured component fields.

## Capabilities

### New Capabilities
- `services-page-cms`: Dedicated Strapi Single Type (`services-page`) for header title, subtitle, banner image, and SEO metadata.
- `human-friendly-services-cms`: Elimination of raw JSON fields in `Service` in favor of human-friendly repeatable components and dynamic `Service Category` relation.

### Modified Capabilities
- `services-card-grid`: Update category tabs and filtering to dynamically consume `Service Category` from Strapi instead of hardcoded strings, with seamless mock fallback.

## Impact

- **Backend**:
  - New schema files: `src/api/services-page/content-types/services-page/schema.json`, `src/api/service-category/content-types/service-category/schema.json`
  - New components: `src/components/service/process-step.json`, `src/components/service/feature-item.json`, `src/components/service/specification.json`, `src/components/shared/trust-badge.json`
  - Modified schema: `src/api/service/content-types/service/schema.json`
- **Frontend**:
  - `src/types/service.ts`, `src/services/service.service.ts`, `src/services/servicesPageService.ts`
  - `src/hooks/useServices.ts`, `src/hooks/useServicesPage.ts`
  - `src/components/features/services/*`
  - `src/app/(shop)/services/page.tsx`, `src/app/(shop)/services/[slug]/page.tsx`
- **Database / API**:
  - Requires public permissions for `services-page` and `service-category` in Strapi Users & Permissions.
