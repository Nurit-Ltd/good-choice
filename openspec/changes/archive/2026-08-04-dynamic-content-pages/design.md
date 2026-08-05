## Context

See `proposal.md`. Currently, `about-page` (Single Type) and `page` (Collection Type for `terms` & `privacy-policy`) exist in Strapi v5 schema, but Strapi DB seeding is missing these content types. On the frontend, Layer 1 services (`aboutPageService.ts`, `contentPageService.ts`) and Layer 2 hooks (`use-about-page.ts`, `use-content-page.ts`) exist, but the UI components in `src/components/features/about/*`, `/terms/page.tsx`, and `/privacy-policy/page.tsx` render static copy.

## Goals / Non-Goals

**Goals:**
- Update `seed.ts` in Strapi backend to automatically seed published data for `about-page`, `page` (`terms`), and `page` (`privacy-policy`).
- Connect all About Us components (`HeroAbout`, `DescriptionAbout`, `VisionaryBrand`, `Handcraft`, `ApproachLuxury`) to `useAboutPage()`.
- Connect `/terms` and `/privacy-policy` to `useContentPage()`.
- Implement visual placeholder cards/badges when CMS images or content fields are empty, ensuring admins easily identify missing CMS data while keeping the layout intact.

**Non-Goals:**
- Modifying database schemas or creating new Strapi content types (existing schemas are 100% adequate).
- Altering core header, navbar, or footer components (which are already fully dynamic).

## Decisions

1. **Strapi Seed Automation in `seed.ts`**:
   - Add seeding blocks for `api::about-page.about-page` and `api::page.page` (`terms` and `privacy-policy`).
   - Use Strapi Document Service `strapi.documents('api::...').create({ data: ..., status: 'published' })` to ensure entries are immediately live.

2. **Admin-Aware Placeholders over Silent Mock Text**:
   - Instead of falling back to hardcoded dummy text when an API field is empty/null, render explicit placeholder UI elements (e.g. `[CMS Image Missing]` or skeleton placeholder blocks) when in dev/admin view.
   - This alerts content managers that data is unpopulated in Strapi CMS without breaking the page.

3. **TanStack React Query Cache Strategy**:
   - Set `staleTime: 1000 * 60 * 30` (30 mins) for content pages in Layer 2 hooks with on-demand tag revalidation.

## Risks / Trade-offs

- **[Risk]**: Unpopulated image field rendering broken image icons.
  - **Mitigation**: Wrap all Next.js `<Image />` tags with null-checks and a styled `CmsImagePlaceholder` component when `src` is missing or invalid.
