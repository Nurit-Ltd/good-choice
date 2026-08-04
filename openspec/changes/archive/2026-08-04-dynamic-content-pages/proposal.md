## Why

The About Us, Terms & Conditions, and Privacy Policy pages currently render static/hardcoded text in UI components despite having backend schemas and API service hooks available. Making these pages 100% dynamic through Strapi CMS and seeding initial default entries in the backend ensures CMS admins can update content dynamically. When content or images are missing from Strapi CMS, explicit placeholders/empty-state badges will be displayed instead of misleading static text fallbacks, allowing admins/developers to immediately detect missing data or API issues.

## What Changes

- **Strapi Backend Seeding**: Add seed handlers in `seed.ts` for `about-page` (Single Type) and `page` collection entries for `terms` and `privacy-policy` so Strapi populates default published content on startup.
- **About Us Page Dynamic UI**: Refactor `HeroAbout`, `DescriptionAbout`, `VisionaryBrand`, `Handcraft`, and `ApproachLuxury` to consume live Strapi data from `useAboutPage()`.
- **Terms & Privacy Pages Dynamic UI**: Connect `TermsConditionsPage` and `PrivacyPolicyPage` to `useContentPage("terms")` and `useContentPage("privacy-policy")` to render dynamic sections and table of contents.
- **Admin-Aware Placeholders & Skeleton Loading**: Render visible placeholder cards/badges when media or content is unpopulated in Strapi CMS, alerting admins to missing CMS content without crashing the UI.

## Capabilities

### New Capabilities
- `content-pages-dynamic-cms`: Full dynamic rendering, Strapi seeding, and admin placeholder handling for About Us, Terms & Conditions, and Privacy Policy content pages.

### Modified Capabilities
<!-- None -->

## Impact

- **Backend**: `src/bootstrap/seed.ts` in Strapi backend.
- **Frontend Services**: `src/services/aboutPageService.ts`, `src/services/contentPageService.ts`, `src/hooks/use-about-page.ts`, `src/hooks/use-content-page.ts`.
- **Frontend UI**: `src/components/features/about/*`, `src/app/(shop)/about/page.tsx`, `src/app/(shop)/terms/page.tsx`, `src/app/(shop)/privacy-policy/page.tsx`.
