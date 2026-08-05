## Purpose

Defines fallback behavior for Crafted Experiences and FAQ sections when Strapi backend data is empty, plus Strapi backend record structure.

## ADDED Requirements

### Requirement: Restore Experiences and FAQ default fallbacks
The system SHALL provide default fallback items ONLY for Crafted Experiences and FAQ sections when Strapi returns empty arrays.

#### Scenario: Empty experiences array from Strapi
- **WHEN** Strapi returns 0 items for `/crafted-experiences`
- **THEN** the system renders the 4 default handcrafted experience cards (New Sofa Making, Arabic Majlis Making, Dining Table Making, Dressing Mirror Making).

#### Scenario: Empty FAQs array from Strapi
- **WHEN** Strapi returns 0 items for `/faqs`
- **THEN** the system renders the 5 default FAQ accordion items (Shipping, Returns, Furniture care, Warranty, Tracking).

### Requirement: Fix Strapi API filter queries
The system SHALL query `/crafted-experiences?sort=order_by:asc&populate=*` and `/faqs?sort=order_by:asc&populate=*` without filtering on nonexistent `is_active` fields.

#### Scenario: Fetching Strapi endpoints
- **WHEN** homePageService queries Strapi for experiences or FAQs
- **THEN** the REST request succeeds cleanly without Strapi 400/500 query errors.
