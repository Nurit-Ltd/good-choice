import { RecentlyCrafted } from "@/components/features/home/RecentlyCrafted";
import { getProductBySlug, getRelatedProducts } from "@/services/productService";
import { Palette, Sparkles, Users } from "lucide-react";
import Image from "next/image";
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

  const images = product.images.length > 0 ? product.images : ["/images/product/product-1.png"];
  const secondaryImage = images[1] || images[0];

  return (
    <div className="w-full bg-[#F8F6F4] pb-24">
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

      {/* Main Details Section (Matching Screenshot 3) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column: Stacked Image Gallery */}
          <div className="flex flex-col gap-6">
            <div className="relative w-full aspect-8/5 rounded-lg overflow-hidden shadow-sm bg-white">
              <Image
                src={images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="relative w-full aspect-8/5 rounded-lg overflow-hidden shadow-sm bg-white">
              <Image
                src={secondaryImage}
                alt={`${product.name} alternate view`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="flex flex-col gap-8">
            {/* Title & Description */}
            <div className="space-y-4">
              <h1
                className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-normal leading-[110%] tracking-tight text-grey-950"
                style={{ color: "var(--color-grey-950, #292929)" }}
              >
                {product.name}
              </h1>

              <p
                className="font-body text-sm sm:text-base leading-[160%] text-grey-700 max-w-xl"
                style={{ color: "var(--color-grey-700, #525252)" }}
              >
                {product.description}
              </p>
            </div>

            {/* Order Now CTA Button */}
            <div>
              <Link
                href={`https://wa.me/8801700000000?text=Hi,%20I%20would%20like%20to%20order%20the%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-3.5 px-8 rounded-full font-body font-medium text-base text-white shadow-md transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] text-center"
                style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
              >
                Order Now
              </Link>
            </div>

            {/* Key Features List */}
            <div className="space-y-3 pt-2">
              <h3 className="font-body text-base font-semibold text-grey-950">
                Key Features
              </h3>
              <ul className="space-y-2 font-body text-sm text-grey-700">
                {product.keyFeatures?.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-950 mt-2 shrink-0" style={{ backgroundColor: "var(--color-primary-950, #62103A)" }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spec Boxes Grid (Matching Screenshot 3) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-secondary-100/60 border border-secondary-200/50 flex flex-col gap-2">
                <Palette className="w-5 h-5 text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }} />
                <span className="font-body text-xs font-semibold text-grey-950">Style</span>
                <span className="font-body text-xs text-grey-700">{product.specs?.style || "Modern Contemporary"}</span>
              </div>

              <div className="p-4 rounded-lg bg-secondary-100/60 border border-secondary-200/50 flex flex-col gap-2">
                <Users className="w-5 h-5 text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }} />
                <span className="font-body text-xs font-semibold text-grey-950">Seating Capacity</span>
                <span className="font-body text-xs text-grey-700">{product.specs?.seatingCapacity || "3-4 Seater (per unit)"}</span>
              </div>

              <div className="p-4 rounded-lg bg-secondary-100/60 border border-secondary-200/50 flex flex-col gap-2">
                <Sparkles className="w-5 h-5 text-primary-950" style={{ color: "var(--color-primary-950, #62103A)" }} />
                <span className="font-body text-xs font-semibold text-grey-950">Upholstery</span>
                <span className="font-body text-xs text-grey-700">{product.specs?.upholstery || "Premium Fabric"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Carousel Section */}
      <div className="mt-16 sm:mt-24">
        <RecentlyCrafted title="Related Products" products={relatedProducts} />
      </div>
    </div>
  );
}
