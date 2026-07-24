import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function RegisterPage() {
  return (
    <Card className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Create an Account</h2>
        <p className="text-sm text-slate-500">Join Good Choice E-Commerce today</p>
      </div>

      <form className="space-y-4">
        <Input label="Full Name" placeholder="John Doe" required />
        <Input label="Email address" type="email" placeholder="you@example.com" required />
        <Input label="Password" type="password" placeholder="••••••••" required />
        <Button variant="primary" className="w-full">
          Create Account
        </Button>
      </form>

      <p className="text-center text-xs text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-slate-900 underline dark:text-white">
          Sign In
        </Link>
      </p>
    </Card>
  );
}
