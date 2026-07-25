export const siteConfig = {
  name: "Good Choice Furniture",
  description: "Bespoke furniture designed with premium materials, timeless aesthetics, and precision craftsmanship for refined modern interiors.",
  url: "https://goodchoice.com",
  ogImage: "https://goodchoice.com/og.jpg",
  whatsappNumber: "+8801700000000",
  whatsappUrl: "https://wa.me/8801700000000",
  links: {
    twitter: "https://twitter.com/goodchoice",
    facebook: "https://facebook.com/goodchoice",
    instagram: "https://instagram.com/goodchoice",
  },
  navLinks: [
    { label: "Home", href: "/" },
    {
      label: "Product",
      href: "/products",
      hasDropdown: true,
      subItems: [
        { label: "Living Room", href: "/products?category=living-room" },
        { label: "Bedroom", href: "/products?category=bedroom" },
        { label: "Dining Room", href: "/products?category=dining-room" },
        { label: "Office Furniture", href: "/products?category=office" },
        { label: "All Collections", href: "/products" },
      ],
    },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

