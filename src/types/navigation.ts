export interface NavSubItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  subItems?: NavSubItem[];
}
