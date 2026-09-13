import { Metadata } from "next";
import { getServicesPageData } from "@/services/servicesPageService";
import { ServicesPageClient } from "./ServicesPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getServicesPageData();
  return {
    title: pageData.metaTitle || "Bespoke Furniture & Interior Craftsmanship Services | Good Choice",
    description:
      pageData.metaDescription ||
      "Explore bespoke woodworking, 3D spatial interior planning, fine upholstery tailoring, and antique furniture restoration care by Good Choice Furniture.",
  };
}

export default async function ServicesPage() {
  const pageData = await getServicesPageData();

  return (
    <div className="w-full min-h-screen flex flex-col">
      <ServicesPageClient initialData={pageData} />
    </div>
  );
}
