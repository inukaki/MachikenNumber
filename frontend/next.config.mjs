// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'https://inukaki.github.io/MachikenNumber/api/:path*',
//       },
//     ];
//   },
//     images: {
//       domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
//     },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
};

export default nextConfig;
