## Purpose

Provides dynamic fetching, image-less fallback rendering, and autoplay control for the Home Page Hero Banner from Strapi REST API (`/hero-banners`).

## ADDED Requirements

### Requirement: Dynamic Hero Banner Fetching
The `Banner` component SHALL fetch active hero banners from Strapi REST API (`/api/v1/hero-banners?populate=*`).

#### Scenario: User visits Home Page
- **WHEN** user loads the Home Page
- **THEN** Hero Banner displays dynamic slides fetched from Strapi API

### Requirement: Image-less Background Fallback & Exact Placement Parity
The `Banner` component SHALL render a stylized gradient container (`bg-gradient-to-br from-[#FAF7F2] to-[#EFECE5]`) if slide images are missing or null, maintaining exact bottom-left title and subtitle alignment.

#### Scenario: Slide has no image uploaded
- **WHEN** a hero banner entry has no media image attached
- **THEN** system renders the text over a styled gradient container without layout shifting or broken image icons

### Requirement: Multi-slide Carousel Controls & Continuous Autoplay
The `Banner` component SHALL render thumbnail controls and autoplay progress bars ONLY when slide count is greater than 1, and SHALL run autoplay continuously without pausing on mouse hover.

#### Scenario: User hovers over multi-slide hero banner
- **WHEN** user moves mouse over the hero banner
- **THEN** carousel slide transitions continue running without pausing
