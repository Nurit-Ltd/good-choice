# strapi-data-seeding-and-placeholders Specification

## Purpose
Provides automated seeding of existing frontend text mock data, navbar navigation links, footer contact info, and site settings into local Strapi v5 PostgreSQL database and handles missing image media with elegant placeholder icons and styled backgrounds to preserve 100% UI visual design and layout integrity.
## Requirements
### Requirement: Strapi Database Text & Navigation Data Seeding
The project SHALL include an automated seeding script that populates local Strapi v5 Content Types (Products, Categories, Brands, Home Page configuration, FAQs) and Single Types (`site-setting`) with:
- Products, Categories, and Brands metadata.
- Navbar navigation menu links and mega-menu categories.
- Footer contact info (phone, email, address, WhatsApp), social links, footer bio, and copyright text.

#### Scenario: Running seed script against local Strapi
- **WHEN** developer runs the Strapi seed command/script
- **THEN** script populates Strapi REST API endpoints (`/products`, `/categories`, `/site-setting`, etc.) with full text, navigation links, and site configuration without throwing errors

### Requirement: Navbar & Footer Dynamic Integrity
The application SHALL render Navbar navigation links, mega-menus, contact numbers, and Footer details dynamically from Strapi while preserving fixed vector icons and preventing any visual layout collapse.

#### Scenario: Rendering Navbar and Footer with dynamic site settings
- **WHEN** application loads site settings and navigation data from Strapi API
- **THEN** Navbar menu items and Footer info display seeded values accurately with intact icon styling

### Requirement: Stylish Image Placeholder Fallback
The frontend image rendering logic SHALL provide a modern placeholder UI (featuring a refined vector icon and subtle styled background gradient/color) whenever an asset URL is missing or null, ensuring no layout breakage or image aspect ratio collapse occurs.

#### Scenario: Product or category has no image uploaded in Strapi
- **WHEN** component renders a product card or category item whose image URL is missing or null
- **THEN** system renders a styled placeholder box with a sleek icon (e.g. `Package` or `Armchair`) matching the exact container dimensions and aspect ratio

