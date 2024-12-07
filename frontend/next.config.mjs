/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://inukaki.github.io/MachikenNumber/api/:path*',
            },
        ];
    },
};

export default nextConfig;
