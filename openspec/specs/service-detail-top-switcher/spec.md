# service-detail-top-switcher Specification

## Purpose
Provides a responsive, lightweight, and high-performance horizontal micro-card switcher strip at the top of service detail pages for rapid discovery and navigation between services.
## Requirements
### Requirement: Slim Horizontal Service Switcher Strip
The system SHALL render a compact horizontal slider strip on the service detail page showcasing all available craftsmanship services with their visual thumbnails and titles.

#### Scenario: Visual Rendering of Micro-Cards
- **WHEN** a user visits any service detail page `/services/[slug]`
- **THEN** the system MUST display a horizontal list of all services with compact thumbnail images, titles, and categories without pushing the main hero content below the viewport fold

#### Scenario: Active Service Highlight
- **WHEN** the switcher strip renders on `/services/[slug]`
- **THEN** the card matching the current slug SHALL be visually highlighted with an active badge and distinct primary border styling

### Requirement: Seamless Navigation and Responsive Interaction
The switcher strip SHALL support smooth touch swiping and directional scrolling across mobile, tablet, and desktop viewports.

#### Scenario: Switching Services
- **WHEN** a user clicks on any inactive service micro-card in the strip
- **THEN** the system SHALL immediately navigate to that service's detail page `/services/[slug]`

#### Scenario: Mobile and Small Screen Swiping
- **WHEN** viewed on a mobile device
- **THEN** the switcher strip SHALL support native touch drag/swipe with momentum and scroll snapping

