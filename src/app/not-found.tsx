import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-24 text-center px-4">
      <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-slate-800 dark:text-slate-200">Page Not Found</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-md">
        Sorry, we couldn’t find the page or product you were looking for.
      </p>
      <div className="mt-6">
        <Link href="/">
          <Button variant="default">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
