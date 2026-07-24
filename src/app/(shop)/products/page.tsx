import { getProducts } from "@/services/productService";
import { ProductGrid } from "@/components/features/products/ProductGrid";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          All Products
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Browse our collection of handpicked premium items.
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
