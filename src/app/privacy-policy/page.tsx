import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteConfig } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy | A1-Satta",
};

export default async function PrivacyPolicyPage() {
  const config = await getSiteConfig();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-green-400 mb-6">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-slate-400">
          <p>
            This is a sample privacy policy. A1-Satta respects your privacy. We
            do not sell or share your personal information with third parties.
          </p>
        </div>
      </main>
      <Footer
        disclaimer={config.disclaimer}
        copyright={config.footer_copyright}
      />
    </div>
  );
}
