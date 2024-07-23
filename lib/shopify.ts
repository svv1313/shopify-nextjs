import { Nullable } from '../types';
import { IProductDetailed, IProducts, IProductSlug } from "../types/products";

const domain = process.env.SHOPIFY_STOREFRONT_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION;

export const shopifyData = async (query: string) => {
  const URL = `https://${domain}/api/${apiVersion}/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  } as RequestInit;

  try {
    const dataJson = await fetch(URL, options);
    const data = dataJson.json();

    return data;
  } catch (err: any) {
    throw new Error(`Error fetching data from Shopify: ${err.message}`);
  }
};

export const getProductsInCollection = async (): Promise<IProducts> => {
  const query = `{
  collection(handle: "frontpage") {
    title
    products(first: 25) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
}`;

  const response = await shopifyData(query);
  const allProducts = response.data.collection.products.edges
    ? response.data.collection.products
    : { edges: [] };
  return allProducts;
};

export const getAllProducts = async (): Promise<IProductSlug[]> => {
  const query = `
    {
      products(first: 25) {
        edges {
          node {
            handle
            id
          }
        }
      }
    }
  `;

  const response = await shopifyData(query);
  const allProducts = response.data.products.edges
    ? response.data.products.edges
    : [];

  return allProducts;
};

export const getProductByHandle = async (handle: string): Promise<Nullable<IProductDetailed>> => {
  const query = `
    {
    product(handle: "${handle}") {
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      options {
        name
        optionValues {
          id
          name
        }
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
            title
            id
            price {
              amount
            }
          }
        }
      }
    }
  }
  `;

  const response = await shopifyData(query);
  const product = response.data.product ? response.data.product : null;

  return product;
};
