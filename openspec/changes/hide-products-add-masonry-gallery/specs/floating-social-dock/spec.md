## Purpose

Provides a non-intrusive, responsive floating social contact dock connecting customers directly to WhatsApp, Instagram, and Facebook without obstructing page content or overlapping interactive elements.

## ADDED Requirements

### Requirement: Responsive Floating Social Dock
The system SHALL render a fixed floating social contact dock with direct links to WhatsApp, Instagram, and Facebook.

#### Scenario: Desktop Viewport Floating Dock
- **WHEN** viewed on viewport widths of 1024px and above
- **THEN** the system SHALL display a vertical glassmorphic dock on the right edge with interactive tooltip hover animations

#### Scenario: Mobile and Tablet Anti-Overlap Safety
- **WHEN** viewed on smaller screen devices
- **THEN** the floating social elements SHALL maintain safe margins and lower z-index than navigation sheets and lightbox modals to prevent any content or button blockage

#### Scenario: Footer Social Preservation
- **WHEN** any page is scrolled to the footer
- **THEN** the footer bottom bar SHALL continue to display all three social media links as permanent static elements
