/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['images.pexels.com']
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;