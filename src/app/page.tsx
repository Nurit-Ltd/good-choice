import { Banner } from "@/components/features/home/Banner";
import { ShopByRoom } from "@/components/features/home/ShobByRoom";
import { ProductGrid } from "@/components/features/products/ProductGrid";
import { getProducts } from "@/services/productService";
import Link from "next/link";

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <div className="pb-16">
      {/* Hero Banner Section */}
      <section className="px-4 pt-4">
        <Banner />
      </section>

      {/* Shop By Room Section */}
      <ShopByRoom />

      {/* Featured Products */}
      <section className="container space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Featured Products</h2>
            <p className="mt-1 text-sm text-slate-500">Our top trending items selected just for you.</p>
          </div>
          <Link href="/products" className="text-sm font-semibold text-slate-900 hover:underline dark:text-white">
            View all →
          </Link>
        </div>

        <ProductGrid products={featuredProducts} />
      </section>
    </div>
  );
}
