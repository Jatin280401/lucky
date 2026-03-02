import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const sections = await prisma.contentSection.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(sections);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}
