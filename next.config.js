/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { // NOTE: images domains 설정이 최상위에 있어야 합니다.
    domains: [
      "add.bucket.s3.amazonaws.com",
      "dummyimage.com", // 목데이터의 이미지 URL 도메인, 추후 삭제
      "robohash.org" // 목데이터의 이미지 URL 도메인, 추후 삭제
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    emotion: true
  },
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  reactStrictMode: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
