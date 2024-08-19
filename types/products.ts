import { IEdges, INode } from ".";

export type IProducts = IEdges<IProduct>;

export interface IProduct {
  id: string;
  title: string;
  handle: string;
  images: IEdges<IImage>;
  priceRange: {
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface IImage {
  url: string;
  altText: string;
}

export interface IProductSlug {
  node: {
    handle: string;
    id: string;
  };
}

export interface IOption {
  name: string;
  optionValues: IOptionValue[];
}

export interface IOptionValue {
  id: string;
  name: string;
}

export interface IVariant {
  selectedOptions: ISelectedOption[];
  image: IImage;
  title: string;
  id: string;
  price: {
    amount: string;
  };
}

export interface ISelectedOption {
  name: string;
  value: string;
}

export interface IProductDetailed {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: IEdges<IImage>;
  options: IOption[];
  variants: IEdges<IVariant>;
  collections: IEdges<ICollectionProducts>;
}

export interface ICollectionProducts {
  products: IEdges<IProduct>;
};
