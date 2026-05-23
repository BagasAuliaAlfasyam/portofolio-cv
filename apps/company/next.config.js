/* global __dirname, module, require */

const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@repo/ui", "@repo/config"],
};

module.exports = nextConfig;
