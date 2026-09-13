## MODIFIED Requirements

### Requirement: Service Discovery and Live Filtering
The system SHALL allow filtering by dynamic craft categories fetched from the CMS and real-time textual search across titles and descriptions with an interactive reset state when no matches are found.

#### Scenario: Dynamic Category Pills from Strapi
- **WHEN** the `/services` page loads
- **THEN** the category filter pills are dynamically generated from active `Service Category` CMS records, with fallback to local category defaults if the API is unreachable.

#### Scenario: Filtering by Category
- **WHEN** a user clicks on a category pill
- **THEN** the grid SHALL immediately update to show only services associated with that category.

#### Scenario: Empty Search Fallback
- **WHEN** a user enters a search query that yields no matching services
- **THEN** the system SHALL display a polished empty state with a reset button that clears the search query and restores all items.
