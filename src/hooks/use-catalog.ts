import { useQuery } from '@tanstack/react-query';
import {
  getCatalogProducts,
  getSingleProductBySlug,
  getCatalogCategories,
  getCatalogBrands,
} from '@/services/catalogService';
import { ProductFilter } from '@/types/product';

/**
 * Layer 2 Hook for Product Listing & Filtered Catalog Query
 */
export function useCatalogProducts(filter?: ProductFilter) {
  return useQuery({
    queryKey: ['catalog-products', filter],
    queryFn: () => getCatalogProducts(filter),
    staleTime: 1000 * 60 * 5, // 5 minutes client cache
  });
}

/**
 * Layer 2 Hook for Single Product Details
 */
export function useSingleProduct(slug: string) {
  return useQuery({
    queryKey: ['single-product', slug],
    queryFn: () => getSingleProductBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 10,
  });
}

/**
 * Layer 2 Hook for Categories List
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories-list'],
    queryFn: () => getCatalogCategories(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

/**
 * Layer 2 Hook for Brands List
 */
export function useBrands() {
  return useQuery({
    queryKey: ['brands-list'],
    queryFn: () => getCatalogBrands(),
    staleTime: 1000 * 60 * 60,
  });
}
