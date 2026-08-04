## Context

See `proposal.md` for motivation. Existing UI components and layouts in `/products` and `/products/[slug]` will be preserved 100% as requested by the user.

## Goals / Non-Goals

**Goals:**
- Connect WhatsApp Order CTA in `ProductDetailSection.tsx` to `useSiteSettings()`.
- Refactor `catalogService.ts` to map real Strapi fields without dummy price multipliers.
- Re-export unified TanStack React Query hooks in `use-products.ts`.

**Non-Goals:**
- Modifying CSS, colors, HTML layout structure, or component styling.

## Decisions

### Decision 1: WhatsApp CTA Dynamic Integration
- Call `useSiteSettings()` in `ProductDetailSection.tsx`.
- Form URL as `https://wa.me/${whatsappNum}?text=${encodedMsg}`.

### Decision 2: Refactor catalogService Data Mapper
- `originalPrice`: Only set if `attrs.base_discount_price` or `attrs.original_price` is provided by Strapi, otherwise undefined/same as price.
- `specs`: Map `attrs.specifications` directly.
- `keyFeatures`: Map `attrs.key_features` directly.

## Risks / Trade-offs

- None.
