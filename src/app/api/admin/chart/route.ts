import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

async function checkAdmin() {
  const { userId } = await auth();
  if (!userId) return false;
  const adminIds = (process.env.ADMIN_USER_IDS || "").split(",").map((id) => id.trim());
  return adminIds.length === 0 || adminIds.includes(userId);
}

export async function PUT(req: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    for (const item of body) {
      await prisma.dailyResult.upsert({
        where: {
          date_gameSlug: { date: item.date, gameSlug: item.gameSlug },
        },
        update: { result: item.result ?? "-" },
        create: {
          date: item.date,
          gameSlug: item.gameSlug,
          result: item.result ?? "-",
        },
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
