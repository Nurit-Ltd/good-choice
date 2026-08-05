## Why

The Contact page (`/contact`) currently contains hardcoded address, email, phone, WhatsApp number, and static Leaflet map coordinates. Connecting the Contact page to the Strapi v5 Single Type endpoint `/contact-page?populate=*` and site settings enables the CMS admin to manage all contact information, titles, and map locations dynamically.

## What Changes

- Create `contactService.ts` to fetch `/contact-page?populate=*` from Strapi REST API.
- Create `use-contact.ts` hook (`useContactPage`) using TanStack React Query.
- Update `ContactHeader` to render dynamic title & category breadcrumbs.
- Update `ContactInfo` to render dynamic address, support email, phone, and WhatsApp link from Strapi API / site settings.
- Update `ContactMap` and `LeafletMapInner` to render dynamic store name, address, latitude, longitude, and zoom level from Strapi API.

## Capabilities

### New Capabilities
- `contact-page-api`: Pure Strapi REST API integration and React Query hooks for the Contact Us page.

### Modified Capabilities

## Impact

- `src/services/contactService.ts`: Created Layer 1 service for Strapi `/contact-page`.
- `src/hooks/use-contact.ts`: Created Layer 2 React Query hook for Contact page data.
- `src/components/features/contact/contact-info.tsx`: Updated to consume dynamic contact info.
- `src/components/features/contact/contact-map.tsx`: Updated to pass dynamic coordinates to Leaflet.
- `src/components/features/contact/leaflet-map-inner.tsx`: Updated to use dynamic coordinates & popup content.
