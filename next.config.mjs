import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: "auto" },
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  agentRules: false,
  reactStrictMode: true,
  reactCompiler: true,
  images: {
    loader: "custom",
    loaderFile: "./src/utils/cloudinaryLoader.js",
  },
};

export default withVanillaExtract(nextConfig);
