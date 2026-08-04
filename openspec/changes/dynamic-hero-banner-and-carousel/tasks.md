## 1. Backend Seeding & Service Update

- [x] 1.1 Update Strapi backend `src/bootstrap/seed.ts` and `scripts/seed-strapi.mjs` to seed multiple hero banners (`Hero Banner 1`, `Hero Banner 2`).
- [x] 1.2 Update `getHomePageData()` in `src/services/homePageService.ts` to map hero banner slides (`id`, `image`, `alt`, `title`, `subtitle`).

## 2. Banner Component Refactoring

- [x] 2.1 Refactor `Banner.tsx` to handle image-less fallback state with gradient background while preserving exact bottom-left text positioning.
- [x] 2.2 Hide thumbnail controls and autoplay progress bar when `slides.length <= 1`.
- [x] 2.3 Remove mouse hover pause handlers (`onMouseEnter`/`onMouseLeave`) so autoplay runs continuously.

## 3. Verification & Type Safety

- [x] 3.1 Verify single slide, multi slide, and image-less states.
- [x] 3.2 Verify 100% visual layout parity and type safety (`npx tsc --noEmit`).
