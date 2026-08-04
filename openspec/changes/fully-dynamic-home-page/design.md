## Context

See `proposal.md` for motivation. Currently `src/services/homePageService.ts` defines a `DEFAULT_HOME_DATA` constant containing fallback strings and hardcoded arrays for experiences and FAQs.

## Goals / Non-Goals

**Goals:**
- Refactor `getHomePageData()` to fetch `/crafted-experiences` and `/faqs` endpoints from Strapi v5.
- Eliminate static fallback strings in `DEFAULT_HOME_DATA` so that components display actual Strapi data or clean empty state placeholders.
- Update `ImageWithFallback` to render a subtle SVG image placeholder when `src` is missing or empty.
- Ensure components cleanly handle empty titles/subtitles/items without throwing runtime errors or displaying dummy text.

**Non-Goals:**
- Redesigning the layout structure or CSS styling of home components.
- Modifying Strapi database schemas (endpoints `/crafted-experiences` and `/faqs` already exist in Strapi).

## Decisions

### Decision 1: Strapi REST queries for Experiences & FAQs
- **Approach**: Add `fetchStrapiAPI('/crafted-experiences?filters[is_active][$eq]=true&sort=order_by:asc')` and `fetchStrapiAPI('/faqs?filters[is_active][$eq]=true&sort=order_by:asc')` calls inside `getHomePageData()`.
- **Rationale**: Replaces hardcoded `DEFAULT_HOME_DATA.experiences.items` and `DEFAULT_HOME_DATA.faq.items`.

### Decision 2: Image and Content Fallback Strategy
- **Approach**:
  - Image URLs: Use `ImageWithFallback` with a standard fallback placeholder path `/images/placeholder.svg` or an inline Data URI / SVG component when no URL is returned.
  - Text fields: Return empty string `""` or `undefined` from `homePageService.ts`. In components, if mandatory title or list items are missing, render an admin-friendly empty state indicator or render empty space cleanly.

## Risks / Trade-offs

- [Risk]: If Strapi CMS has no content entered yet for a section, the section may show an empty list or placeholder.
  - **Mitigation**: Add clean empty states (`EmptyState` component or inline placeholder badge) so store admins immediately recognize missing content in CMS.
