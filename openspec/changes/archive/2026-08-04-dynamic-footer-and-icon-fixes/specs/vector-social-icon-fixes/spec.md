## Purpose

Corrects the corrupted vector SVG path for `InstagramIcon` in `src/components/shared/svgs.tsx` to eliminate visual distortion.

## ADDED Requirements

### Requirement: Pixel-Perfect Instagram SVG Icon
The `InstagramIcon` component SHALL render a clean, undistorted Instagram camera emblem vector SVG.

#### Scenario: User views social icons in Footer
- **WHEN** user views the social icons bar in the Footer
- **THEN** WhatsApp, Facebook, and Instagram icons render clean, crisp vector shapes without distortion or clipping
