export interface ProductSpecs {
  style?: string;
  seatingCapacity?: string;
  upholstery?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  tag?: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  specs?: ProductSpecs;
  keyFeatures?: string[];
  createdAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  itemCount: number;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
  sortBy?: "price-asc" | "price-desc" | "rating" | "newest";
  page?: number;
  limit?: number;
}
