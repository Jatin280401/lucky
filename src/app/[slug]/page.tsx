import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteConfig } from "@/lib/site";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  try {
    const games = await prisma.sattaGame.findMany({ select: { slug: true } });
    return games.map((g) => ({ slug: g.slug }));
  } catch {
    return [];
  }
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = await prisma.sattaGame.findUnique({ where: { slug } });
  if (!game) notFound();

  const results = await prisma.dailyResult.findMany({
    where: { gameSlug: slug },
    orderBy: { date: "desc" },
    take: 30,
  });

  const config = await getSiteConfig();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-400 capitalize mb-2">
          {game.name} satta king chart 2026
        </h1>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse bg-slate-800 rounded-lg">
            <thead>
              <tr className="bg-slate-700">
                <th className="px-4 py-3 text-left text-slate-300">Date</th>
                <th className="px-4 py-3 text-left text-slate-300">Result</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id} className="border-b border-slate-700">
                  <td className="px-4 py-3">{r.date}</td>
                  <td className="px-4 py-3 font-bold text-green-400">
                    {r.result ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link href="/chart" className="text-green-400 hover:text-green-300">
          ← Back to Chart
        </Link>
      </main>
      <Footer
        disclaimer={config.disclaimer}
        copyright={config.footer_copyright}
      />
    </div>
  );
}
