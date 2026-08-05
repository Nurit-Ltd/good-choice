import { useQuery } from '@tanstack/react-query';
import { getCatalogProducts, getSingleProductBySlug, getCatalogCategories } from '@/services/catalogService';
import { ProductFilter } from '@/types/product';

/**
 * Layer 2 Hook for Products List Catalog
 * Consumes Layer 1 getCatalogProducts with TanStack React Query caching.
 */
export function useProducts(filter?: ProductFilter) {
  return useQuery({
    queryKey: ['products', filter],
    queryFn: () => getCatalogProducts(filter),
    staleTime: 1000 * 60 * 5, // 5 minutes client cache
  });
}

/**
 * Layer 2 Hook for Single Product Detail by Slug
 */
export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => getSingleProductBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Layer 2 Hook for Categories List
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getCatalogCategories(),
    staleTime: 1000 * 60 * 10,
  });
}
