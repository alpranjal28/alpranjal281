/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    // loader: "custom",
    // loaderFile: "./loader.js",
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
