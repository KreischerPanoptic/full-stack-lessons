/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/users',
        permanent: true,
      },
    ]
  },
  experimental: {
    outputStandalone: true,
  },
}

process.env.NEXTAUTH_URL = 'https://auth.stopbattle.org'
process.env.BACKEND_URL = 'http://localhost:8100';
module.exports = nextConfig
