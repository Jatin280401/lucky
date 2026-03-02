import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const games = await prisma.sattaGame.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });
    const main = games.filter((g) => g.category === "main");
    const second = games.filter((g) => g.category === "second");
    return NextResponse.json({ main, second });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}
