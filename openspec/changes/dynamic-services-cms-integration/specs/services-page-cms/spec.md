## Purpose

Provides dedicated Strapi Single Type CMS management for the `/services` listing page header and the shared section titles/labels across all Service Details pages (`/services/[slug]`).

## ADDED Requirements

### Requirement: Services Page and Service Details Shared CMS Management
The Strapi CMS SHALL provide a Single Type (`services-page`) with fields for managing the services page header title, catalog section title, and shared section titles for the service details pages.

#### Scenario: Content Editor Configures Header Title and Catalog Title
- **WHEN** an admin updates `header_title` and `catalog_title` in Strapi Single Type `Services Page`
- **THEN** the `/services` page displays the updated custom header title in the top banner and the updated section title ("All Craftsmanship Offerings" replacement) above the card grid with on-demand ISR revalidation.

#### Scenario: Content Editor Configures Service Details Section Titles
- **WHEN** an admin updates `detail_switcher_title`, `workflow_section_title`, `features_section_title`, `specifications_section_title`, `gallery_section_title`, or `related_section_title` in `Services Page`
- **THEN** the Service Details pages at `/services/[slug]` display the configured section headings dynamically across all services.

#### Scenario: Fallback When Services Page CMS Data is Empty
- **WHEN** the Strapi `services-page` endpoint is unreachable or empty
- **THEN** the frontend gracefully renders default values for all listing and details page section headings without crashing.
