"use client";

import { useEffect, useState } from "react";

interface ChartData {
  mainChart: Record<string, string>[];
  secondChart: Record<string, string>[];
  mainGames: { slug: string; name: string }[];
  secondGames: { slug: string; name: string }[];
  dates: string[];
}

interface ChartRow {
  date: string;
  gameSlug: string;
  result: string;
}

export default function AdminChartPage() {
  const [data, setData] = useState<ChartData | null>(null);
  const [rows, setRows] = useState<ChartRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/chart")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        const r: ChartRow[] = [];
        [...d.mainChart, ...d.secondChart].forEach((row) => {
          Object.entries(row).forEach(([key, val]) => {
            if (key !== "date") {
              r.push({ date: row.date, gameSlug: key, result: String(val ?? "") });
            }
          });
        });
        setRows(r);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/chart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rows),
      });
      if (!res.ok) throw new Error("Failed");
      setMessage("Saved successfully!");
    } catch {
      setMessage("Failed to save");
    }
    setSaving(false);
  };

  const update = (date: string, gameSlug: string, result: string) => {
    setRows((r) =>
      r.map((x) =>
        x.date === date && x.gameSlug === gameSlug ? { ...x, result } : x
      )
    );
  };

  if (!data) return <div className="text-slate-400">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Chart Data</h1>
      <div className="overflow-x-auto space-y-8">
        <div>
          <h2 className="text-lg text-green-400 mb-2">Main Games</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-600">
                <th className="py-2 pr-4">Date</th>
                {data.mainGames.map((g) => (
                  <th key={g.slug} className="py-2 pr-2">
                    {g.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.dates.map((date) => (
                <tr key={date} className="border-b border-slate-700">
                  <td className="py-2 pr-4 font-medium">{date}</td>
                  {data.mainGames.map((g) => {
                    const row = rows.find(
                      (r) => r.date === date && r.gameSlug === g.slug
                    );
                    return (
                      <td key={g.slug} className="py-2 pr-2">
                        <input
                          value={row?.result ?? ""}
                          onChange={(e) =>
                            update(date, g.slug, e.target.value)
                          }
                          className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-white w-12"
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="text-lg text-green-400 mb-2">Second Category</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-600">
                <th className="py-2 pr-4">Date</th>
                {data.secondGames.map((g) => (
                  <th key={g.slug} className="py-2 pr-2">
                    {g.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.dates.map((date) => (
                <tr key={date} className="border-b border-slate-700">
                  <td className="py-2 pr-4 font-medium">{date}</td>
                  {data.secondGames.map((g) => {
                    const row = rows.find(
                      (r) => r.date === date && r.gameSlug === g.slug
                    );
                    return (
                      <td key={g.slug} className="py-2 pr-2">
                        <input
                          value={row?.result ?? ""}
                          onChange={(e) =>
                            update(date, g.slug, e.target.value)
                          }
                          className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-white w-12"
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-500 rounded font-medium disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save"}
      </button>
      {message && (
        <p className={`mt-2 ${message.includes("Failed") ? "text-red-400" : "text-green-400"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
