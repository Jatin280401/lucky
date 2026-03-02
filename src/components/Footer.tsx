import Link from "next/link";

interface FooterProps {
  disclaimer?: string;
  copyright?: string;
}

export default function Footer({ disclaimer, copyright }: FooterProps) {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-4">
          <Link
            href="/privacy-policy"
            className="text-green-400 hover:text-green-300 text-sm"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="text-green-400 hover:text-green-300 text-sm"
          >
            Terms & Conditions
          </Link>
        </div>
        <p className="text-center text-slate-400 text-sm mb-4">
          {copyright || "©️ 2026 A1-Satta All Rights Reserved"}
        </p>
        <p className="text-center text-slate-500 text-xs max-w-3xl mx-auto">
          {disclaimer ||
            "!! DISCLAIMER - A1-Satta is a non-commercial informational website. Please view this site at your own risk, All The Information Shown On Website Is Sponsored And We Warn You That satta matka Gambling/Satta May Be Banned Or Illegal In Your Country. We Are Not Responsible For Any Issues Or Scam..., We Respect All Country Rules/Laws... If You Not Agree With Our Site disclaimer Please Quit Our Site Right Now. Thank You."}
        </p>
      </div>
    </footer>
  );
}
