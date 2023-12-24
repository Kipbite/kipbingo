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
      {
        protocol: 'https',
        hostname: 'placekitten.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
