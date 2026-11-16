/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**" }
    ]
  },
  async redirects() {
    return [
      { source: "/posts", destination: "/writing", permanent: true },
      { source: "/tags", destination: "/writing", permanent: true },
      { source: "/tags/:tag", destination: "/writing?tag=:tag", permanent: true }
    ];
  }
};

export default nextConfig;
