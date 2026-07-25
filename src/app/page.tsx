import Link from "next/link";
import { getProducts } from "@/services/productService";
import { ProductGrid } from "@/components/features/products/ProductGrid";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <div className="space-y-16 py-10">
      {/* Hero Section */}
      <section className="container">
        <div className="rounded-3xl bg-slate-900 px-6 py-20 text-center text-white sm:py-28 lg:px-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-block bg-slate-800 px-4 py-1.5 text-5xl font-heading tracking-wider text-slate-300">
            Shop By Room
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              Elevate Your Lifestyle with Good Choice
            </h1>
            <p className="text-lg text-slate-300 max-w-xl mx-auto">
              Discover premium electronics, modern fashion, and everyday essentials curated for quality and elegance.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                  Shop Catalog
                </Button>
              </Link>
              <Link href="/products?category=electronics">
                <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                  Explore Electronics
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Our top trending items selected just for you.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-slate-900 hover:underline dark:text-white"
          >
            View all →
          </Link>
        </div>

        <ProductGrid products={featuredProducts} />
      </section>
    </div>
  );
}
