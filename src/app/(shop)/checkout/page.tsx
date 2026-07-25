import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function CheckoutPage() {
  return (
    <div className="container py-12 space-y-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-bold">Shipping Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">First Name</label>
                <Input placeholder="First Name" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Last Name</label>
                <Input placeholder="Last Name" required />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Street Address</label>
              <Input placeholder="Street Address" required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">City</label>
                <Input placeholder="City" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">State</label>
                <Input placeholder="State" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Postal Code</label>
                <Input placeholder="Postal Code" required />
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 space-y-4">
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
            <Button variant="default" className="w-full">
              Place Order
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
