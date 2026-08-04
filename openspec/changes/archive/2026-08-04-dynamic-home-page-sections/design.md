## Context

See `proposal.md` for motivation. Currently, `page.tsx` fetches products directly via server component, while individual section components rely on hardcoded default constants or prop drilling.

## Goals / Non-Goals

**Goals:**
- Update `homePageService.ts` to construct a complete `HomePageData` payload incorporating categories, featured products, craftsmanship stories, collections info, experiences, and FAQ items.
- Update `ShopByRoom.tsx`, `MadeFurniture.tsx`, `RecentlyCrafted.tsx`, `Collections.tsx`, `Explore.tsx`, `Experiences.tsx`, and `Faq.tsx` to read from `useHomePageData()`.
- Populate Collections right-side stream using featured products (Option A).
- Add skeleton loaders for `RecentlyCrafted` and `Explore` sections.

**Non-Goals:**
- Changing existing section layout boundaries or CSS styling rules (visual design remains 100% identical).

## Decisions

1. **Shared Hook (`useHomePageData`)**:
   - *Decision*: Each section component calls `useHomePageData()`.
   - *Rationale*: React Query automatically dedupes concurrent calls for the same `queryKey`.

2. **Collections Option A Integration**:
   - *Decision*: Map `featuredProducts` into `CollectionItem[]` format (`{ id, name, image, href: '/products/' + slug }`).
   - *Rationale*: Keeps featured items dynamically synced with Strapi catalog mutations.

## Risks / Trade-offs

- None. Default fallback constants in `homePageService.ts` protect against empty Strapi responses.
