import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SafePathQR | Manchester mental-health support",
  description: "Find free mental-health crisis support, helplines and nearby A&E in Manchester.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hmap.org.uk"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="shell header-inner">
            <Link className="brand" href="/" aria-label="SafePathQR home"><img className="brand-logo" src="/safepathqr-icon.png" alt="" width="40" height="40" /><span className="brand-name">SafePath<span>QR</span></span></Link>
            <nav aria-label="Main navigation"><a href="/#check">Check now</a><a href="/#helplines">Helplines</a><Link href="/privacy/">Privacy</Link></nav>
          </div>
        </header>
        {children}
        <footer className="site-footer"><div className="shell footer-inner"><p><strong>SafePathQR</strong> · Free, private signposting.</p><p><Link href="/privacy/">Privacy and about</Link> · Information checked {"2026-09-26"}</p></div></footer>
      </body>
    </html>
  );
}
