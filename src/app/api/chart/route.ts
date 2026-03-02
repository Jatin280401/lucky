import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const results = await prisma.dailyResult.findMany({
      orderBy: [{ date: "desc" }, { gameSlug: "asc" }],
    });
    const games = await prisma.sattaGame.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });
    const mainGames = games.filter((g) => g.category === "main");
    const secondGames = games.filter((g) => g.category === "second");
    const dates = [...new Set(results.map((r) => r.date))].sort();

    const buildChart = (gameSlugs: string[]) => {
      return dates.map((date) => {
        const row: Record<string, string> = { date };
        gameSlugs.forEach((slug) => {
          const r = results.find((x) => x.date === date && x.gameSlug === slug);
          row[slug] = r?.result ?? "-";
        });
        return row;
      });
    };

    return NextResponse.json({
      mainChart: buildChart(mainGames.map((g) => g.slug)),
      secondChart: buildChart(secondGames.map((g) => g.slug)),
      mainGames,
      secondGames,
      dates,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch chart" }, { status: 500 });
  }
}
