import { apiClient } from '@/lib/api-client';

export const productService = {
  getProducts: async (params?: Record<string, any>) => {
    return apiClient('/products', { params });
  },

  getProductBySlug: async (slug: string) => {
    return apiClient(`/products/${slug}`);
  },

  getCategories: async () => {
    return apiClient('/categories');
  },

  getBrands: async () => {
    return apiClient('/brands');
  },
};
