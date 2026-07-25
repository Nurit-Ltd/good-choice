import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <Card className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Create an Account</h2>
        <p className="text-sm text-slate-500">Join Good Choice E-Commerce today</p>
      </div>

      <form className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Full Name</label>
          <Input placeholder="John Doe" required />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Email address</label>
          <Input type="email" placeholder="you@example.com" required />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Password</label>
          <Input type="password" placeholder="••••••••" required />
        </div>
        <Button variant="default" className="w-full">
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
