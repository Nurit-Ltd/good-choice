# strapi-api-integration Specification

## Purpose
Provides a pure, live REST API communication layer connecting Next.js Layer 1 services to the Strapi v5 backend, supporting Cloudinary media assets and eliminating hardcoded mock fallback data.
## Requirements
### Requirement: Layer 1 Services Strapi REST Fetching
The frontend Layer 1 services SHALL fetch dynamic data directly from local Strapi REST API (`/api/v1`) using `NEXT_PUBLIC_API_URL` without returning hardcoded mock arrays.

#### Scenario: Successful Strapi API fetch
- **WHEN** Layer 1 service requests catalog products or home page data from Strapi API
- **THEN** system fetches real data from Strapi REST endpoints and returns parsed records or empty array if no records exist

#### Scenario: Server or Network API Error
- **WHEN** Strapi API returns a 5xx error or connection fails
- **THEN** Layer 1 service returns null or an error object without populating hardcoded fallback mock arrays

### Requirement: Cloudinary Media Resolution
The application SHALL resolve image URLs from Cloudinary CDN (`https://res.cloudinary.com/...`) seamlessly through Next.js Image optimization configuration.

#### Scenario: Rendering Cloudinary image assets
- **WHEN** Strapi API returns media URLs hosted on Cloudinary
- **THEN** Next.js `<Image />` component renders the image without cross-domain host errors

