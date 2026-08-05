## 1. Strapi Backend Seeding

- [x] 1.1 Add seeding block for `api::about-page.about-page` in `src/bootstrap/seed.ts` (Strapi backend).
- [x] 1.2 Add seeding blocks for `api::page.page` (`terms` and `privacy-policy`) in `src/bootstrap/seed.ts` (Strapi backend).

## 2. Shared CMS Placeholder Utilities

- [x] 2.1 Create reusable `CmsImagePlaceholder` & missing data badge components for UI alerting when Strapi fields are unpopulated.

## 3. Dynamic About Us Page Integration

- [x] 3.1 Refactor `HeroAbout` (`src/components/features/about/hero-about.tsx`) to consume `useAboutPage()`.
- [x] 3.2 Refactor `DescriptionAbout` (`src/components/features/about/description-about.tsx`) to consume `useAboutPage()`.
- [x] 3.3 Refactor `VisionaryBrand` (`src/components/features/about/visionary-brand.tsx`) to consume `useAboutPage()`.
- [x] 3.4 Refactor `Handcraft` (`src/components/features/about/handcraft.tsx`) to consume `useAboutPage()`.
- [x] 3.5 Refactor `ApproachLuxury` (`src/components/features/about/approach-luxury.tsx`) to consume `useAboutPage()`.

## 4. Dynamic Legal Pages Integration

- [x] 4.1 Refactor `TermsConditionsPage` (`src/app/(shop)/terms/page.tsx`) to consume `useContentPage("terms")`.
- [x] 4.2 Refactor `PrivacyPolicyPage` (`src/app/(shop)/privacy-policy/page.tsx`) to consume `useContentPage("privacy-policy")`.
- [x] 4.3 Verify build and runtime functionality for all 3 pages.
