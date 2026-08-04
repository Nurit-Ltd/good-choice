## Context

See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**
- Restore static fallback arrays in `DEFAULT_HOME_DATA` specifically for `experiences` and `faq`.
- Update Strapi REST endpoints in `homePageService.ts` to omit `filters[is_active]` since `is_active` field is not in schema.json for `crafted-experience` and `faq`.
- Provide exact instructions to store admin on creating records in Strapi Admin Panel.

**Non-Goals:**
- Restoring static fallbacks for banners or categories (those remain fully dynamic / empty-state driven as requested earlier).

## Decisions

### Decision 1: Fallback Arrays Restored
- Re-introduce `DEFAULT_EXPERIENCES` (4 items) and `DEFAULT_FAQ_ITEMS` (5 items) inside `homePageService.ts` / components so that if Strapi has 0 items, default content displays gracefully.

### Decision 2: Strapi Backend Entry Structure
- **Crafted Experiences** in Strapi Admin (`20. Crafted Experiences`):
  - `title` (String): e.g. "New Sofa Making"
  - `description` (Text): e.g. "Luxury sofas crafted with meticulous care..."
  - `icon_name` (Enum): `SofaIcon` | `ArabicMajlisIcon` | `DiningTableIcon` | `DressingMirrorIcon`
  - `icon_media` (Media): Optional custom icon image SVG/PNG
  - `order_by` (Integer): e.g. 1, 2, 3...
- **FAQ Items** in Strapi Admin (`19. FAQ Items`):
  - `question` (String): e.g. "What are the shipping options?"
  - `answer` (Text): e.g. "We offer various shipping options..."
  - `category` (Enum): `general` | `shipping` | `returns` | `care` | `warranty`
  - `order_by` (Integer): e.g. 1, 2, 3...

## Risks / Trade-offs

- None identified.
