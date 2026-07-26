import { CategorySelect } from "@/components/features/products/CategorySelect";
import { ProductCard } from "@/components/features/products/ProductCard";
import { ProductHeader } from "@/components/features/products/ProductHeader";
import { CustomArrowLeft, CustomArrowRight } from "@/components/shared/svgs";
import { getProductsPaginated } from "@/services/productService";
import { PackageOpen } from "lucide-react";
import Link from "next/link";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const category = params.category || "all";

  const { products, total, totalPages, currentPage } = await getProductsPaginated({
    page,
    limit: 12,
    category,
  });

  const categoryTitle =
    category === "all"
      ? "All Collections"
      : category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="w-full pb-20 bg-[#F8F6F4]">
      {/* Category Banner Header with Watermark */}
      <section className="px-4 pt-4">
        <ProductHeader
          title={categoryTitle}
          categoryParent="Home"
          categoryName={categoryTitle}
        />
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        {/* Filter & Count Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-grey-200">
          <div className="font-body text-sm text-grey-700">
            <span className="font-semibold text-grey-950">{categoryTitle}</span>
            <span className="mx-2">•</span>
            <span>{total} items</span>
          </div>

          {/* Reusable Category Dropdown Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <CategorySelect currentCategory={category} />
          </div>
        </div>

        {/* Empty Product State Handling */}
        {products.length === 0 ? (
          <div className="w-full py-16 px-6 text-center flex flex-col items-center justify-center rounded-3xl bg-white border border-secondary-200/80 shadow-xs space-y-4 my-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-primary-950 bg-secondary-100/60"
              style={{ color: "var(--color-primary-950, #62103A)" }}
            >
              <PackageOpen className="w-8 h-8" />
            </div>
            <h3
              className="font-heading text-2xl sm:text-3xl font-normal text-grey-950"
              style={{ color: "var(--color-grey-950, #292929)" }}
            >
              No Products Found
            </h3>
            <p className="font-body text-sm text-grey-600 max-w-md mx-auto">
              We couldn&apos;t find any items in the &quot;{categoryTitle}&quot; category right now. Try selecting another category or view all collections.
            </p>
            <div className="pt-2">
              <Link
                href="/products?category=all"
                className="inline-flex items-center px-6 py-2.5 rounded-full font-body text-xs font-semibold text-white transition-transform hover:scale-105 shadow-xs"
                style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
              >
                View All Collections
              </Link>
            </div>
          </div>
        ) : (
          /* 12-Item Products Grid (4 Columns x 3 Rows) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination Controls (Matching Custom SVG Arrows Design) */}
        {totalPages > 1 && (
          <div className="pt-12 flex items-center justify-between sm:justify-center gap-4 sm:gap-8">
            {/* Previous Page Link */}
            {currentPage > 1 ? (
              <Link
                href={`/products?category=${category}&page=${currentPage - 1}`}
                className="inline-flex items-center gap-2 font-body text-sm sm:text-base font-medium text-grey-950 hover:text-primary-950 transition-colors"
              >
                <CustomArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Previous</span>
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 font-body text-sm sm:text-base font-medium text-grey-400 opacity-40 cursor-not-allowed">
                <CustomArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Previous</span>
              </span>
            )}

            {/* Page Number Buttons */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = pageNum === currentPage;
                return (
                  <Link
                    key={pageNum}
                    href={`/products?category=${category}&page=${pageNum}`}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-body text-xs font-semibold transition-all shadow-xs ${
                      isActive
                        ? "text-white shadow-md scale-105"
                        : "text-grey-700 bg-white border border-secondary-200 hover:bg-secondary-50"
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: "var(--color-primary-950, #62103A)" }
                        : undefined
                    }
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>

            {/* Next Page Link */}
            {currentPage < totalPages ? (
              <Link
                href={`/products?category=${category}&page=${currentPage + 1}`}
                className="inline-flex items-center gap-2 font-body text-sm sm:text-base font-medium text-primary-950 hover:text-[#4a0c2c] transition-colors"
              >
                <span>Next</span>
                <CustomArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 font-body text-sm sm:text-base font-medium text-grey-400 opacity-40 cursor-not-allowed">
                <span>Next</span>
                <CustomArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
