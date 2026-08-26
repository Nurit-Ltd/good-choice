## MODIFIED Requirements

### Requirement: Dynamic Navbar Site Settings Integration
The Navbar component SHALL load site settings, navigation links, announcement bar text, and logo URLs dynamically, presenting top-level navigation items without "Product" links and containing "Gallery" linking to `/gallery`.

#### Scenario: User opens page
- **WHEN** user loads any page in the application
- **THEN** Navbar displays the active navigation items (Home, Services, Gallery, About, Contact) without Product links or product mega menu triggers

#### Scenario: Site settings API loading or fallback
- **WHEN** site settings query is loading or Strapi is unreachable
- **THEN** system renders default navigation links (Home, Services, Gallery, About, Contact) without layout shifting or broken components
