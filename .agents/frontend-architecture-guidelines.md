# Frontend 3-Layer Architecture Guidelines (Mandatory Standard)

All frontend feature developments in `good-choice-ecommerce` MUST strictly follow this **3-Layer Separation of Concerns**.

---

## 1. Layer 1: API Service Layer (`src/services/`)
- **Responsibility**: Pure API communication layer with Strapi v5 REST API (`/api/v1`).
- **Rules**:
  - Pure TypeScript async functions.
  - MUST use the central API client ([src/lib/api-client.ts](file:///d:/Oztor/next.js/good-choice-ecommerce/src/lib/api-client.ts)).
  - **STRICTLY NO** React hooks (`useState`, `useEffect`, `useQuery`) or UI code allowed here.
  - Formats endpoints, query params (Strapi filtering, populate, sorting), and returns typed data.

Example (`src/services/product-service.ts`):
```ts
import { apiClient } from '@/lib/api-client';

export const productService = {
  getProducts: async (params?: Record<string, any>) => {
    const { data } = await apiClient.get('/products', { params });
    return data;
  },
  getProductBySlug: async (slug: string) => {
    const { data } = await apiClient.get(`/products/${slug}`);
    return data;
  },
};
```

---

## 2. Layer 2: Business Logic & Custom Hooks Layer (`src/hooks/`)
- **Responsibility**: Encapsulates data fetching, cache invalidation, form validation, and state logic.
- **Rules**:
  - MUST use **TanStack React Query** (`useQuery`, `useMutation`, `useQueryClient`) for all API requests.
  - MUST use **React Hook Form** + **Zod** (`@hookform/resolvers/zod`) for forms.
  - Exposes clean UI-friendly return signatures.

Example (`src/hooks/use-products.ts`):
```ts
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product-service';

export function useProducts(params?: Record<string, any>) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params),
  });
}
```

Example Form Hook (`src/hooks/use-checkout-form.ts`):
```ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { orderService } from '@/services/order-service';

export const checkoutSchema = z.object({
  payment_method: z.enum(['cod', 'card', 'bkash', 'stripe']),
  full_name: z.string().min(2, 'Name is required'),
  phone: z.string().min(11, 'Valid phone number required'),
  address_line: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  coupon_code: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function useCheckoutForm() {
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      payment_method: 'cod',
      full_name: '',
      phone: '',
      address_line: '',
      city: '',
      coupon_code: '',
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: (data: CheckoutFormData) => orderService.createOrder(data),
  });

  return { form, checkoutMutation };
}
```

---

## 3. Layer 3: Presentation & UI Component Layer (`src/components/`, `src/app/`)
- **Responsibility**: Pure UI layout, styling, and user interaction.
- **Rules**:
  - Consume Layer 2 custom hooks (`useProducts()`, `useCheckoutForm()`).
  - **STRICTLY NO** direct `fetch`, `axios`, or raw API calls in UI components.
  - **STRICTLY NO** raw state management for complex forms—always bind with `react-hook-form`.

Example (`src/components/checkout-form.tsx`):
```tsx
'use client';

import { useCheckoutForm } from '@/hooks/use-checkout-form';

export function CheckoutForm() {
  const { form, checkoutMutation } = useCheckoutForm();

  const onSubmit = form.handleSubmit((data) => {
    checkoutMutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input {...form.register('full_name')} placeholder="Full Name" />
      {form.formState.errors.full_name && (
        <p>{form.formState.errors.full_name.message}</p>
      )}
      <button type="submit" disabled={checkoutMutation.isPending}>
        {checkoutMutation.isPending ? 'Placing Order...' : 'Place Order'}
      </button>
    </form>
  );
}
```

---

## Directory Conventions
```
src/
├── lib/
│   └── api-client.ts       # Axios/Fetch base client pointing to /api/v1
├── services/               # Layer 1: API Services
│   ├── product-service.ts
│   ├── category-service.ts
│   ├── order-service.ts
│   └── coupon-service.ts
├── hooks/                  # Layer 2: Custom Hooks (React Query & RHF)
│   ├── use-products.ts
│   ├── use-checkout-form.ts
│   └── use-coupon.ts
├── providers/              # React Context / TanStack Query Providers
│   └── query-provider.tsx
└── components/             # Layer 3: Presentation UI
```
