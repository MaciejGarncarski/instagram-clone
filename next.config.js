/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    allowFutureImage: true,
    domains: [`${process.env.NEXT_PUBLIC_SUPABASE_URL_START}.supabase.co`],
  },
};

module.exports = withPlugins([
  [withBundleAnalyzer],
  [
    withPWA,
    {
      pwa: {
        dest: 'public',
        runtimeCaching,
        disable: process.env.NODE_ENV === 'development',
      },
    },
  ],
  nextConfig,
]);
