import { prisma } from "@/lib/db";

export async function getSiteConfig(): Promise<Record<string, string>> {
  try {
    const configs = await prisma.siteConfig.findMany();
    const map: Record<string, string> = {};
    configs.forEach((c) => {
      map[c.key] = c.value;
    });
    return map;
  } catch {
    return {};
  }
}
