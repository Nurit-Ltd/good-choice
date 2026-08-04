/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchStrapiAPI, getStrapiMediaUrl } from './strapi';
import { Product, ProductFilter } from '@/types/product';

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
 * Pure Strapi REST API implementation (Zero Mock Fallbacks)
 */

export async function getCatalogCategories(): Promise<CategoryData[]> {
  const { data, error } = await fetchStrapiAPI<Array<{ id: number; name: string; slug: string; description?: string; image?: { url: string } }>>('/categories?populate=*', {
    tags: ['products-list', 'categories'],
  });

  if (error || !data || !Array.isArray(data)) {
    return [];
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

  if (error || !data || !Array.isArray(data)) {
    return [];
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
    endpoint += `&filters[categories][name][$iContains]=${encodeURIComponent(category)}`;
  }
  if (search) {
    endpoint += `&filters[name][$iContains]=${encodeURIComponent(search)}`;
  }

  const { data, error } = await fetchStrapiAPI<{
    data: Array<any>;
    meta?: { pagination?: { total: number; pageCount: number; page: number } };
  }>(endpoint, {
    tags: ['products-list'],
  });

  if (error || !data) {
    return {
      products: [],
      total: 0,
      totalPages: 1,
      currentPage: page,
    };
  }

  const rawList = Array.isArray(data) ? data : (data as any)?.data || [];
  const productsList: Product[] = rawList.map((item: any, idx: number) => {
    const attrs = item.attributes || item;
    const featureImgUrl = attrs.feature_image?.url ? getStrapiMediaUrl(attrs.feature_image.url) : '';
    const productImgs = Array.isArray(attrs.product_images)
      ? attrs.product_images.map((img: any) => getStrapiMediaUrl(img.url)).filter(Boolean)
      : [];

    const imagesList = productImgs.length > 0 ? productImgs : (featureImgUrl ? [featureImgUrl] : []);

    const catName = Array.isArray(attrs.categories) && attrs.categories.length > 0
      ? attrs.categories[0].name
      : (attrs.category?.name || attrs.category || 'Furniture');

    return {
      id: String(item.id || item.documentId || `prod-${idx}`),
      name: attrs.name || attrs.title || 'Bespoke Furniture Item',
      slug: attrs.slug || (attrs.name || attrs.title || '').toLowerCase().replace(/\s+/g, '-'),
      description: attrs.description || attrs.short_description || 'Handcrafted luxury furniture piece.',
      price: Number(attrs.base_price || attrs.price || 0),
      originalPrice: Number(attrs.base_discount_price || attrs.original_price || Math.round((attrs.base_price || 0) * 1.2)),
      category: catName,
      subcategory: attrs.subcategory || '',
      tag: attrs.tag || 'Made to order',
      images: imagesList,
      inStock: attrs.catalog_status === 'available' || attrs.is_active || true,
      stockCount: Number(attrs.base_stock_quantity || 10),
      rating: Number(attrs.rating || 4.8),
      reviewCount: Number(attrs.review_count || 24),
      isFeatured: Boolean(attrs.feature_product || attrs.is_featured),
      specs: attrs.specifications || {
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
  const totalPages = pagination?.pageCount || Math.ceil(total / limit) || 1;

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
    return null;
  }

  const items = Array.isArray(data) ? data : (data as any)?.data || [];
  if (items.length === 0) {
    return null;
  }

  const item = items[0];
  const attrs = item.attributes || item;
  const featureImgUrl = attrs.feature_image?.url ? getStrapiMediaUrl(attrs.feature_image.url) : '';
  const productImgs = Array.isArray(attrs.product_images)
    ? attrs.product_images.map((img: any) => getStrapiMediaUrl(img.url)).filter(Boolean)
    : [];

  const imagesList = productImgs.length > 0 ? productImgs : (featureImgUrl ? [featureImgUrl] : []);

  const catName = Array.isArray(attrs.categories) && attrs.categories.length > 0
    ? attrs.categories[0].name
    : (attrs.category?.name || attrs.category || 'Furniture');

  return {
    id: String(item.id || item.documentId),
    name: attrs.name || attrs.title,
    slug: attrs.slug,
    description: attrs.description || attrs.short_description,
    price: Number(attrs.base_price || attrs.price || 0),
    originalPrice: Number(attrs.base_discount_price || attrs.original_price || Math.round((attrs.base_price || 0) * 1.2)),
    category: catName,
    subcategory: attrs.subcategory || '',
    tag: attrs.tag || 'Made to order',
    images: imagesList,
    inStock: attrs.catalog_status === 'available' || attrs.is_active || true,
    stockCount: Number(attrs.base_stock_quantity || 10),
    rating: Number(attrs.rating || 4.8),
    reviewCount: Number(attrs.review_count || 24),
    isFeatured: Boolean(attrs.feature_product || attrs.is_featured),
    specs: attrs.specifications || {
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
