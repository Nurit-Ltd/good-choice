export interface NavSubItem {
  label: string;
  href: string;
  description?: string;
}

export interface MegaMenuCategory {
  title: string;
  href?: string;
  items: {
    label: string;
    href: string;
  }[];
}

export interface MegaMenuPromo {
  title: string;
  image: string;
  href: string;
}

export interface MegaMenuConfig {
  categories: MegaMenuCategory[];
  promos?: MegaMenuPromo[];
}

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  isMegaMenu?: boolean;
  isServicesMegaMenu?: boolean;
  subItems?: NavSubItem[];
  megaMenu?: MegaMenuConfig;
}
