## Purpose

Eliminates raw JSON fields from the Strapi Service schema in favor of human-friendly repeatable components and establishes a dedicated Service Category collection type.

## ADDED Requirements

### Requirement: Human-Friendly Repeatable Components for Services
The Strapi `Service` schema SHALL use structured Strapi Repeatable Components instead of raw JSON fields for workflow process steps, key feature bullet points, technical specifications, and highlight badges.

#### Scenario: Admin Adds Workflow Process Steps
- **WHEN** an admin creates or edits a service and adds items to the `process_steps` repeatable component
- **THEN** each step captures `step` (integer), `title` (string), `description` (text), and `duration` (string) as individual input fields without requiring JSON syntax.

#### Scenario: Admin Configures Service Features and Technical Specifications
- **WHEN** an admin adds items to `features` (repeatable text item) and `specifications` (repeatable label-value component)
- **THEN** the Service Details page at `/services/[slug]` renders the feature bullet points and specification table with full typography formatting.

### Requirement: Dynamic Service Category Collection Management
The system SHALL provide a dedicated `Service Category` Collection Type in Strapi linked via relation to `Service` items.

#### Scenario: Categorizing a Service via CMS Dropdown
- **WHEN** an admin assigns a category to a service in the Strapi Content Manager
- **THEN** the category is selected from published `Service Category` records rather than a static schema enum.
