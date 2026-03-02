"use client";

import { useEffect, useState } from "react";

interface LiveResult {
  id: string;
  name: string;
  result: string | null;
  time: string | null;
  order: number;
}

export default function AdminLiveResultsPage() {
  const [results, setResults] = useState<LiveResult[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/live-results")
      .then((res) => res.json())
      .then(setResults)
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/live-results", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(results),
      });
      if (!res.ok) throw new Error("Failed");
      setMessage("Saved successfully!");
    } catch {
      setMessage("Failed to save");
    }
    setSaving(false);
  };

  const update = (id: string, field: keyof LiveResult, value: string | null) => {
    setResults((r) =>
      r.map((x) => (x.id === id ? { ...x, [field]: value } : x))
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Live Results</h1>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-600">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Result</th>
              <th className="py-2 pr-4">Time</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id} className="border-b border-slate-700">
                <td className="py-2 pr-4">
                  <input
                    value={r.name}
                    onChange={(e) => update(r.id, "name", e.target.value)}
                    className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-white w-40"
                  />
                </td>
                <td className="py-2 pr-4">
                  <input
                    value={r.result ?? ""}
                    onChange={(e) => update(r.id, "result", e.target.value || null)}
                    className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-white w-24"
                  />
                </td>
                <td className="py-2 pr-4">
                  <input
                    value={r.time ?? ""}
                    onChange={(e) => update(r.id, "time", e.target.value || null)}
                    className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-white w-24"
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
