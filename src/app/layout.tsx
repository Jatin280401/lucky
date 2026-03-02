import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "A1-SATTA KING | DELHI BAZAR SATTA CHART 2026",
  description:
    "A1-satta is an informational satta matka website which publishes all a1satta games results which includes A1Satta delhi bazar, sadar bazar satta king, a1 satta charts, dwarka satta, gali satta king 2026 and faridabad satta king 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased min-h-screen bg-[#0f172a] text-slate-100">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
