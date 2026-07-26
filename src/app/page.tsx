import { Banner } from "@/components/features/home/Banner";
import { Collections } from "@/components/features/home/Collections";
import { Experiences } from "@/components/features/home/Experiences";
import { Explore } from "@/components/features/home/Explore";
import { MadeFurniture } from "@/components/features/home/MadeFurniture";
import { RecentlyCrafted } from "@/components/features/home/RecentlyCrafted";
import { ShopByRoom } from "@/components/features/home/ShobByRoom";
import { getProducts } from "@/services/productService";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="pb-16 space-y-0">
      {/* Hero Banner Section */}
      <section className="px-4 pt-4">
        <Banner />
      </section>

      {/* Shop By Room Section */}
      <ShopByRoom />

      {/* Made Furniture Craftsmanship Section */}
      <MadeFurniture />

      {/* Recently Crafted Slider Section */}
      <RecentlyCrafted products={products} />

      {/* Grand Atelier Collections Section */}
      <Collections />

      {/* Explore Elevated Living Essentials Section */}
      <Explore products={products} />

      {/* Crafted Experiences Section */}
      <Experiences />
    </div>
  );
}
