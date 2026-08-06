import { getHomePageData } from "@/services/homePageService";
import { HomePageClient } from "./HomePageClient";

// Revalidate every 60 seconds (ISR) or on-demand via Strapi webhooks
export const revalidate = 60;

export default async function Home() {
  // Preload data on server side before rendering HTML
  const initialData = await getHomePageData();

  return <HomePageClient initialData={initialData} />;
}
