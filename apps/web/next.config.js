/* global module */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
  transpilePackages: ["@repo/ui", "@repo/config"],
};

module.exports = nextConfig;
