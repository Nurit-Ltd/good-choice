import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  return (
    <Card className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Welcome Back</h2>
        <p className="text-sm text-slate-500">Sign in to your account</p>
      </div>

      <form className="space-y-4">
        <Input label="Email address" type="email" placeholder="you@example.com" required />
        <Input label="Password" type="password" placeholder="••••••••" required />
        <Button variant="primary" className="w-full">
          Sign In
        </Button>
      </form>

      <p className="text-center text-xs text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-slate-900 underline dark:text-white">
          Register here
        </Link>
      </p>
    </Card>
  );
}
