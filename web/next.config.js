/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'images.unsplash.com', 'plus.unsplash.com', 'ik.imagekit.io'],
  },
  env: {
    baseUrl: 'https://sistemadesafio.jao.life/api/v1'
  }
}

module.exports = nextConfig
