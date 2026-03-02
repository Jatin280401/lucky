"use client";

import { useEffect, useState } from "react";

interface ChartData {
  mainChart: Record<string, string>[];
  secondChart: Record<string, string>[];
  mainGames: { slug: string; name: string }[];
  secondGames: { slug: string; name: string }[];
  dates: string[];
}

export default function ResultChart() {
  const [data, setData] = useState<ChartData | null>(null);

  useEffect(() => {
    fetch("/api/chart")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div className="animate-pulse h-48 bg-slate-800 rounded my-6" />;

  const renderTable = (
    chart: Record<string, string>[],
    games: { slug: string; name: string }[]
  ) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse bg-slate-800 rounded-lg text-sm">
        <thead>
          <tr className="bg-slate-700">
            <th className="px-3 py-2 text-left text-slate-300 border border-slate-600">
              Date
            </th>
            {games.map((g) => (
              <th
                key={g.slug}
                className="px-3 py-2 text-center text-slate-300 border border-slate-600 whitespace-nowrap"
              >
                {g.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chart.map((row, i) => (
            <tr key={i} className="border-b border-slate-700">
              <td className="px-3 py-2 border border-slate-600 font-medium">
                {row.date}
              </td>
              {games.map((g) => (
                <td
                  key={g.slug}
                  className="px-3 py-2 text-center border border-slate-600"
                >
                  {row[g.slug] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold text-green-400 mb-4">
        SATTA RECORD CHART 2026
      </h2>
      <h3 className="text-lg font-semibold text-slate-300 mb-2">
        MARCH 2026 RESULT CHART
      </h3>
      {renderTable(data.mainChart, data.mainGames)}
      {renderTable(data.secondChart, data.secondGames)}
    </div>
  );
}
