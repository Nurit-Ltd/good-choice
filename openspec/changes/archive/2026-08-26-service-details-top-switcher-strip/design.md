## Context

In `src/components/features/services/ServiceDetailClient.tsx`, related services were only displayed at the bottom of the page in `RelatedServicesCarousel.tsx`. Users visiting from direct links or search often missed other service offerings without scrolling through the entire page.

To solve this, we are creating a dedicated `ServiceTopSwitcherStrip.tsx` component mounted right beneath the header banner and above the service hero section.

## Goals / Non-Goals

**Goals:**
- Implement `ServiceTopSwitcherStrip.tsx` with slim micro-cards (height ~68px, width ~250px).
- Display a 52px square image thumbnail with Next.js image optimization (`ImageWithFallback`), category label, title with clean truncation (`line-clamp-1`), and active state indicator.
- Automatically scroll the active service card into view on mount (`scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })`).
- Support Left/Right arrow controls on desktop and smooth touch scrolling with momentum on mobile/tablet.
- Integrate into `ServiceDetailClient.tsx` and update `ServiceDetailSkeleton.tsx`.

**Non-Goals:**
- Removing the bottom `RelatedServicesCarousel.tsx` (it continues to serve as the bottom conversion hook for users finishing reading the full page).

## Decisions

### Decision 1: Slim Micro-Card Anatomy (Horizontal Split)
- **Choice**: Compact flex row `flex items-center gap-3 p-2 rounded-xl bg-white border border-secondary-200/80 shrink-0 w-60 sm:w-68`.
- **Rationale**: Keeps total height under 70px, preventing layout bloat or pushing the main hero below the fold.

### Decision 2: Auto-Centering Active Service
- **Choice**: Utilize a `useRef` for the active card to automatically scroll it to the center of the horizontal container upon page load.
- **Rationale**: Instantly confirms current location in the catalog to the user.

## Risks / Trade-offs

- **[Header Overlap on Mobile]** → Maintain container padding (`px-4 sm:px-6 lg:px-8`) matching the page grid with `scrollbar-none` and `overscroll-x-contain`.
