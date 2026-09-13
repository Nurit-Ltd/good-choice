## Context

See `proposal.md` for motivation.
Currently, Good Choice Furniture uses Next.js 16 (Turbopack, App Router) and Strapi v5 (Headless CMS, PostgreSQL).
The existing Services section suffers from:
1. Lack of a dedicated `services-page` Single Type in Strapi, making the page banner and meta unconfigurable.
2. Raw JSON fields (`features`, `process_steps`) in `api::service.service` requiring manual syntax input.
3. Hardcoded category enums on both backend schema and frontend components.

## Goals / Non-Goals

**Goals:**
- Provide CMS control for `/services` with a dedicated Single Type (`services-page`) for header title, subtitle, banner image, and SEO.
- Replace raw JSON fields in `Service` with intuitive Strapi repeatable components (`process-step`, `feature-item`, `specification`).
- Create `service-category` Collection Type to decouple category management from hardcoded strings.
- Implement 3-Layer frontend architecture (`src/services/`, `src/hooks/`, `src/components/features/services/`) with ISR tag-based caching.
- Ensure graceful fallbacks so the frontend never crashes if CMS fields or connections are temporarily unavailable.

**Non-Goals:**
- Adding unneeded sections (like trust badges or bottom consultation banners) that do not exist on the current `/services` page.
- Modifying other unrelated pages (`/about`, `/contact`, `/gallery`).
- Changing the checkout, cart, or payment gateway logic.

## Decisions

### 1. Zero JSON Fields & Repeatable Components
- **Decision**: Create three dedicated Strapi components for `Service`:
  - `service.process-step` (`step`: integer, `title`: string, `description`: text, `duration`: string)
  - `service.feature-item` (`text`: string)
  - `service.specification` (`label`: string, `value`: string)
- **Rationale**: Eliminates syntax errors in Strapi Content Manager. Non-technical administrators can click "+ Add item" to enter data.
- **Alternatives Considered**: Keeping raw JSON with a JSON editor plugin (rejected: still error-prone for non-dev users).

### 2. Dedicated `Service Category` Collection Type
- **Decision**: Create `api::service-category.service-category` with a One-to-Many relation to `Service`.
- **Rationale**: Allows content editors to add, rename, reorder (`order_by`), and activate/deactivate categories without code deployments.
- **Alternatives Considered**: Free-form string field (rejected: risks typos that fracture category filters).

### 3. Clear, Focused Scope for `Services Page` Single Type
- **Decision**: Define the actual listing and details page shared section titles in `services-page`:
  - **Listing Page (`/services`)**:
    - `header_title` (String, default: "Our Craftsmanship & Services")
    - `catalog_title` (String, default: "All Craftsmanship Offerings")
  - **Details Page Shared Section Titles (`/services/[slug]`)**:
    - `detail_switcher_title` (String, default: "Explore All Craftsmanship Services")
    - `workflow_badge_text` (String, default: "Step-by-Step Workflow")
    - `workflow_section_title` (String, default: "How We Deliver Service Excellence")
    - `workflow_section_subtitle` (Text, default: "Click on any step below to explore our meticulous quality control timeline.")
    - `features_section_title` (String, default: "Service Features & Quality Commitments")
    - `specifications_section_title` (String, default: "Technical Specifications & Standards")
    - `gallery_section_title` (String, default: "Completed Project Showcase")
    - `related_badge_text` (String, default: "Explore Complementary Offerings")
    - `related_section_title` (String, default: "Related Craftsmanship Services")
    - `consultation_button_text` (String, default: "Request Custom Consultation")
    - `whatsapp_inquiry_button_text` (String, default: "WhatsApp Inquiry")
  - **SEO**:
    - `seo` (Component: `shared.seo`)
- **Rationale**: Gives administrators full control over all section titles and CTA labels on both the listing page and every service details page, while keeping service-specific content (title, images, steps, specs) in the `Service` collection type.

### 4. 3-Layer Frontend Architecture with Graceful Fallbacks
- **Decision**:
  - Layer 1 (`servicesPageService.ts`, `service.service.ts`): Pure Strapi API fetchers using `fetchStrapiAPI` with tag caching (`services-page`, `services`, `service-categories`).
  - Layer 2 (`useServicesPage.ts`, `useServices.ts`): TanStack Query hooks with staleTime management.
  - Layer 3: Presentation components consuming Layer 2 hooks with mock fallback data when API returns empty.

## Risks / Trade-offs

- **[Existing Data Schema Migration]** → Existing service records with raw JSON fields could cause parsing mismatches.
  *Mitigation*: The frontend normalization function `normalizeStrapiService` will support both legacy array/string shapes and the new repeatable component structures seamlessly.
- **[Strapi Public Permissions]** → New single type and collection type are forbidden (403) until public permissions are enabled.
  *Mitigation*: Seed/configure permissions or document step in deployment checklist.
