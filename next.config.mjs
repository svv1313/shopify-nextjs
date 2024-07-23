/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SHOPIFY_STOREFRONT_ACCESS_TOKEN:
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_STOREFRONT_DOMAIN: process.env.SHOPIFY_STOREFRONT_DOMAIN,
    SHOPIFY_STOREFRONT_API_VERSION: process.env.SHOPIFY_STOREFRONT_API_VERSION,
  },
  images: {
    domains: ["cdn.shopify.com"],
  },
};

export default nextConfig;
