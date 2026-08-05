## 1. Fallback & Query Refactoring

- [x] 1.1 Restore fallback arrays for `experiences` and `faq` in `src/services/homePageService.ts`.
- [x] 1.2 Remove `filters[is_active]` from `/crafted-experiences` and `/faqs` endpoints in `homePageService.ts`.

## 2. Component Fallback Wireup

- [x] 2.1 Update `Experiences.tsx` to fall back to `DEFAULT_EXPERIENCES` when Strapi returns 0 items.
- [x] 2.2 Update `Faq.tsx` to fall back to `DEFAULT_FAQ_ITEMS` when Strapi returns 0 items.

## 3. Verification

- [x] 3.1 Verify Experiences and FAQ sections display fallback items when Strapi records are empty, and display Strapi items when published in Strapi.
