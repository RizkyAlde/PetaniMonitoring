/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "assets.vercel.com",
            },
            {
                protocol: "https",
                hostname: "fonts.googleapis.com",
            },
            {
                protocol: "https",
                hostname: "fonts.gstatic.com",
            }
        ]
    },
    // output:"export",
};

module.exports = nextConfig;
