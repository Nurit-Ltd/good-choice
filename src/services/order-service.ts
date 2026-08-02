import { apiClient } from '@/lib/api-client';

export interface CreateOrderPayload {
  payment_method: 'cod' | 'card' | 'bkash' | 'stripe';
  shipping_address: {
    full_name: string;
    phone: string;
    address_line: string;
    city: string;
    postal_code?: string;
  };
  coupon_code?: string;
  notes?: string;
  shipping_charge?: number;
  tax_amount?: number;
  items: Array<{
    product_id: string | number;
    variant_id?: string | number | null;
    quantity: number;
  }>;
}

export const orderService = {
  createOrder: async (payload: CreateOrderPayload) => {
    return apiClient('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  getMyOrders: async () => {
    return apiClient('/orders/my-orders');
  },
};
