export const APP_CONSTANTS = {
  CURRENCY: "USD",
  CURRENCY_SYMBOL: "$",
  TAX_RATE: 0.08,
  SHIPPING_FEE: 15,
  FREE_SHIPPING_THRESHOLD: 100,
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 12,
  },
  LOCAL_STORAGE_KEYS: {
    CART: "good_choice_cart_items",
    USER: "good_choice_user_session",
  },
} as const;
