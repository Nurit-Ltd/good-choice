## Why

The Home Page Hero Banner (`Banner.tsx`) needs to be fully dynamic, fetching its slides from Strapi REST API (`/hero-banners?populate=*`). It must support image-less fallback states with styled gradient backgrounds while preserving exact text positioning, single-slide static views, and multi-slide autoplay carousel transitions with continuous playback (removing hover pause behavior).

## What Changes

- Refactor `Banner.tsx` and `homePageService.ts` to consume dynamic hero banners from Strapi REST API (`/api/v1/hero-banners?populate=*`).
- Implement image-less fallback: if no image is uploaded or present, render a luxury gradient container (`bg-gradient-to-br from-[#FAF7F2] to-[#EFECE5]`) while keeping title and subtitle in the EXACT same bottom-left placement.
- Implement conditional controls:
  - If slide count <= 1: hide thumbnail row and autoplay progress bars.
  - If slide count > 1: enable GPU keyframe carousel transitions and thumbnail progress indicators.
- Remove mouse hover pause logic so autoplay runs continuously.
- Update Strapi backend `src/bootstrap/seed.ts` and `scripts/seed-strapi.mjs` to seed sample hero banners.

## Capabilities

### New Capabilities
- `dynamic-hero-banner`: Dynamic fetching of Hero Banners from Strapi REST API with image-less fallback, single vs multi-slide controls, and continuous autoplay.

### Modified Capabilities
<!-- None -->

## Impact

- **Affected Code**: `src/components/features/home/Banner.tsx`, `src/services/homePageService.ts`, `scripts/seed-strapi.mjs`, Strapi `src/bootstrap/seed.ts`.
- **APIs**: Strapi REST API (`/hero-banners`, `/home-page`).
- **Dependencies**: React Query, Next.js Image.
