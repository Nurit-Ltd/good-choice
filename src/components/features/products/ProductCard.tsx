import Link from "next/link";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="aspect-square w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-4xl">
        📦
      </div>
      <div className="flex flex-1 flex-col p-4 space-y-2">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
          {product.category}
        </span>
        <h3 className="font-semibold text-base text-slate-900 dark:text-white line-clamp-1">
          <Link href={`/products/${product.slug}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2">{product.description}</p>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
          <Button size="sm" variant="outline" className="relative z-10">
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
