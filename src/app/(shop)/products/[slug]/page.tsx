import { notFound } from "next/navigation";
import { getProductBySlug } from "@/services/productService";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="aspect-square w-full rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-8xl">
          📦
        </div>

        <div className="space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {product.category}
            </span>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {product.name}
            </h1>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-slate-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.description}
          </p>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <Button size="lg" className="w-full">
              Add to Shopping Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
