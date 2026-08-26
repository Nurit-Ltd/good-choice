## Why

The current Services page utilizes an asymmetrical Bento Grid layout with oversized cards, article-style descriptions, and price tags. This presentation causes the offerings to resemble editorial blog articles rather than a sophisticated, bespoke e-commerce craftsmanship and services catalog. 

Transitioning to a balanced, compact, and luxury card grid system reinforces brand value, ensures anti-broken typography across all devices (Mobile, Tablet, Desktop), removes distracting pricing, and provides a clear service exploration workflow.

## What Changes

- **Decommission Bento Spanning**: Remove irregular multi-column span rules (`col-span-2`) and uneven heights in favor of a uniform, equal-height, responsive card grid (`1` col on mobile, `2` on tablet, `3` on desktop).
- **Remove Price Indicators**: Eliminate the starting price tag from the service cards to emphasize bespoke craftsmanship consultation.
- **Implement Luxury Studio Minimalist Cards**:
  - Compact aspect ratio image container (`aspect-[16/10]`) with hover zoom.
  - Subtle luxury numbering overlay (`01`, `02`, etc.) and category badges.
  - Typography guards (`line-clamp-1` for titles, `line-clamp-2` for descriptions) to eliminate broken/uneven wrapping on various screens.
  - Micro key-tag badges (`flex-wrap gap-1.5`) displaying core craft capabilities without overflowing.
  - Clean bottom action divider with interactive "Explore Service →" transition.
- **Responsive & Clean Category Filtering**: Retain responsive pill filtering and live search without UI clipping.

## Capabilities

### New Capabilities
- `services-card-grid`: A uniform, responsive, luxury card grid component system for presenting bespoke craftsmanship services with robust layout constraints.

### Modified Capabilities
<!-- None -->

## Impact

- **UI Components**: Replaces `ServicesBentoGrid.tsx` with a refined `ServicesCardGrid.tsx` (or refactors `ServicesBentoGrid` into a clean card grid) and updates `ServicesSkeleton.tsx` to match the new uniform card dimensions.
- **Client Route**: Updates `ServicesPageClient.tsx` and `ServicesHeader.tsx` where needed.
- **Dependencies**: No new external dependencies required; utilizes existing Tailwind CSS, Lucide icons, and Next.js Image utilities.
