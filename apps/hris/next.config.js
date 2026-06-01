const path = require("path");
const { headers } = require("../../next-security-headers.cjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  outputFileTracingRoot: path.join(__dirname, "../../"),
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@repo/ui", "@repo/config", "@repo/api"],
  headers,
};

module.exports = nextConfig;
