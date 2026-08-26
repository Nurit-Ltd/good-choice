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
      label: "Services",
      href: "/services",
      hasDropdown: true,
      isServicesMegaMenu: true,
      subItems: [
        { label: "Bespoke Furniture", href: "/services/bespoke-furniture-creation" },
        { label: "Interior Design & 3D", href: "/services/interior-design-3d-planning" },
        { label: "Antique Restoration", href: "/services/antique-restoration-polishing" },
        { label: "Custom Upholstery", href: "/services/custom-upholstery-fabric-tailoring" },
        { label: "Architectural Millwork", href: "/services/architectural-millwork-built-in-units" },
        { label: "Commercial Fitting", href: "/services/commercial-office-furniture-fitting" },
      ],
    },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

