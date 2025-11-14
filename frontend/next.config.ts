import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles Next.js natively - no 'standalone' needed

  env: {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;