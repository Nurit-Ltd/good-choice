import { Card } from "@/components/ui/card";

export default function OrdersPage() {
  return (
    <div className="container py-12 space-y-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        My Orders
      </h1>

      <Card className="text-center py-12 space-y-2">
        <p className="text-slate-500 text-sm">You haven&apos;t placed any orders yet.</p>
      </Card>
    </div>
  );
}
