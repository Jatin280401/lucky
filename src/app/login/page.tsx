import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SignIn } from "@clerk/nextjs";
import { getSiteConfig } from "@/lib/site";

export const metadata = {
  title: "Sign In | A1-Satta",
};

export default async function LoginPage() {
  const config = await getSiteConfig();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <SignIn
          forceRedirectUrl="/admin"
          appearance={{
            elements: {
              rootBox: "mx-auto",
            },
            variables: {
              colorPrimary: "#22c55e",
              colorBackground: "#1e293b",
              colorInputBackground: "#0f172a",
              colorInputText: "#f8fafc",
            },
          }}
        />
      </main>
      <Footer
        disclaimer={config.disclaimer}
        copyright={config.footer_copyright}
      />
    </div>
  );
}
