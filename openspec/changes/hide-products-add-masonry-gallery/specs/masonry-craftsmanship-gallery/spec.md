## Purpose

Provides a dynamic, high-performance Pinterest-style multi-column masonry gallery showcasing real craftsmanship projects across custom furniture, upholstery, majlis, dining, and spatial interiors with interactive filtering and full-screen lightbox preview.

## ADDED Requirements

### Requirement: Dynamic Multi-Column Masonry Layout
The system SHALL render gallery craftsmanship images in a seamless, multi-column CSS masonry layout that naturally accommodates variable heights and aspect ratios without awkward empty vertical gaps.

#### Scenario: Responsive Column Breakpoints
- **WHEN** a user visits `/gallery` on mobile, tablet, or desktop viewports
- **THEN** the gallery SHALL render in 1 column on mobile (<640px), 2 columns on tablet (640px-768px), 3 columns on medium screens (768px-1024px), and 4 columns on large desktop viewports (1024px+)

#### Scenario: Natural Aspect Ratio Rendering
- **WHEN** gallery items with diverse aspect ratios (tall, portrait, square, wide landscape) are loaded
- **THEN** images SHALL render using their native aspect ratios without distortion or arbitrary cropping

### Requirement: Category Filtering and Live Search
The system SHALL allow filtering gallery images by craftsmanship category (e.g., Sofas, Majlis, Beds, Dining, Lighting) and searching by project titles.

#### Scenario: Category Filter Selection
- **WHEN** a user selects a category pill
- **THEN** the masonry grid SHALL dynamically re-balance to show only items matching that category

### Requirement: Full-Screen Interactive Lightbox
The system SHALL provide a full-screen modal lightbox when any gallery image is clicked, allowing image zooming, next/prev cycling, and direct WhatsApp inquiry.

#### Scenario: Opening Lightbox Modal
- **WHEN** a user clicks on any gallery image card
- **THEN** a full-screen lightbox modal SHALL open displaying the high-resolution photo, craft details, category badge, and an inquiry button
