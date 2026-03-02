import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteConfig } from "@/lib/site";

export const metadata = {
  title: "Contact | A1-Satta",
  description: "Contact A1-Satta for any enquiries.",
};

export default async function ContactPage() {
  const config = await getSiteConfig();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-green-400 text-center mb-2">
          A1-SATTA
        </h1>
        <h2 className="text-xl text-slate-400 text-center mb-12">
          For any enquiry message us at{" "}
          <a
            href={`mailto:${config.contact_email || "email@example.com"}`}
            className="text-green-400 hover:text-green-300"
          >
            {config.contact_email || "email@example.com"}
          </a>
        </h2>
      </main>
      <Footer
        disclaimer={config.disclaimer}
        copyright={config.footer_copyright}
      />
    </div>
  );
}
