import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-4">
            <h2 className="text-lg font-bold">Shipping Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="First Name" required />
              <Input label="Last Name" required />
            </div>
            <Input label="Street Address" required />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input label="City" required />
              <Input label="State" required />
              <Input label="Postal Code" required />
            </div>
          </Card>
        </div>

        <div>
          <Card className="space-y-4">
            <h2 className="text-lg font-bold">Order Summary</h2>
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping</span>
                <span>Calculated at next step</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Total</span>
                <span>$0.00</span>
              </div>
            </div>
            <Button variant="primary" className="w-full">
              Place Order
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
