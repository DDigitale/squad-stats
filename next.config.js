/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        pathname: '',
        hostname: 'avatars.steamstatic.com'
      }
    ]
  }
}

module.exports = nextConfig
