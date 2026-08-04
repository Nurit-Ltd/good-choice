## Why

The store owner requested to keep sensible default fallbacks ONLY for the `Crafted Experiences` and `FAQ` sections when Strapi returns empty arrays, while clarifying how store administrators can add and manage Experience and FAQ entries in the Strapi v5 Content Manager.

## What Changes

- Restore default fallback arrays for `Crafted Experiences` and `FAQ` sections in `homePageService.ts` / frontend components when Strapi backend returns empty lists.
- Fix Strapi REST API query filters for `/crafted-experiences` and `/faqs` (remove nonexistent `is_active` filter, use `sort=order_by:asc`).
- Document exact Strapi Content Manager steps and data schemas for adding `Crafted Experiences` and `FAQ Items` in the backend.

## Capabilities

### New Capabilities
- `experiences-faq-fallback`: Fallback data handling for Experiences and FAQ sections plus Strapi backend management guidance.

### Modified Capabilities

## Impact

- `src/services/homePageService.ts`: Query endpoints adjusted (`/crafted-experiences?sort=order_by:asc`, `/faqs?sort=order_by:asc`) and fallback arrays restored for experiences and FAQs when Strapi returns empty results.
- Strapi Content Manager: Guidance provided on creating entries for `20. Crafted Experiences` and `19. FAQ Items`.
