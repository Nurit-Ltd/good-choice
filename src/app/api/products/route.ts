import { NextResponse } from "next/server";
import { getProducts } from "@/services/productService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const searchQuery = searchParams.get("q") || undefined;

  const products = await getProducts({ category, searchQuery });
  return NextResponse.json({ success: true, data: products });
}
