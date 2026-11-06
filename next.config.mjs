import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: "auto" },
});

const apiProxyTarget = process.env.API_PROXY_TARGET;

/** @type {import("next").NextConfig} */
const nextConfig = {
  agentRules: false,
  reactStrictMode: true,
  reactCompiler: true,
  images: {
    loader: "custom",
    loaderFile: "./src/utils/cloudinaryLoader.js",
  },

  async rewrites() {
    if (!apiProxyTarget) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${apiProxyTarget}/api/:path*`,
      },
    ];
  },
};

export default withVanillaExtract(nextConfig);
