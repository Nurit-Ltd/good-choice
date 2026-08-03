import { useMutation } from '@tanstack/react-query';
import { couponService, ValidateCouponPayload } from '@/services/coupon-service';

export function useValidateCoupon() {
  return useMutation({
    mutationFn: (payload: ValidateCouponPayload) => couponService.validateCoupon(payload),
  });
}
