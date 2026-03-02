"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ChartLink {
  name: string;
  slug: string;
  year: string;
}

const GAMES: ChartLink[] = [
  { name: "daman", slug: "daman", year: "2026" },
  { name: "karol bagh", slug: "karol-bagh", year: "2026" },
  { name: "raj shree", slug: "raj-shree", year: "2026" },
  { name: "gali", slug: "gali", year: "2026" },
  { name: "dwarka", slug: "dwarka", year: "2026" },
  { name: "gaziabad", slug: "gaziabad", year: "2026" },
  { name: "alwar", slug: "alwar", year: "2026" },
  { name: "faridabad", slug: "faridabad", year: "2026" },
  { name: "agra", slug: "agra", year: "2026" },
  { name: "shri ganesh", slug: "shri-ganesh", year: "2026" },
  { name: "delhi bazar", slug: "delhi-bazar", year: "2026" },
  { name: "gwalior", slug: "gwalior", year: "2026" },
  { name: "sadar bazar", slug: "sadar-bazar", year: "2026" },
  { name: "disawer", slug: "disawer", year: "2026" },
  { name: "hr satta", slug: "hr-satta", year: "2026" },
  { name: "ujjala super", slug: "ujjala-super", year: "2026" },
  { name: "new ganga", slug: "new-ganga", year: "2026" },
  { name: "delhi matka", slug: "delhi-matka", year: "2026" },
  { name: "dehradun city", slug: "dehradun-city", year: "2026" },
  { name: "kkr city", slug: "kkr-city", year: "2026" },
  { name: "delhi darbar", slug: "delhi-darbar", year: "2026" },
  { name: "mandi bazar", slug: "mandi-bazar", year: "2026" },
  { name: "madhupuri", slug: "madhupuri", year: "2026" },
  { name: "fatehabad", slug: "fatehabad-", year: "2026" },
];

export default function ChartPageContent() {
  const [yearFilter, setYearFilter] = useState("2026");

  const filtered = GAMES.filter((g) => g.year === yearFilter);

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setYearFilter("2026")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            yearFilter === "2026"
              ? "bg-green-600 text-white"
              : "bg-slate-700 text-slate-400 hover:bg-slate-600"
          }`}
        >
          2026
        </button>
        <button
          onClick={() => setYearFilter("2024")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            yearFilter === "2024"
              ? "bg-green-600 text-white"
              : "bg-slate-700 text-slate-400 hover:bg-slate-600"
          }`}
        >
          2024
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((game) => (
          <Link
            key={game.slug}
            href={`/${game.slug}`}
            className="block bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-300 hover:text-green-400 transition-colors capitalize"
          >
            {game.name} satta king chart {game.year}
          </Link>
        ))}
      </div>
    </div>
  );
}
