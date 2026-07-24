import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Shopping Cart
      </h1>

      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center space-y-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="text-5xl">🛒</div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your cart is currently empty</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Explore our collection and add items to your cart to begin your order.
        </p>
        <div>
          <Link href="/products">
            <Button variant="primary">Start Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
