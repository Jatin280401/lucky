import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userId: string | null = null;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch {
    redirect("/login");
  }
  if (!userId) {
    redirect("/login");
  }
  const adminIds = (process.env.ADMIN_USER_IDS || "").split(",").map((id) => id.trim()).filter(Boolean);
  if (adminIds.length > 0 && !adminIds.includes(userId)) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/admin" className="text-xl font-bold text-amber-400">
            Admin Panel
          </Link>
          <div className="flex gap-4">
            <Link
              href="/admin/config"
              className="text-slate-300 hover:text-white"
            >
              Site Config
            </Link>
            <Link
              href="/admin/live-results"
              className="text-slate-300 hover:text-white"
            >
              Live Results
            </Link>
            <Link
              href="/admin/games"
              className="text-slate-300 hover:text-white"
            >
              Games
            </Link>
            <Link
              href="/admin/chart"
              className="text-slate-300 hover:text-white"
            >
              Chart Data
            </Link>
            <Link
              href="/admin/content"
              className="text-slate-300 hover:text-white"
            >
              Content
            </Link>
            <Link href="/" className="text-green-400 hover:text-green-300">
              View Site
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
