import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kqxoankulanflcgaoxzx.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com", // Added for dynamic tool photos
      },
    ],
  },
};

export default nextConfig;
