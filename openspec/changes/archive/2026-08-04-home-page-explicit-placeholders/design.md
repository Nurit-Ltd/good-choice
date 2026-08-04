## Context

See `proposal.md` for motivation. Currently, fallback values use static demo images (e.g. `/images/home/room/room-1.png`), making it look as though mock data is populated.

## Goals / Non-Goals

**Goals:**
- Update `homePageService.ts` to fetch `/categories?filters[is_active][$eq]=true&populate=*`.
- Update `ImageWithFallback.tsx` to render a clean, luxury placeholder container when `src` is missing or null, displaying an Image/Camera placeholder icon and neutral luxury background.
- Ensure unpopulated images in `ShopByRoom`, `MadeFurniture`, `Collections`, and `Banner` display explicit placeholder frames so the Admin knows data is unpopulated in Strapi CMS.

**Non-Goals:**
- Removing layout container height/width constraints (layout structure remains intact).

## Decisions

1. **Dynamic Strapi Categories API**:
   - *Decision*: Fetch `/categories?filters[is_active][$eq]=true&populate=*` in `getHomePageData()`.
   - *Rationale*: Guarantees real categories created in Strapi appear immediately in `ShopByRoom`.

2. **Explicit Placeholder Frames**:
   - *Decision*: When image is null, render `ImageWithFallback` placeholder state with neutral background + icon.
   - *Rationale*: Eliminates deceptive static mock images.

## Risks / Trade-offs

- None. Explicit placeholders give honest, real-time feedback to Admin while preserving exact UI layout.
