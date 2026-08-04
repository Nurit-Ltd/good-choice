## Context

See `proposal.md` for motivation. `Banner.tsx` currently has hardcoded hover pause logic (`onMouseEnter={() => setIsPaused(true)}`) and static slides fallback.

## Goals / Non-Goals

**Goals:**
- Update `homePageService.ts` to parse all slides from Strapi REST API (`/api/v1/hero-banners?populate=*`).
- Update `Banner.tsx` to handle:
  - Image-less fallback: `!slide.image` -> render stylized gradient container with exact text placement.
  - Controls conditional: `slides.length > 1` -> render thumbnail bar and progress indicator.
  - Remove hover pause: remove `setIsPaused` state / events so autoplay runs continuously.
- Update Strapi backend `seed.ts` and `seed-strapi.mjs` with sample hero banner entries.

**Non-Goals:**
- Modifying the GPU keyframe slide transitions or thumbnail styling (visual aesthetics remain 100% identical).

## Decisions

1. **Remove Hover Pause**:
   - *Decision*: Remove `isPaused` state and `onMouseEnter`/`onMouseLeave` handlers.
   - *Rationale*: Guarantees uninterrupted slide progression as requested by user.

2. **Image-less Fallback Container**:
   - *Decision*: Check if slide image is valid; if empty/null, render gradient background `bg-gradient-to-br from-[#FAF7F2] to-[#EFECE5]`.
   - *Rationale*: Preserves exact design system color tokens and prevents layout breakage.

## Risks / Trade-offs

- None. Default fallbacks in `homePageService.ts` will continue to protect rendering if API is loading or unreachable.
