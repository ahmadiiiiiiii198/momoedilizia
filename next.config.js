/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'msqdvvetjyrnnvaqmqwr.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'pub-88c85804a8d443219883b26bd0952c18.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
}

module.exports = nextConfig
