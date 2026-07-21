import type { NextConfig } from "next";

const backendUrl = process.env.API_URL || "http://localhost:4000";
const imageHost = process.env.API_HOSTNAME || "localhost";
const imagePort = process.env.API_PORT || (process.env.NODE_ENV === "production" ? "" : "4000");
const imageProtocol = process.env.NODE_ENV === "production" ? "https" : "http";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: imageProtocol as "http" | "https",
        hostname: imageHost,
        port: imagePort,
        pathname: "/uploads/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: "/uploads/:path*",
        destination: `${backendUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
