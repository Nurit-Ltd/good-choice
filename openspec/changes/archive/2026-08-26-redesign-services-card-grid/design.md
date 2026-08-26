## Context

The `/services` route previously rendered `ServicesBentoGrid.tsx`, which computed dynamic multi-column spans (`isWide = index === 0 || index === 3 ...`) and rendered asymmetrical card sizes with pricing tags. The goal is to refactor this into a clean, uniform `ServicesCardGrid.tsx` (Option 1 - Luxury Studio Minimalist Card) with strict anti-break typography constraints, adhering to the 3-Layer Architecture rules in `.agents/AGENTS.md`.

## Goals / Non-Goals

**Goals:**
- Provide a uniform 3-column responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`) with equal-height cards.
- Implement the Luxury Studio Minimalist Card design:
  - `aspect-[16/10]` image container with Next.js image optimization and smooth scale hover.
  - Numbered serial indicator (e.g. `01`, `02`) + Category Pill overlay.
  - `line-clamp-1` title and `line-clamp-2` description to guarantee consistent heights and prevent broken lines.
  - Compact capability micro-tags (`flex-wrap gap-1.5`) derived from `service.features`.
  - Clean bottom divider with "Explore Service →" hover interaction.
- Remove all raw pricing strings from the service cards.
- Update `ServicesSkeleton.tsx` to match the exact dimensions and structure of the new card grid.

**Non-Goals:**
- Modifying backend Strapi schemas or Layer 1 API hooks (`useServices.ts`, `service.service.ts`).
- Altering the service detail page (`/services/[slug]`).

## Decisions

### Decision 1: Uniform Flex-Col Card Anatomy with Locked Aspect Ratio
- **Choice**: Use `flex flex-col justify-between h-full bg-white rounded-2xl border border-secondary-200/80 overflow-hidden shadow-sm hover:shadow-xl` with `aspect-[16/10]` image header.
- **Rationale**: Prevents layout shift and uneven heights between cards with varying description lengths.
- **Alternatives considered**: Dynamic Masonry or Bento grid (rejected because it creates an editorial blog feel).

### Decision 2: Anti-Broken Line Constraints
- **Choice**: Apply `line-clamp-1` with `font-heading text-lg sm:text-xl font-bold` for titles, and `line-clamp-2 text-xs sm:text-sm text-grey-600` for summaries, combined with `break-words`.
- **Rationale**: Guarantees that no viewport or long title breaks card balance or creates orphaned text lines.

### Decision 3: Micro-Tags for Capabilities
- **Choice**: Display up to 3 compact tags (`features.slice(0, 3)`) with `text-[11px] font-medium bg-secondary-100/80 text-grey-700 px-2.5 py-0.5 rounded-full`.
- **Rationale**: Communicates core service offerings without cluttering the card with long checkmark lists.

## Risks / Trade-offs

- **[Long Category Names on Mobile Filter]** → Add `flex-wrap gap-2` to category pills so they wrap seamlessly on small screens without horizontal scroll cuts.
- **[Card Skeleton Discrepancy]** → Synchronize `ServicesSkeleton.tsx` to use the same `aspect-[16/10]` image container and 3-column responsive grid.
