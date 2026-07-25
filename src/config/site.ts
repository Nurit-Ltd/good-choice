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
      isMegaMenu: true,
      subItems: [
        { label: "Living Room", href: "/products?category=living-room" },
        { label: "Bedroom", href: "/products?category=bedroom" },
        { label: "Dining Room", href: "/products?category=dining-room" },
        { label: "Lighting", href: "/products?category=lighting" },
        { label: "Outdoor", href: "/products?category=outdoor" },
        { label: "Home Decor", href: "/products?category=home-decor" },
      ],
      megaMenu: {
        categories: [
          {
            title: "Living Room",
            href: "/products?category=living-room",
            items: [
              { label: "Armchairs", href: "/products?category=living-room&subcategory=armchairs" },
              { label: "Coffee Tables", href: "/products?category=living-room&subcategory=coffee-tables" },
              { label: "Side Boards", href: "/products?category=living-room&subcategory=sideboards" },
              { label: "Sofas", href: "/products?category=living-room&subcategory=sofas" },
            ],
          },
          {
            title: "Bed Room",
            href: "/products?category=bedroom",
            items: [
              { label: "Beds", href: "/products?category=bedroom&subcategory=beds" },
              { label: "Nightstands", href: "/products?category=bedroom&subcategory=nightstands" },
              { label: "Wardrobes", href: "/products?category=bedroom&subcategory=wardrobes" },
            ],
          },
          {
            title: "Lighting",
            href: "/products?category=lighting",
            items: [
              { label: "Ceiling", href: "/products?category=lighting&subcategory=ceiling" },
              { label: "Floor Lamps", href: "/products?category=lighting&subcategory=floor-lamps" },
              { label: "Table Lamps", href: "/products?category=lighting&subcategory=table-lamps" },
              { label: "Wall Lamps", href: "/products?category=lighting&subcategory=wall-lamps" },
            ],
          },
          {
            title: "Outdoor",
            href: "/products?category=outdoor",
            items: [
              { label: "Accessories", href: "/products?category=outdoor&subcategory=accessories" },
              { label: "Chairs", href: "/products?category=outdoor&subcategory=chairs" },
              { label: "Benches", href: "/products?category=outdoor&subcategory=benches" },
              { label: "Lounge", href: "/products?category=outdoor&subcategory=lounge" },
              { label: "Table", href: "/products?category=outdoor&subcategory=table" },
            ],
          },
          {
            title: "Dining Room",
            href: "/products?category=dining-room",
            items: [
              { label: "Benches", href: "/products?category=dining-room&subcategory=benches" },
              { label: "Dining Chairs", href: "/products?category=dining-room&subcategory=dining-chairs" },
              { label: "Side Boards", href: "/products?category=dining-room&subcategory=sideboards" },
            ],
          },
          {
            title: "Home Decor",
            href: "/products?category=home-decor",
            items: [
              { label: "Mirror", href: "/products?category=home-decor&subcategory=mirror" },
              { label: "Rugs", href: "/products?category=home-decor&subcategory=rugs" },
            ],
          },
        ],
        promos: [
          {
            title: "Just In",
            image: "/images/home/room/room-1.png",
            href: "/products?tag=just-in",
          },
          {
            title: "Outlet",
            image: "/images/home/room/room-2.png",
            href: "/products?tag=outlet",
          },
        ],
      },
    },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

