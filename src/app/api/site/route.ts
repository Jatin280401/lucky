import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const configs = await prisma.siteConfig.findMany();
    const configMap: Record<string, string> = {};
    configs.forEach((c) => {
      configMap[c.key] = c.value;
    });
    return NextResponse.json(configMap);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch config" }, { status: 500 });
  }
}
