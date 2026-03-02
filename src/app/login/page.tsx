import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SignIn } from "@clerk/nextjs";
import { getSiteConfig } from "@/lib/site";
import LoginMessages from "./LoginMessages";

export const metadata = {
  title: "Admin Sign In | A1-Satta",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const config = await getSiteConfig();
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <h2 className="text-xl font-bold text-center text-white mb-2">
            Admin Access Only
          </h2>
          <p className="text-slate-400 text-center text-sm mb-6">
            Only authorized administrators can sign in.
          </p>
          <LoginMessages error={error} />
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
        </div>
      </main>
      <Footer
        disclaimer={config.disclaimer}
        copyright={config.footer_copyright}
      />
    </div>
  );
}
