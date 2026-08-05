## Purpose

Provides dynamic rendering of 3 service navigation columns in the Footer middle section based on Strapi `site-setting` `footer_sections` array.

## ADDED Requirements

### Requirement: Dynamic 3-Column Footer Services
The `FooterNavColumns` component SHALL render up to 3 service navigation columns dynamically from the `footer_sections` array in Strapi site settings.

#### Scenario: Admin edits service column links in Strapi
- **WHEN** admin updates service column items in Strapi Admin Panel
- **THEN** Footer middle section updates column links dynamically across all 3 columns
