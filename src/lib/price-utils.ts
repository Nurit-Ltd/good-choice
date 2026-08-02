/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DisplayPrice {
  originalPrice: number;
  discountPrice: number;
  hasDiscount: boolean;
  formattedOriginal: string;
  formattedDiscount: string;
}

/**
 * Standardized Price Calculation Helper for E-Commerce Catalog & Checkout
 * Resolves price seamlessly whether a product is a simple product or variant-based product.
 */
export function getDisplayPrice(product: any, selectedVariant?: any): DisplayPrice {
  let originalPrice = 0;
  let discountPrice = 0;

  if (product?.has_variants && selectedVariant) {
    originalPrice = Number(selectedVariant.original_price || selectedVariant.price || 0);
    discountPrice = Number(selectedVariant.discount_price || originalPrice);
  } else {
    originalPrice = Number(product?.base_price || product?.price || 0);
    discountPrice = Number(product?.base_discount_price || product?.discount_price || originalPrice);
  }

  const hasDiscount = discountPrice < originalPrice && discountPrice > 0;

  return {
    originalPrice,
    discountPrice,
    hasDiscount,
    formattedOriginal: `৳${originalPrice.toLocaleString('en-BD')}`,
    formattedDiscount: `৳${discountPrice.toLocaleString('en-BD')}`,
  };
}
