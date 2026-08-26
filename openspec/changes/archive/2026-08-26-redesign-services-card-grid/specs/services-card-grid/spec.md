## Purpose

Provides a responsive, uniform, and luxury minimalist card grid system for browsing and discovering bespoke craftsmanship services without article/blog clutter or intrusive pricing tags.

## ADDED Requirements

### Requirement: Uniform Responsive Service Grid Layout
The system SHALL display all available craftsmanship services in an equal-height, balanced card grid that adapts smoothly across all viewport widths.

#### Scenario: Mobile Viewport Rendering
- **WHEN** a user visits the `/services` page on a viewport width below 640px
- **THEN** the services MUST render in a single-column stacked layout with full container width and equal card proportions

#### Scenario: Tablet and Desktop Viewport Rendering
- **WHEN** a user visits the `/services` page on a viewport width of 640px to 1023px (tablet) or 1024px and above (desktop)
- **THEN** the services MUST render in 2 columns on tablet and 3 columns on desktop without any asymmetrical bento multi-column span

### Requirement: Luxury Studio Minimalist Card Presentation
Each service card SHALL present the craftsmanship visual with consistent aspect ratio, category badge, numbered index, craft micro-tags, and an interactive exploration link, without displaying raw price indicators.

#### Scenario: Visual and Content Presentation
- **WHEN** any service card renders in the catalog
- **THEN** it SHALL display the service image with a locked aspect ratio, an overlaid sequence number, a category badge, a truncated title, a two-line maximum description, and key capability tag pills

#### Scenario: Anti-Broken Line Text Constraints
- **WHEN** service titles or descriptions exceed available horizontal space on any device
- **THEN** typography MUST truncate cleanly using line-clamps to prevent layout breakage or mismatched card heights

### Requirement: Service Discovery and Live Filtering
The system SHALL allow filtering by craft category and real-time textual search across titles and descriptions with an interactive reset state when no matches are found.

#### Scenario: Filtering by Category
- **WHEN** a user clicks on a category pill
- **THEN** the grid SHALL immediately update to show only services associated with that category

#### Scenario: Empty Search Fallback
- **WHEN** a user enters a search query that yields no matching services
- **THEN** the system SHALL display a polished empty state with a reset button that clears the search query and restores all items
