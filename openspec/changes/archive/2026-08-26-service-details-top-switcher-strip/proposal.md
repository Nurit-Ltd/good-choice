## Why

On individual service detail pages (`/services/[slug]`), users need a fast, visual, and non-intrusive navigation hook to discover and switch between all available craftsmanship offerings without having to scroll all the way to the bottom of the page or return to the main catalog.

Integrating a slim horizontal micro-card switcher strip at the top of the detail page provides an instant visual hook, shows thumbnails for each craft, highlights the active service, and preserves the prominence of the main hero section.

## What Changes

- **Create Top Switcher Strip Component (`ServiceTopSwitcherStrip.tsx`)**:
  - Compact horizontal cards (~64px height) featuring a square rounded image thumbnail (`52px × 52px`), service title, category label, and status indicator.
  - Active State: The currently viewed service is highlighted with a distinct deep maroon accent (`ring-2 ring-primary-950 bg-primary-950/5` or filled active indicator).
  - Inactive State: Subtle hover border, transition scale, and direct link navigation to `/services/[slug]`.
  - Responsive Horizontal Slider: Touch swipeable container with `snap-x snap-mandatory` and optional arrow navigation for effortless scrolling on all devices.
- **Integrate into Service Detail Page (`ServiceDetailClient.tsx`)**:
  - Mount right beneath the `ServicesHeader` / above `ServiceDetailHero` with optimized container spacing.
  - Fully responsive and zero layout shift on mobile, tablet, and desktop viewports.

## Capabilities

### New Capabilities
- `service-detail-top-switcher`: A responsive, slim horizontal micro-card carousel component mounted at the top of service detail pages for rapid service discovery and switching.

### Modified Capabilities
<!-- None -->

## Impact

- **UI Components**:
  - `src/components/features/services/ServiceTopSwitcherStrip.tsx` (New component).
  - `src/components/features/services/ServiceDetailClient.tsx` (Updated to integrate switcher strip).
  - `src/components/features/services/ServiceDetailSkeleton.tsx` (Updated to include top strip skeleton).
- **Dependencies**: Reuses existing `useServices()` hook and Lucide icons; zero new external dependencies.
