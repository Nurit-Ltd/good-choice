import { apiClient } from '@/lib/api-client';

export interface ValidateCouponPayload {
  code: string;
  cart_subtotal: number;
  user_id?: number | string;
}

export const couponService = {
  validateCoupon: async (payload: ValidateCouponPayload) => {
    return apiClient('/coupons/validate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
