import { useMutation, useQuery } from '@tanstack/react-query';
import { orderService, CreateOrderPayload } from '@/services/order-service';

/**
 * Layer 2 Hook for Order Creation
 */
export function useCreateOrder() {
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => orderService.createOrder(payload),
  });
}

/**
 * Layer 2 Hook for Fetching User's Past Orders
 */
export function useMyOrders(token?: string) {
  return useQuery({
    queryKey: ['my-orders', token],
    queryFn: () => orderService.getMyOrders(),
    enabled: Boolean(token),
    staleTime: 1000 * 60 * 5,
  });
}
