/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com', 'res.cloudinary.com']
    },

    // experimental: {
    //     // enable the experimental features
    //     serverComponentsExternalPackages: ['cloudinary', 'graphql-request']
    // }
}

module.exports = nextConfig
