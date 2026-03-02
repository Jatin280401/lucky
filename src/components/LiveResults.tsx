"use client";

import { useEffect, useState } from "react";

interface LiveResult {
  id: string;
  name: string;
  result: string | null;
  time: string | null;
  order: number;
}

export default function LiveResults() {
  const [results, setResults] = useState<LiveResult[]>([]);

  useEffect(() => {
    fetch("/api/live-results")
      .then((res) => res.json())
      .then(setResults)
      .catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
      {results.map((r) => (
        <div
          key={r.id}
          className="bg-slate-800 border border-slate-600 rounded-lg p-4 text-center"
        >
          <p className="text-slate-400 text-sm uppercase">{r.name}</p>
          <p className="text-2xl font-bold text-green-400 mt-1">
            {r.result ?? "--"}
          </p>
          {r.time && (
            <p className="text-xs text-slate-500 mt-1">{r.time}</p>
          )}
        </div>
      ))}
    </div>
  );
}
