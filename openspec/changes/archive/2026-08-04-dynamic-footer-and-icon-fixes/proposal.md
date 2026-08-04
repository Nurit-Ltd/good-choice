## Why

The Footer component currently uses hardcoded text, contact information, service column link lists, and has a distorted Instagram SVG icon. Connecting the entire Footer dynamically to the Strapi REST API (`http://localhost:1337/api/v1/site-setting`) and fixing the vector SVG path for `InstagramIcon` will allow admins to control all footer content, address details, email/phone links, and social links from the Strapi Admin Panel while ensuring pixel-perfect vector icons.

## What Changes

- Fix the corrupted SVG coordinate path for `InstagramIcon` in `src/components/shared/svgs.tsx`.
- Connect Footer (`FooterTopHeader.tsx`, `FooterNavColumns.tsx`, `FooterBottomBar.tsx`, `FooterCopyright.tsx`) to Strapi `site-setting` API using `useSiteSettings()` hook.
- Map the 3 Service Navigation Columns dynamically from `footer_sections` in Strapi `site-setting`.
- Map Footer Contact Info (email, phone, address, map link) and Social Links (WhatsApp, Facebook, Instagram) dynamically.
- Update Strapi backend `src/bootstrap/seed.ts` and `scripts/seed-strapi.mjs` to include complete example footer section links, address details, and social links so admins can manage them immediately from Strapi Admin.

## Capabilities

### New Capabilities
- `dynamic-footer-settings`: Dynamic rendering of Footer logo, contact email, phone, quick links, store address, and social links from Strapi site settings API.
- `dynamic-footer-service-columns`: Dynamic rendering of 3-column service links from Strapi site setting `footer_sections`.
- `vector-social-icon-fixes`: Vector SVG path correction for `InstagramIcon` to eliminate distortion.

### Modified Capabilities
<!-- None -->

## Impact

- **Affected Code**: `src/components/layout/Footer.tsx`, `src/components/layout/footer/FooterTopHeader.tsx`, `src/components/layout/footer/FooterNavColumns.tsx`, `src/components/layout/footer/FooterBottomBar.tsx`, `src/components/layout/footer/FooterCopyright.tsx`, `src/components/shared/svgs.tsx`, `src/services/siteSettingService.ts`, `scripts/seed-strapi.mjs`, Strapi `src/bootstrap/seed.ts`.
- **APIs**: Strapi REST API (`/site-setting`).
- **Dependencies**: React Query, Lucide Icons, Next.js Image.
