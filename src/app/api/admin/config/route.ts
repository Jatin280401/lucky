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
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === "string") {
        await prisma.siteConfig.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
