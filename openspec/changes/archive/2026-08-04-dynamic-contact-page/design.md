## Context

See `proposal.md` for motivation. Existing UI design, styling, and visual layout will remain 100% untouched.

## Goals / Non-Goals

**Goals:**
- Implement `contactService.ts` to query `/contact-page?populate=*`.
- Implement `useContactPage` hook in `use-contact.ts`.
- Wire `ContactInfo`, `ContactMap`, and `LeafletMapInner` to render Strapi attributes.

**Non-Goals:**
- Modifying CSS styles, component layouts, or HTML structure.

## Decisions

### Decision 1: Service Data Mapping
- Map `address_line`, `support_email`, `support_phone`, `whatsapp_phone`, `latitude`, `longitude`, `map_zoom`, `header_title`, `header_subtitle`.
- Fall back gracefully to `SiteSettings` if individual contact-page attributes are empty.

### Decision 2: Leaflet Map Integration
- Pass `latitude`, `longitude`, `zoom`, `storeName`, `address`, and `mapsUrl` props from `ContactMap` to `LeafletMapInner`.

## Risks / Trade-offs

- None.
