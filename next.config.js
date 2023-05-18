/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [['next-superjson-plugin', {}]]
  },
  images: {
    domains: ['res.cloudinary.com']
  }
};

module.exports = nextConfig;
