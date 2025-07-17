import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mwn8o6adkivy7lh4.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
