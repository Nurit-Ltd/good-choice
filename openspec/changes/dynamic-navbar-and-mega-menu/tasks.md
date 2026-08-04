## 1. Backend Seeding & Schema Verification

- [x] 1.1 Update Strapi backend `src/bootstrap/seed.ts` to include Parent-Child Category relations (e.g. `Living Room` -> `Armchairs`, `Sofas`, `Coffee Tables`) and Promo Ads Banners (`Just In`, `Outlet` placement: `mega_menu`).
- [x] 1.2 Update `scripts/seed-strapi.mjs` with sample Parent-Child category seeding and Ads Banners for frontend testing.

## 2. Layer 1 API Services & Layer 2 Hooks

- [x] 2.1 Add `getMegaMenuData()` in `src/services/catalogService.ts` or `src/services/siteSettingService.ts` to fetch Parent Categories with `children` and active `mega_menu` promo banners.
- [x] 2.2 Add `useMegaMenu()` Layer 2 React Query hook to expose dynamic Mega Menu categories and promo cards to Navbar.

## 3. UI Component Integration & Layout Protection

- [x] 3.1 Refactor `MegaMenuPanel.tsx` to accept dynamic categories (capped at max 8 items) and dynamic promo cards.
- [x] 3.2 Add `whitespace-nowrap truncate` styling to category titles and sub-item links in `MegaMenuPanel.tsx` and `DesktopNav.tsx` to prevent line-wrapping.
- [x] 3.3 Update `Navbar.tsx` to consume dynamic site settings, logo, announcement bar, and Mega Menu data.

## 4. Verification & Admin Workflow Testing

- [x] 4.1 Verify Navbar and Mega Menu render dynamically with seeded Strapi data.
- [x] 4.2 Verify 100% visual layout parity (4×2 balanced grid, no broken lines, smooth hover behavior).
