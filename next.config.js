/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "add.bucket.s3.amazonaws.com",
      "dummyimage.com", // 목데이터의 이미지 URL 도메인, 추후 삭제
      "robohash.org" // 목데이터의 이미지 URL 도메인, 추후 삭제
    ]
  },
  reactStrictMode: true,
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
