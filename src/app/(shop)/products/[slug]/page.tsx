import { ProductDetailSection } from "@/components/features/products/ProductDetailSection";
import { RecentlyCrafted } from "@/components/features/home/RecentlyCrafted";
import { getProductBySlug, getRelatedProducts } from "@/services/productService";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(slug, 4);

  return (
    <div className="w-full">
      {/* Top Breadcrumb Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center gap-2 font-body text-xs text-grey-600">
          <Link href="/" className="hover:text-grey-950 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-grey-950 transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-grey-950 font-medium">{product.name}</span>
        </div>
      </div>

      {/* Separate Product Details Component (Sticky Desktop Specs + Mobile Gallery Carousel) */}
      <ProductDetailSection product={product} />

      {/* Related Products Carousel Section */}
      <RecentlyCrafted title="Related Products" products={relatedProducts} />
    </div>
  );
}
