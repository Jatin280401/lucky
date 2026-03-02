"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/login", label: "Login" },
    { href: "/contact", label: "Contact" },
    { href: "/chart", label: "Chart" },
    { href: "/", label: "Home" },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-green-400">
          A1-SATTA
        </Link>
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? "text-green-400" : "text-slate-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className={`text-sm font-medium ${
              pathname?.startsWith("/admin") ? "text-amber-400" : "text-amber-500 hover:text-amber-400"
            }`}
          >
            Admin
          </Link>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
}
