/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'images.unsplash.com', 'plus.unsplash.com'],
  },
  env: {
    baseUrl: 'http://localhost:3333/api/v1'
  }
}

module.exports = nextConfig
