## Context

See `proposal.md` for motivation. The Footer currently hardcodes service link columns, email, phone number, address, and has a broken `InstagramIcon` SVG path.

## Goals / Non-Goals

**Goals:**
- Fix `InstagramIcon` SVG path in `src/components/shared/svgs.tsx` so all social icons render cleanly.
- Dynamically fetch footer data from Strapi REST API (`/api/v1/site-setting`) using `useSiteSettings()`.
- Dynamically render 3 service link columns in `FooterNavColumns.tsx` from `footer_sections`.
- Dynamically render contact email, phone number, address, and social links in `FooterTopHeader.tsx`, `FooterBottomBar.tsx`, and `FooterCopyright.tsx`.
- Update Strapi backend `src/bootstrap/seed.ts` and `scripts/seed-strapi.mjs` with full example seeding for footer links, address, and social URLs.

**Non-Goals:**
- Changing the glassmorphic container layout or styling tokens of the Footer (UI design remains 100% untouched).

## Decisions

1. **Footer Data Source**:
   - *Decision*: Extend `siteSettingService.ts` and `useSiteSettings()` to map `footer_sections`, `store_address`, `store_maps_url`, `support_email`, `support_phone`, `social_links`, and `copyright_text`.
   - *Rationale*: Reuses the existing `site-setting` Single Type in Strapi and provides single-point management in Strapi Admin.

2. **Instagram Icon Vector Fix**:
   - *Decision*: Replace corrupted SVG path in `InstagramIcon` in `src/components/shared/svgs.tsx` with a standard 24x24/32x32 clean Instagram vector.
   - *Rationale*: Eliminates distortion while maintaining stroke/fill color inheritance.

## Risks / Trade-offs

- None. Default fallbacks in `siteConfig.ts` will continue to protect rendering if API is loading or unreachable.
