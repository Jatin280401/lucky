"use client";

import { useEffect, useState } from "react";

interface SattaGame {
  id: string;
  name: string;
  slug: string;
  time: string;
  yesterday: string | null;
  today: string | null;
  category: string;
}

export default function AdminGamesPage() {
  const [games, setGames] = useState<SattaGame[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState<"all" | "main" | "second">("all");

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => setGames([...data.main, ...data.second]))
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/games", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(games),
      });
      if (!res.ok) throw new Error("Failed");
      setMessage("Saved successfully!");
    } catch {
      setMessage("Failed to save");
    }
    setSaving(false);
  };

  const update = (id: string, field: keyof SattaGame, value: string | null) => {
    setGames((g) =>
      g.map((x) => (x.id === id ? { ...x, [field]: value } : x))
    );
  };

  const filtered =
    filter === "all"
      ? games
      : games.filter((g) => g.category === filter);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Satta Games</h1>
      <div className="flex gap-4 mb-4">
        {(["all", "main", "second"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded ${
              filter === f ? "bg-green-600" : "bg-slate-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-600">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Time</th>
              <th className="py-2 pr-4">Yesterday</th>
              <th className="py-2 pr-4">Today</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((g) => (
              <tr key={g.id} className="border-b border-slate-700">
                <td className="py-2 pr-4">
                  <input
                    value={g.name}
                    onChange={(e) => update(g.id, "name", e.target.value)}
                    className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-white w-32"
                  />
                </td>
                <td className="py-2 pr-4">
                  <input
                    value={g.time}
                    onChange={(e) => update(g.id, "time", e.target.value)}
                    className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-white w-24"
                  />
                </td>
                <td className="py-2 pr-4">
                  <input
                    value={g.yesterday ?? ""}
                    onChange={(e) =>
                      update(g.id, "yesterday", e.target.value || null)
                    }
                    className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-white w-20"
                  />
                </td>
                <td className="py-2 pr-4">
                  <input
                    value={g.today ?? ""}
                    onChange={(e) =>
                      update(g.id, "today", e.target.value || null)
                    }
                    className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-white w-20"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
