import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const results = await prisma.liveResult.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch live results" }, { status: 500 });
  }
}
