import { Card } from "@/components/ui/Card";

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        My Orders
      </h1>

      <Card className="text-center py-12 space-y-2">
        <p className="text-slate-500 text-sm">You haven&apos;t placed any orders yet.</p>
      </Card>
    </div>
  );
}
