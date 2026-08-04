## Why

The e-commerce home page currently contains static hardcoded fallbacks (such as static arrays for `experiences` and `faq`, and hardcoded text fallbacks for various sections). To give store admins full CMS control via Strapi, all home page sections must be 100% dynamic without static text/data fallbacks. When content or images are missing from Strapi, components must render placeholder images or clear empty state UI so admins can visually identify required content.

## What Changes

- Remove all static `DEFAULT_HOME_DATA` text and array fallbacks in `homePageService.ts`.
- Connect `Crafted Experiences` section to Strapi `/crafted-experiences` API endpoint.
- Connect `FAQ` section to Strapi `/faqs` API endpoint.
- Ensure all home page components render fallback placeholder images when image URLs are empty.
- Render clean empty states / admin-friendly placeholders when text/content is missing, ensuring layout integrity without hardcoded copy.

## Capabilities

### New Capabilities
- `home-page-dynamic`: 100% dynamic home page rendering backed by Strapi CMS APIs with placeholder image handling and empty state management.

### Modified Capabilities

## Impact

- `src/services/homePageService.ts`: Updated to fetch `/crafted-experiences` and `/faqs` from Strapi and remove hardcoded fallback data arrays/strings.
- `src/components/features/home/*`: Updated all home components (`Banner`, `ShobByRoom`, `MadeFurniture`, `RecentlyCrafted`, `Collections`, `Explore`, `Experiences`, `Faq`) to handle empty content/images with placeholders and empty state indicators.
- `src/components/ui/ImageWithFallback.tsx`: Enhanced to provide standard UI placeholder for missing images.
