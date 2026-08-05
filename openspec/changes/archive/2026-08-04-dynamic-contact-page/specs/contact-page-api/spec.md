## Purpose

Defines requirements for pure Strapi API integration and dynamic data binding across all components on the Contact Us page (`/contact`).

## ADDED Requirements

### Requirement: Dynamic Contact Cards Information
The system SHALL display store location, email address, support phone, and WhatsApp link dynamically from Strapi `/contact-page` and site settings without static hardcoded text.

#### Scenario: User views contact cards
- **WHEN** user loads the `/contact` page
- **THEN** the office address, email, phone number, and WhatsApp link reflect Strapi admin settings.

### Requirement: Dynamic Interactive Map Coordinates
The system SHALL render the Leaflet map center, marker position, store name, address, and Google Maps action link dynamically using `latitude`, `longitude`, `map_zoom`, and `address_line` from Strapi `/contact-page`.

#### Scenario: Admin updates map location in Strapi
- **WHEN** CMS admin changes latitude/longitude or store address in Strapi dashboard
- **THEN** the frontend Leaflet map updates its center, pin position, and popup details automatically.

### Requirement: Contact Layer 2 React Query Hook
The system SHALL provide `useContactPage` hook in `src/hooks/use-contact.ts` backed by `contactService.ts` for instant client-side data resolution.

#### Scenario: Component rendering contact data
- **WHEN** contact components query contact page data
- **THEN** the data is retrieved via `useContactPage` hook with caching.
