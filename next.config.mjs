/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_STOREFRONT_DOMAIN: process.env.SHOPIFY_STOREFRONT_DOMAIN,
  },
  images: {
    domains: ['cdn.shopify.com']
  }
};

export default nextConfig;
