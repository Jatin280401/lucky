import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteConfig } from "@/lib/site";
import ChartPageContent from "./ChartPageContent";

export const metadata = {
  title: "SATTA KING CHART 2026 | A1-Satta",
  description:
    "A1-satta provides all kind of satta king results everyday. View satta king charts for delhi bazar, gali, faridabad, ghaziabad and more.",
};

export default async function ChartPage() {
  const config = await getSiteConfig();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-400 text-center mb-2">
          A1-SATTA
        </h1>
        <h2 className="text-xl text-slate-400 text-center mb-8">
          A1-satta provides all kind of satta king results everyday.
        </h2>
        <h3 className="text-2xl font-bold text-green-400 mb-6">
          SATTA KING CHART 2026
        </h3>
        <ChartPageContent />
      </main>
      <Footer
        disclaimer={config.disclaimer}
        copyright={config.footer_copyright}
      />
    </div>
  );
}
