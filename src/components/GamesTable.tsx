"use client";

import Link from "next/link";
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

interface GamesData {
  main: SattaGame[];
  second: SattaGame[];
}

function TableSection({
  games,
  columns,
}: {
  games: SattaGame[];
  columns: { label: string; key: keyof SattaGame }[];
}) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse bg-slate-800 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-slate-700">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-sm font-medium text-slate-300 border-b border-slate-600"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id} className="border-b border-slate-700 hover:bg-slate-750">
              <td className="px-4 py-3">
                <Link
                  href={`/${game.slug}`}
                  className="text-green-400 hover:text-green-300 font-medium"
                >
                  {game.name}
                </Link>
                <span className="text-slate-500 text-sm ml-2">{game.time}</span>
              </td>
              <td className="px-4 py-3 text-slate-300">{game.yesterday ?? "--"}</td>
              <td className="px-4 py-3">
                <span
                  className={`font-bold ${
                    game.today && game.today !== "--"
                      ? "text-green-400"
                      : "text-slate-500"
                  }`}
                >
                  {game.today ?? "--"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function GamesTable() {
  const [data, setData] = useState<GamesData | null>(null);

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div className="animate-pulse h-32 bg-slate-800 rounded" />;

  const columns = [
    { label: "सट्टा का नाम", key: "name" as keyof SattaGame },
    { label: "कल आया था", key: "yesterday" as keyof SattaGame },
    { label: "आज का रिज़ल्ट", key: "today" as keyof SattaGame },
  ];

  return (
    <>
      <TableSection games={data.main} columns={columns} />
      <TableSection games={data.second} columns={columns} />
    </>
  );
}
