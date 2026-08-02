/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchStrapiAPI, getStrapiMediaUrl } from './strapi';
import { Product, ProductFilter } from '@/types/product';
import { MOCK_PRODUCTS } from './productService';

export interface CategoryData {
  id: string | number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface BrandData {
  id: string | number;
  name: string;
  slug: string;
  logo?: string;
}

export interface CatalogProductsResult {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
}

/**
 * Layer 1 Catalog Service — Products, Categories & Brands
 * Supports Tag-based caching ('products-list', 'product-[slug]') for Zero DB Hit & On-Demand ISR
 */

export async function getCatalogCategories(): Promise<CategoryData[]> {
  const { data, error } = await fetchStrapiAPI<Array<{ id: number; name: string; slug: string; description?: string; image?: { url: string } }>>('/categories?populate=*', {
    tags: ['products-list', 'categories'],
  });

  if (error || !data || !Array.isArray(data) || data.length === 0) {
    return [
      { id: '1', name: 'Sofas', slug: 'sofas' },
      { id: '2', name: 'Beds', slug: 'beds' },
      { id: '3', name: 'Chairs', slug: 'chairs' },
      { id: '4', name: 'Wardrobes', slug: 'wardrobes' },
      { id: '5', name: 'Living Room', slug: 'living-room' },
      { id: '6', name: 'Dining Room', slug: 'dining-room' },
      { id: '7', name: 'Lighting', slug: 'lighting' },
      { id: '8', name: 'Home Decor', slug: 'home-decor' },
      { id: '9', name: 'Outdoor', slug: 'outdoor' },
    ];
  }

  return data.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-'),
    description: cat.description,
    image: getStrapiMediaUrl(cat.image?.url),
  }));
}

export async function getCatalogBrands(): Promise<BrandData[]> {
  const { data, error } = await fetchStrapiAPI<Array<{ id: number; name: string; slug: string; logo?: { url: string } }>>('/brands?populate=*', {
    tags: ['products-list', 'brands'],
  });

  if (error || !data || !Array.isArray(data) || data.length === 0) {
    return [
      { id: 'b1', name: 'Good Choice Exclusive', slug: 'good-choice-exclusive' },
      { id: 'b2', name: 'Scandinavian Atelier', slug: 'scandinavian-atelier' },
      { id: 'b3', name: 'Nordic Craft', slug: 'nordic-craft' },
    ];
  }

  return data.map((b) => ({
    id: b.id,
    name: b.name,
    slug: b.slug || b.name.toLowerCase().replace(/\s+/g, '-'),
    logo: getStrapiMediaUrl(b.logo?.url),
  }));
}

export async function getCatalogProducts(filter?: ProductFilter): Promise<CatalogProductsResult> {
  const category = filter?.category && filter.category !== 'all' ? filter.category : '';
  const search = filter?.searchQuery || '';
  const page = filter?.page || 1;
  const limit = filter?.limit || 12;

  let endpoint = `/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${limit}`;
  if (category) {
    endpoint += `&filters[category][name][$iContains]=${encodeURIComponent(category)}`;
  }
  if (search) {
    endpoint += `&filters[title][$iContains]=${encodeURIComponent(search)}`;
  }

  const { data, error } = await fetchStrapiAPI<{
    data: Array<any>;
    meta?: { pagination?: { total: number; pageCount: number; page: number } };
  }>(endpoint, {
    tags: ['products-list'],
  });

  if (error || !data) {
    // Fallback to local mock dataset seamlessly
    let filtered = [...MOCK_PRODUCTS];
    if (category) {
      const catLower = category.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.category.toLowerCase() === catLower ||
          p.subcategory?.toLowerCase() === catLower
      );
    }
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower)
      );
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;

    return {
      products: filtered.slice(start, start + limit),
      total,
      totalPages,
      currentPage: page,
    };
  }

  const productsList: Product[] = (Array.isArray(data) ? data : (data as any)?.data || []).map((item: any, idx: number) => {
    const attrs = item.attributes || item;
    const imagesList = Array.isArray(attrs.images)
      ? attrs.images.map((img: any) => getStrapiMediaUrl(img.url))
      : [attrs.main_image?.url ? getStrapiMediaUrl(attrs.main_image.url) : '/images/product/product-1.png'];

    return {
      id: String(item.id || `prod-${idx}`),
      name: attrs.title || attrs.name || 'Bespoke Furniture Item',
      slug: attrs.slug || (attrs.title || attrs.name || '').toLowerCase().replace(/\s+/g, '-'),
      description: attrs.description || attrs.short_description || 'Handcrafted luxury furniture piece.',
      price: attrs.price || attrs.regular_price || 1200,
      originalPrice: attrs.original_price || attrs.old_price || Math.round((attrs.price || 1200) * 1.2),
      category: attrs.category?.name || attrs.category || 'Furniture',
      subcategory: attrs.subcategory || '',
      tag: attrs.tag || 'Made to order',
      images: imagesList.length > 0 ? imagesList : ['/images/product/product-1.png'],
      inStock: attrs.in_stock ?? true,
      stockCount: attrs.stock_count || 10,
      rating: attrs.rating || 4.8,
      reviewCount: attrs.review_count || 24,
      isFeatured: attrs.is_featured || false,
      specs: attrs.specs || {
        style: 'Modern Contemporary',
        seatingCapacity: 'Standard Unit',
        upholstery: 'Premium Fabric',
      },
      keyFeatures: attrs.key_features || [
        'Elegant curved design',
        'High-density foam cushioning',
        'Precision craftsmanship',
      ],
      createdAt: attrs.createdAt || new Date().toISOString(),
    };
  });

  const pagination = (data as any)?.meta?.pagination;
  const total = pagination?.total || productsList.length;
  const totalPages = pagination?.pageCount || 1;

  return {
    products: productsList,
    total,
    totalPages,
    currentPage: page,
  };
}

export async function getSingleProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await fetchStrapiAPI<any>(`/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`, {
    tags: ['products-list', `product-${slug}`],
  });

  if (error || !data) {
    return MOCK_PRODUCTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
  }

  const items = Array.isArray(data) ? data : (data as any)?.data || [];
  if (items.length === 0) {
    return MOCK_PRODUCTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
  }

  const item = items[0];
  const attrs = item.attributes || item;
  const imagesList = Array.isArray(attrs.images)
    ? attrs.images.map((img: any) => getStrapiMediaUrl(img.url))
    : [attrs.main_image?.url ? getStrapiMediaUrl(attrs.main_image.url) : '/images/product/product-1.png'];

  return {
    id: String(item.id),
    name: attrs.title || attrs.name,
    slug: attrs.slug,
    description: attrs.description || attrs.short_description,
    price: attrs.price || attrs.regular_price,
    originalPrice: attrs.original_price || Math.round((attrs.price || 1200) * 1.2),
    category: attrs.category?.name || attrs.category || 'Furniture',
    subcategory: attrs.subcategory || '',
    tag: attrs.tag || 'Made to order',
    images: imagesList,
    inStock: attrs.in_stock ?? true,
    stockCount: attrs.stock_count || 15,
    rating: attrs.rating || 4.9,
    reviewCount: attrs.review_count || 32,
    isFeatured: attrs.is_featured || false,
    specs: attrs.specs || {
      style: 'Modern Contemporary',
      seatingCapacity: 'Standard Unit',
      upholstery: 'Premium Fabric',
    },
    keyFeatures: attrs.key_features || [
      'Elegant curved design',
      'High-density foam cushioning',
    ],
    createdAt: attrs.createdAt || new Date().toISOString(),
  };
}
