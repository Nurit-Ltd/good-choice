## Purpose

Provides dynamic fetching and rendering of Footer logo, contact email, support phone, store physical address, quick links, and social URLs from Strapi REST API (`/site-setting`).

## ADDED Requirements

### Requirement: Dynamic Footer Site Settings Integration
The Footer components SHALL query store settings from Strapi REST API (`/api/v1/site-setting`) and dynamically display contact info, address, quick links, and social links.

#### Scenario: User views page footer
- **WHEN** user scrolls to the bottom of any page
- **THEN** Footer displays dynamic contact email, phone, store address with map link, and social links from Strapi

#### Scenario: Fallback when site settings query is loading
- **WHEN** site settings query is loading or unreachable
- **THEN** system renders default fallback footer links and contact info without breaking layout
