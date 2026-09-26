import type { NextConfig } from "next";

// "export" builds a plain static website into the `out/` folder.
// No server is needed, nothing is stored, and it can be hosted anywhere
// (Vercel, Netlify, Cloudflare Pages, an NHS web server...).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
