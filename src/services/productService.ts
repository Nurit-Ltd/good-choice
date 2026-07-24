import { Product, ProductFilter } from "@/types/product";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Wireless Noise-Canceling Headphones",
    slug: "wireless-noise-canceling-headphones",
    description: "Premium over-ear headphones with active noise cancellation and 30-hour battery life.",
    price: 199.99,
    originalPrice: 249.99,
    category: "Electronics",
    images: ["/images/headphones.jpg"],
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    reviewCount: 124,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-2",
    name: "Minimalist Leather Backpack",
    slug: "minimalist-leather-backpack",
    description: "Handcrafted genuine leather backpack with laptop compartment and water-resistant finish.",
    price: 129.50,
    category: "Fashion",
    images: ["/images/backpack.jpg"],
    inStock: true,
    stockCount: 8,
    rating: 4.6,
    reviewCount: 89,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-3",
    name: "Smart Fitness Watch",
    slug: "smart-fitness-watch",
    description: "Track your workouts, heart rate, and sleep with OLED display and 7-day battery life.",
    price: 89.99,
    originalPrice: 119.99,
    category: "Electronics",
    images: ["/images/watch.jpg"],
    inStock: true,
    stockCount: 22,
    rating: 4.5,
    reviewCount: 210,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
];

export async function getProducts(filter?: ProductFilter): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  let result = [...MOCK_PRODUCTS];

  if (filter?.category && filter.category !== "all") {
    result = result.filter(
      (p) => p.category.toLowerCase() === filter.category?.toLowerCase()
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

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
}
