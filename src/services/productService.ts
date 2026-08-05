import { Product, ProductFilter } from "@/types/product";
import { getCatalogProducts, getSingleProductBySlug } from "./catalogService";

export async function getProducts(filter?: ProductFilter): Promise<Product[]> {
  const result = await getCatalogProducts(filter);
  return result.products;
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
  return await getCatalogProducts({ page, limit, category });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return await getSingleProductBySlug(slug);
}

export async function getRelatedProducts(slug: string, limit = 4): Promise<Product[]> {
  const current = await getProductBySlug(slug);
  const { products: all } = await getCatalogProducts({ limit: 20 });

  if (!current || all.length === 0) {
    return all.slice(0, limit);
  }

  const related = all.filter(
    (p) => p.slug !== current.slug && p.category === current.category
  );

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  const fallback = all.filter((p) => p.slug !== current.slug);
  return fallback.slice(0, limit);
}
