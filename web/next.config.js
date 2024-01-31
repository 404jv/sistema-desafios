/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'images.unsplash.com', 'plus.unsplash.com', 'ik.imagekit.io'],
  },
  env: {
    baseUrl: 'https://animated-umbrella-grqw75xqpjp3p457-3333.app.github.dev/api/v1'
  }
}

module.exports = nextConfig
