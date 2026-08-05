## 1. Services & Hooks Implementation

- [x] 1.1 Create `src/services/contactService.ts` to fetch `/contact-page?populate=*` from Strapi REST API.
- [x] 1.2 Create `src/hooks/use-contact.ts` to expose `useContactPage` using TanStack React Query.

## 2. Component Integration

- [x] 2.1 Update `ContactInfo` (`contact-info.tsx`) to consume dynamic address, email, phone, and WhatsApp from API.
- [x] 2.2 Update `ContactMap` and `LeafletMapInner` (`contact-map.tsx`, `leaflet-map-inner.tsx`) to accept dynamic map coordinates and address from API.

## 3. Verification

- [x] 3.1 Verify contact page loads cleanly with dynamic Strapi data and zero layout/design changes.
