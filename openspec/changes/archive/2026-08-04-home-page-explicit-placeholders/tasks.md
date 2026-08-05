## 1. Dynamic Category Fetching & Service Update

- [x] 1.1 Update `getHomePageData()` in `src/services/homePageService.ts` to fetch `/categories?filters[is_active][$eq]=true&populate=*` and map real Strapi categories to `shopByRoom.items`.

## 2. ImageWithFallback & Section Placeholder Refactoring

- [x] 2.1 Update `ImageWithFallback.tsx` to render clean, explicit placeholder frames (neutral luxury gradient with Image/Package icon) when `src` is null or empty.
- [x] 2.2 Refactor `ShobByRoom.tsx` to display explicit placeholders for categories without uploaded images.
- [x] 2.3 Refactor `MadeFurniture.tsx`, `Collections.tsx`, and `Banner.tsx` to use explicit placeholder frames when Strapi media is null.

## 3. Verification & Type Safety

- [x] 3.1 Verify unpopulated Strapi categories/images display clear placeholders.
- [x] 3.2 Verify 100% visual layout parity and type safety (`npx tsc --noEmit`).
