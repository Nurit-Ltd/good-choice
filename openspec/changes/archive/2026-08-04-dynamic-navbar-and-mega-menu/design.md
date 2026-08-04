## Context

See `proposal.md` for motivation. The Navbar currently uses static configuration from `siteConfig.navLinks`. To make the Navbar and Mega Menu fully dynamic while guaranteeing 0% layout breakage, we will implement a Hybrid Relational Fetching strategy.

## Goals / Non-Goals

**Goals:**
- Dynamically fetch Navbar site settings (`site-setting`), Parent-Child categories (`categories`), and Mega Menu promo cards (`ads-banners`) from Strapi REST API (`/api/v1`).
- Enforce strict 8-item grid capping (4 columns × 2 rows matrix) for Parent Categories in `MegaMenuPanel.tsx`.
- Apply `whitespace-nowrap truncate` to category headers and sub-items to prevent line wrapping.
- Seed example navbar links, parent-child categories, and promo cards into Strapi via `scripts/seed-strapi.mjs` and Strapi `src/bootstrap/seed.ts` for immediate admin control from `http://localhost:1337/admin`.
- Maintain 100% visual layout parity with zero CSS/design changes.

**Non-Goals:**
- Changing vector icons in Navbar (icons stay fixed, text/links/images are dynamic).

## Decisions

1. **Parent-Child Category Fetching for Mega Menu**:
   - *Decision*: Query `/api/v1/categories?filters[parent][$null]=true&populate=children`.
   - *Rationale*: Parent categories form grid column headers, and `children` form the subcategory link list.

2. **Capping & Truncation**:
   - *Decision*: Apply `categories.slice(0, 8)` and CSS `whitespace-nowrap truncate`.
   - *Rationale*: Guarantees a perfectly balanced 4×2 grid and prevents long category titles from breaking into multiple lines.

3. **Promotional Cards Dynamic Placement**:
   - *Decision*: Query `/api/v1/ads-banners?filters[placement][$eq]=mega_menu&filters[is_active][$eq]=true`.
   - *Rationale*: Allows admins to create, update, or schedule promo cards with custom campaign links and images via Strapi Admin.

## Risks / Trade-offs

- [Admin enters more than 8 categories] → System safely renders top 8 categories in Mega Menu grid while all categories remain accessible via the main `/products` catalog page.
