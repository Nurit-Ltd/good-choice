## Purpose

Automatically aggregates all photography uploaded across active services into the craftsmanship gallery, provides dynamic category-based filtering, and exposes gallery headings and CTA button labels through the Strapi CMS single-type interface.

## ADDED Requirements

### Requirement: Automated Services Image Aggregation
The gallery system SHALL fetch all active services from the CMS and dynamically extract each service's cover image and project showcase photography to construct unified gallery items without requiring separate manual entries in a standalone gallery collection.

#### Scenario: Services imagery populates gallery items
- **WHEN** the `/gallery` page loads
- **THEN** the system fetches active services with media populated, extracts the cover image and all showcase gallery photos, calculates aspect ratios based on image dimensions, and renders them in the masonry grid.

#### Scenario: Service metadata attachment
- **WHEN** a gallery item is extracted from a service
- **THEN** it SHALL be associated with the parent service's category name, service title, service slug, and display order index.

### Requirement: Dynamic Category Filter Tabs
The gallery filter system SHALL derive category filter tabs dynamically from the distinct categories of active services rather than using a hardcoded static list.

#### Scenario: Filter tabs generated from active service categories
- **WHEN** the gallery renders category filter pills
- **THEN** it displays an "All" tab with total image count followed by distinct service category pills (e.g., Bespoke Furniture, Arabic Majlis) with their respective item counts.

#### Scenario: Selecting a category filters the masonry grid
- **WHEN** a user clicks a specific category pill
- **THEN** the grid updates immediately to show only images associated with services in that category, and the counter reflects the filtered count.

### Requirement: Dynamic Gallery Page Configuration via Strapi Single Type
The gallery page SHALL load its top banner title, catalog section heading, search input placeholder, and lightbox CTA button labels directly from the Strapi `Gallery Page` single type.

#### Scenario: Catalog heading, search placeholder, and action buttons load from CMS
- **WHEN** the gallery page mounts
- **THEN** the catalog title above the filter bar, the search placeholder, and the lightbox action buttons render using the strings configured in Strapi CMS, falling back to sensible defaults if empty.

#### Scenario: Top banner displays title without subtitle
- **WHEN** the gallery header renders
- **THEN** it displays the header title from CMS without a subtitle block.

### Requirement: Clean Presentation without Tag Clutter
The gallery cards and interactive lightbox modal SHALL display craftsmanship photography cleanly without rendering tag pills or redundant copy-pasted paragraph blocks.

#### Scenario: Gallery cards and lightbox modal display without tag badges
- **WHEN** viewing cards in the masonry grid or opening a photo in the lightbox modal
- **THEN** no tag pill badges are rendered, and each item prominently displays its category badge and service title.

### Requirement: Lightbox Direct Service Conversion Actions
The lightbox modal SHALL provide direct conversion links to explore the related service and initiate a WhatsApp consultation.

#### Scenario: User clicks Explore Service button
- **WHEN** a user clicks the service link button in the lightbox modal
- **THEN** the user is navigated to `/services/[serviceSlug]` corresponding to that project's service.

#### Scenario: User clicks Inquire on WhatsApp button
- **WHEN** a user clicks the WhatsApp button in the lightbox modal
- **THEN** a new window opens linking to WhatsApp with a prefilled inquiry message referencing the service title.
