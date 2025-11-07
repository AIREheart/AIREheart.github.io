
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Leave basePath empty for user/org pages (aireheart.github.io)
  basePath: '',
  // For user/org pages, leave assetPrefix empty
  assetPrefix: '',
}

module.exports = nextConfig
