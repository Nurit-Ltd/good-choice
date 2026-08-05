# dynamic-mega-menu-and-promos Specification

## Purpose
Maps Strapi Parent-Child category tree and promotional ad banners dynamically into the Navbar Mega Menu panel, ensuring a strict 8-item grid cap and single-line text truncation.
## Requirements
### Requirement: Dynamic Parent-Child Mega Menu Grid Mapping
The Mega Menu panel SHALL query top-level parent categories with populated children (`/api/v1/categories?filters[parent][$null]=true&populate=children`) and render them as Mega Menu columns.

#### Scenario: Rendering Mega Menu categories
- **WHEN** user hovers over "Product" navigation link in Navbar
- **THEN** Mega Menu panel displays up to 8 Parent Categories in a balanced 4-column x 2-row grid with their respective child subcategories

### Requirement: Layout Safety & Text Truncation
The Mega Menu panel SHALL enforce single-line text truncation (`whitespace-nowrap truncate`) on all category titles and sub-item labels to prevent layout distortion or awkward line wraps.

#### Scenario: Admin enters long category name
- **WHEN** a category title or sub-item label exceeds the available column width
- **THEN** system clips the text cleanly with ellipsis (`...`) without breaking the 4-column grid layout

### Requirement: Dynamic Promotional Campaign Banners
The Mega Menu panel SHALL query active promotional ad banners (`/api/v1/ads-banners?filters[placement][$eq]=mega_menu`) and render up to 2 promo cards with image URLs and clickable target links.

#### Scenario: User clicks Mega Menu promo card
- **WHEN** user clicks a promo card inside Mega Menu
- **THEN** system navigates to the configured target link URL (e.g. `/products?tag=just-in`)

