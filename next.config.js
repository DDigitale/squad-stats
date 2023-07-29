/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        pathname: '/ISteamUser/GetPlayerSummaries/',
        hostname: 'avatars.steamstatic.com'
      }
    ]
  }
}

module.exports = nextConfig
