import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { runSeed } from "@/lib/seed";

// One-time seed API - call once after deploy to populate database
// GET /api/seed - runs seed if database is empty
export async function GET() {
  try {
    const configCount = await prisma.siteConfig.count();
    if (configCount > 0) {
      return NextResponse.json({
        message: "Database already has data. Seed skipped.",
      });
    }

    await runSeed();

    return NextResponse.json({
      message: "Database seeded successfully. Refresh the homepage to see data.",
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Seed failed. Run manually: DATABASE_URL=xxx npm run db:seed" },
      { status: 500 }
    );
  }
}
