import { ISelectedVariant } from "../components/ProductForm/ProductForm";
import { Nullable } from "../types";
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

/**
 * Fetches a product by its handle.
 * @param {string} handle - The handle of the product.
 *  @returns {Promise<Nullable<IProductDetailed>>} The product object.
 * */
export const getProductByHandle = async (
  handle: string
): Promise<Nullable<IProductDetailed>> => {
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

/**
 * Creates a cart in Shopify.
 *
 * @param {string} id - The ID of the merchandise variant example variant.id = gid://shopify/ProductVariant/41664589365326.
 * @param {number} quantity - The quantity of the merchandise to add to the cart.
 * @returns {Promise<{ id: string, checkoutUrl: string }>} The checkout object containing the cart ID and checkout URL.
 */
export const createCheckout = async (id: string, quantity: number) => {
  // id = variant.id
  const query = `
    mutation {
      cartCreate(input: { lines: [{merchandiseId: "${id}", quantity: ${quantity}}] }) {
        cart {
          id,
          checkoutUrl,
          lines(first: 250) {
            edges {
              node {
                id
              }
            }
          }
        }  
      }
    }
  `;

  const response = await shopifyData(query);
  const cart = response.data.cartCreate.cart
    ? response.data.cartCreate.cart
    : null;

  return cart;
};

/**
 * Creates a checkout line in Shopify.
 *
 * @param {string} id - The ID of the cart.
 * @param {ISelectedVariant} lineItem - The merchandise variant to add to the cart.
 * @returns {Promise<Nullable<{ id: string, checkoutUrl: string }>} The checkout object containing the cart ID and checkout URL.
 */
export const createCheckoutLine = async (
  id: string,
  lineItem: ISelectedVariant
) => {
  const line = `{quantity: ${lineItem.variantQuantity}, merchandiseId: "${lineItem.id}"}`;
  const query = `
      mutation {
        cartLinesAdd(cartId: "${id}", lines: [${line}]) {
          cart {
            id,
            checkoutUrl,
            lines(first: 250) {
            edges {
              node {
                id
              }
            }
          }
          }
        } 
      }
    `;
  const response = await shopifyData(query);
  const checkout = response.data.cartLinesAdd.cart
    ? response.data.cartLinesAdd.cart
    : null;
  
  return checkout;
};

/**
 * Updates a checkout line in Shopify.
 *
 * @param {string} id - The ID of the cart.
 * @param {ISelectedVariant[]} lineItems - The merchandise variants to update in the cart. // TODO: it should contain line ID
 * @returns {Promise<Nullable<{ id: string, checkoutUrl: string }>} The checkout object containing the cart ID and checkout URL.
 */
export const updateCheckoutLine = async (
  id: string,
  lineItems: ISelectedVariant[]
) => {
  const lines = lineItems.map(
    (item) => `{quantity: ${item.variantQuantity}, merchandiseId: "${item.id}"}`
  );

  const query = `
    mutation {
      cartLinesUpdate(cartId: "${id}", lines: [${lines}]) {
        cart {
          id,
          checkoutUrl,
        }    
      }
    }
  `;

  const response = await shopifyData(query);
  const checkout = response.data.cartLinesUpdate.cart
    ? response.data.cartLinesUpdate.cart
    : null;

  return checkout;
};
