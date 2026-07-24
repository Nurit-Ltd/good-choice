import { APP_CONSTANTS } from "@/config/constants";

/**
 * Combine CSS class names safely
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format number as currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = APP_CONSTANTS.CURRENCY,
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Format ISO date string into readable format
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
