## Purpose

Provides 100% dynamic CMS content, automated database seeding, and explicit admin-aware placeholders for About Us, Terms & Conditions, and Privacy Policy pages.

## ADDED Requirements

### Requirement: Strapi Backend Initial Seeding
The Strapi backend SHALL seed default initial content for `about-page` (Single Type) and `page` collection entries (`terms` and `privacy-policy`) upon server startup if database entries are missing.

#### Scenario: Server starts up with empty database
- **WHEN** Strapi backend starts and detects no entry for `about-page` or `page` (`terms`, `privacy-policy`)
- **THEN** Strapi automatically populates published entries into the PostgreSQL/SQLite database with complete initial copy and structured JSON sections.

### Requirement: Dynamic Content Pages UI
The frontend pages (`/about`, `/terms`, `/privacy-policy`) SHALL fetch and render content dynamically from Strapi CMS REST APIs.

#### Scenario: About Us page rendering
- **WHEN** a user navigates to `/about`
- **THEN** the page fetches `/about-page?populate=*` and renders hero images, philosophy text, stats, handcraft cards, founder details, and luxury approach items from Strapi API response.

#### Scenario: Terms and Privacy Policy page rendering
- **WHEN** a user navigates to `/terms` or `/privacy-policy`
- **THEN** the page queries Strapi API for the corresponding `slug` (`terms` or `privacy-policy`) and dynamically renders the navigation sidebar and section cards.

### Requirement: Explicit Admin-Aware Placeholders & Badges
When specific CMS media or section data is unpopulated or missing from Strapi API, the frontend SHALL render explicit placeholder indicators (e.g. "Image missing in Strapi CMS" or skeleton placeholders) instead of masking missing backend data with hardcoded copy.

#### Scenario: Missing image or text field in Strapi CMS
- **WHEN** a content manager clears or omits an image or text field in Strapi CMS
- **THEN** the frontend component renders a styled placeholder badge/card clearly indicating missing CMS data, allowing admins to notice and update it in the Strapi Content Manager.
