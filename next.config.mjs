/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['**.manuspre.computer'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
