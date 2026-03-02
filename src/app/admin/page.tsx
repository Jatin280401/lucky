import Link from "next/link";

export default function AdminDashboard() {
  const links = [
    { href: "/admin/config", label: "Site Configuration", desc: "Edit site name, messages, links" },
    { href: "/admin/live-results", label: "Live Results", desc: "Edit alwar, mandi bazar, lion bazar, disawer" },
    { href: "/admin/games", label: "Satta Games", desc: "Edit game results (yesterday, today)" },
    { href: "/admin/chart", label: "Chart Data", desc: "Edit daily result chart" },
    { href: "/admin/content", label: "Content Sections", desc: "Edit FAQ, descriptions, all text content" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg p-6 transition-colors"
          >
            <h2 className="text-lg font-semibold text-green-400 mb-2">
              {link.label}
            </h2>
            <p className="text-slate-400 text-sm">{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
