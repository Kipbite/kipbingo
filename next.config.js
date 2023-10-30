/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kipbite-assets.fra1.digitaloceanspaces.com',
        port: '',
        pathname: '/kipbingo/**',
      },
    ],
  },
}

module.exports = nextConfig
