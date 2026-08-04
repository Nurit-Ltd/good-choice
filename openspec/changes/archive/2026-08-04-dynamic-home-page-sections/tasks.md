## 1. Service & Layer 1/2 Data Mapping

- [x] 1.1 Update `getHomePageData()` in `src/services/homePageService.ts` to fetch and return complete `HomePageData` payload (categories for shop-by-room, craftsmanship stories, featured products for collections & explore, experiences, FAQ).

## 2. Component Refactoring to useHomePageData Hook

- [x] 2.1 Refactor `ShobByRoom.tsx` to consume dynamic shop by room data from `useHomePageData()`.
- [x] 2.2 Refactor `MadeFurniture.tsx` to consume dynamic craftsmanship data from `useHomePageData()`.
- [x] 2.3 Refactor `RecentlyCrafted.tsx` to consume dynamic products from `useHomePageData()` with skeleton loading state.
- [x] 2.4 Refactor `Collections.tsx` to map featured products (Option A) from `useHomePageData()` into its right-side sticky stream.
- [x] 2.5 Refactor `Explore.tsx` to consume dynamic products from `useHomePageData()` with skeleton loading state.
- [x] 2.6 Refactor `Experiences.tsx` and `Faq.tsx` to consume dynamic content from `useHomePageData()`.
- [x] 2.7 Update `src/app/page.tsx` to render the clean dynamic Home layout.

## 3. Verification & Type Safety

- [x] 3.1 Verify zero duplicate backend requests and smooth client rendering.
- [x] 3.2 Verify 100% visual layout parity and type safety (`npx tsc --noEmit`).
