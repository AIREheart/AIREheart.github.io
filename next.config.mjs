/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Update this with your GitHub repo name
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
}