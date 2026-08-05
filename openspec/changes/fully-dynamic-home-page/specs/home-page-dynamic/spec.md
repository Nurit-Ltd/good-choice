## Purpose

Defines requirements for 100% dynamic home page rendering backed by Strapi CMS APIs, handling empty states and missing image placeholders without fallback static text.

## ADDED Requirements

### Requirement: Remove static default data fallbacks
The system SHALL fetch all home page content from Strapi CMS endpoints and MUST NOT render hardcoded text or hardcoded content arrays as fallbacks when Strapi returns empty or missing fields.

#### Scenario: Missing text fields in Strapi response
- **WHEN** Strapi home-page response contains missing or empty text fields
- **THEN** the system renders a clean empty state UI indicator or omits empty text without rendering static demo/hardcoded text.

### Requirement: Connect Crafted Experiences to Strapi
The system SHALL fetch Crafted Experiences items from the Strapi `/crafted-experiences` API endpoint instead of hardcoded local arrays.

#### Scenario: Loading Crafted Experiences from Strapi
- **WHEN** the home page component requests Crafted Experiences data
- **THEN** the system queries Strapi `/crafted-experiences` with active status filters and displays the dynamic experience items.

### Requirement: Connect FAQ section to Strapi
The system SHALL fetch FAQ items from the Strapi `/faqs` API endpoint instead of hardcoded local arrays.

#### Scenario: Loading FAQs from Strapi
- **WHEN** the home page component requests FAQ data
- **THEN** the system queries Strapi `/faqs` with active status filters and displays dynamic FAQ questions and answers.

### Requirement: Image placeholder handling
The system SHALL display a clean placeholder image whenever a component image URL is missing, invalid, or empty.

#### Scenario: Missing image URL in Strapi media
- **WHEN** an image URL in a home page section is missing or empty
- **THEN** the system renders a standard SVG placeholder image rather than broken image icons or silent layout collapse.
