import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{siteConfig.name}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {siteConfig.description}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/products" className="hover:text-slate-900 dark:hover:text-white">All Products</Link></li>
              <li><Link href="/products?category=electronics" className="hover:text-slate-900 dark:hover:text-white">Electronics</Link></li>
              <li><Link href="/products?category=fashion" className="hover:text-slate-900 dark:hover:text-white">Fashion</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/orders" className="hover:text-slate-900 dark:hover:text-white">Track Order</Link></li>
              <li><Link href="/cart" className="hover:text-slate-900 dark:hover:text-white">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Account</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/login" className="hover:text-slate-900 dark:hover:text-white">Sign In</Link></li>
              <li><Link href="/register" className="hover:text-slate-900 dark:hover:text-white">Register</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
