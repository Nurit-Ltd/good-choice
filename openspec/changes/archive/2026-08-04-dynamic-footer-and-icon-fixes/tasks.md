## 1. Icon Fixes & Backend Seeding

- [x] 1.1 Fix corrupted `InstagramIcon` SVG path in `src/components/shared/svgs.tsx`.
- [x] 1.2 Update Strapi backend `src/bootstrap/seed.ts` and `scripts/seed-strapi.mjs` to seed `footer_sections`, `store_address`, `store_maps_url`, `support_email`, `support_phone`, and `social_links`.

## 2. Layer 1 API Service & Layer 2 Hook Expansion

- [x] 2.1 Update `src/services/siteSettingService.ts` to map `footer_sections`, `store_address`, `store_maps_url`, `support_email`, `support_phone`, and `social_links` from Strapi REST API.
- [x] 2.2 Expose mapped footer data in `useSiteSettings()` hook.

## 3. Component Integration

- [x] 3.1 Update `FooterTopHeader.tsx` to consume dynamic email and phone.
- [x] 3.2 Update `FooterNavColumns.tsx` to consume dynamic 3-column service links.
- [x] 3.3 Update `FooterBottomBar.tsx` to consume dynamic store address, maps link, and social links.
- [x] 3.4 Update `FooterCopyright.tsx` to consume dynamic copyright text.

## 4. Verification

- [x] 4.1 Verify Instagram and social icons render cleanly without distortion.
- [x] 4.2 Verify 100% visual layout parity and type safety (`npx tsc --noEmit`).
