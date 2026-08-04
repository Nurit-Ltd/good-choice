# dynamic-navbar-navigation Specification

## Purpose
Provides dynamic fetching and rendering of Navbar top-level navigation links, announcement bar message, brand logo, and contact action buttons from Strapi REST API (`/site-setting`).
## Requirements
### Requirement: Dynamic Navbar Site Settings Integration
The Navbar component SHALL load site settings, navigation links, announcement bar text, and logo URLs dynamically from Strapi REST API (`/api/v1/site-setting`).

#### Scenario: User opens page
- **WHEN** user loads any page in the application
- **THEN** Navbar displays dynamic announcement bar, logo, and top-level navigation items fetched from Strapi

#### Scenario: Site settings API loading or fallback
- **WHEN** site settings query is loading or Strapi is unreachable
- **THEN** system renders default navigation links without layout shifting or broken components

