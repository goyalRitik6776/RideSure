/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io','ik.imagekit.io',"www.transparentpng.com"],
  },
}

module.exports = nextConfig
