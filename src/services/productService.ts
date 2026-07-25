import { Product, ProductFilter } from "@/types/product";

const BASE_IMAGES = [
  "/images/product/product-7.png",
  "/images/product/product-2.png",
  "/images/product/product-3.png",
  "/images/product/product-4.png",
  "/images/product/product-5.png",
  "/images/product/product-6.png",
  "/images/product/product-8.png",
  "/images/product/product-1.png",
];

const RAW_PRODUCTS_DATA = [
  { name: "Gauguin", category: "Sofas", subcategory: "sofas", tag: "Made to order", price: 1450 },
  { name: "Zola", category: "Beds", subcategory: "beds", tag: "Made to order", price: 1200 },
  { name: "Bonaparte", category: "Chairs", subcategory: "lounge", tag: "Made to order", price: 1850 },
  { name: "Camus", category: "Wardrobes", subcategory: "wardrobes", tag: "Made to order", price: 2100 },
  { name: "Aura", category: "Chairs", subcategory: "armchairs", tag: "Made to order", price: 850 },
  { name: "Nordic", category: "Chairs", subcategory: "dining-chairs", tag: "Made to order", price: 620 },
  { name: "Solace", category: "Living Room", subcategory: "sideboards", tag: "Made to order", price: 1350 },
  { name: "Bello", category: "Home Decor", subcategory: "mirror", tag: "Made to order", price: 950 },

  { name: "Monet", category: "Sofas", subcategory: "sofas", tag: "Made to order", price: 1600 },
  { name: "Picasso", category: "Chairs", subcategory: "armchairs", tag: "Made to order", price: 890 },
  { name: "Dali", category: "Beds", subcategory: "beds", tag: "Made to order", price: 1380 },
  { name: "Rodin", category: "Living Room", subcategory: "coffee-tables", tag: "Made to order", price: 740 },
  { name: "Chagall", category: "Lighting", subcategory: "floor-lamps", tag: "Made to order", price: 420 },
  { name: "Klimt", category: "Home Decor", subcategory: "rugs", tag: "Made to order", price: 580 },
  { name: "Matisse", category: "Outdoor", subcategory: "loungers", tag: "Made to order", price: 1150 },
  { name: "Vermeer", category: "Dining Room", subcategory: "benches", tag: "Made to order", price: 690 },

  { name: "Rembrandt", category: "Chairs", subcategory: "dining-chairs", tag: "Made to order", price: 780 },
  { name: "Degas", category: "Lighting", subcategory: "pendant-lights", tag: "Made to order", price: 390 },
  { name: "Miró", category: "Outdoor", subcategory: "outdoor-tables", tag: "Made to order", price: 980 },
  { name: "Renoir", category: "Sofas", subcategory: "sectional-sofas", tag: "Made to order", price: 2200 },
  { name: "Cézanne", category: "Wardrobes", subcategory: "walk-in-wardrobes", tag: "Made to order", price: 2450 },
  { name: "Titan", category: "Living Room", subcategory: "tv-units", tag: "Made to order", price: 1100 },
  { name: "El Greco", category: "Beds", subcategory: "king-beds", tag: "Made to order", price: 1550 },
  { name: "Velázquez", category: "Home Decor", subcategory: "accent-mirrors", tag: "Made to order", price: 460 },

  { name: "Caravaggio", category: "Chairs", subcategory: "lounge-chairs", tag: "Made to order", price: 920 },
  { name: "Bernini", category: "Living Room", subcategory: "side-tables", tag: "Made to order", price: 510 },
  { name: "Turner", category: "Lighting", subcategory: "table-lamps", tag: "Made to order", price: 340 },
  { name: "Constable", category: "Outdoor", subcategory: "patio-sets", tag: "Made to order", price: 1750 },
  { name: "Manet", category: "Dining Room", subcategory: "dining-tables", tag: "Made to order", price: 1890 },
  { name: "Seurat", category: "Sofas", subcategory: "daybeds", tag: "Made to order", price: 1290 },
];

export const MOCK_PRODUCTS: Product[] = RAW_PRODUCTS_DATA.map((item, index) => {
  const imgIndex = index % BASE_IMAGES.length;
  const secondaryImgIndex = (index + 1) % BASE_IMAGES.length;
  const slug = item.name.toLowerCase().replace(/\s+/g, "-");

  return {
    id: `prod-${index + 1}`,
    name: item.name,
    slug: slug,
    description: `This modern curved ${item.category.toLowerCase()} piece features a soft, flowing profile with clean lines and precision craftsmanship. Upholstered in premium light-toned fabric, it blends seamlessly into sophisticated living spaces, reception lounges, or luxury interior settings.`,
    price: item.price,
    originalPrice: Math.round(item.price * 1.2),
    category: item.category,
    subcategory: item.subcategory,
    tag: item.tag,
    images: [BASE_IMAGES[imgIndex], BASE_IMAGES[secondaryImgIndex]],
    inStock: true,
    stockCount: 12 + index,
    rating: 4.8,
    reviewCount: 24 + index * 3,
    isFeatured: index < 8,
    specs: {
      style: "Modern Contemporary",
      seatingCapacity: item.category === "Sofas" ? "3-4 Seater (per unit)" : "Standard Unit",
      upholstery: "Premium Fabric",
    },
    keyFeatures: [
      "Elegant curved backrest design with precision tailoring",
      "Premium soft-touch fabric & high-density foam cushioning",
      "Slim, sturdy black metal or solid wood legs for stability",
      "Contemporary minimalist aesthetic for refined modern interiors",
      "Ideal for lounges, majlis settings, and reception areas",
    ],
    createdAt: new Date(Date.now() - index * 86400000).toISOString(),
  };
});

export async function getProducts(filter?: ProductFilter): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  let result = [...MOCK_PRODUCTS];

  if (filter?.category && filter.category !== "all") {
    const cat = filter.category.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.category.toLowerCase() === cat ||
        p.subcategory?.toLowerCase() === cat ||
        cat.includes(p.category.toLowerCase()) ||
        p.category.toLowerCase().includes(cat)
    );
  }

  if (filter?.searchQuery) {
    const q = filter.searchQuery.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  return result;
}

export async function getProductsPaginated({
  page = 1,
  limit = 12,
  category = "all",
}: {
  page?: number;
  limit?: number;
  category?: string;
}): Promise<{ products: Product[]; total: number; totalPages: number; currentPage: number }> {
  const filtered = await getProducts({ category });
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * limit;
  const products = filtered.slice(start, start + limit);

  return {
    products,
    total,
    totalPages,
    currentPage: safePage,
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return MOCK_PRODUCTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export async function getRelatedProducts(slug: string, limit = 4): Promise<Product[]> {
  const current = await getProductBySlug(slug);
  const all = [...MOCK_PRODUCTS];

  if (!current) {
    return all.slice(0, limit);
  }

  const related = all.filter(
    (p) => p.slug !== current.slug && (p.category === current.category || p.subcategory === current.subcategory)
  );

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  const fallback = all.filter((p) => p.slug !== current.slug);
  return fallback.slice(0, limit);
}
