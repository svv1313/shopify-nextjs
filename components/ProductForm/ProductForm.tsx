"use client";
import { useContext, useState } from "react";
import {
  IOptionValue,
  IProductDetailed,
  ISelectedOption,
} from "../../types/products";
import { getFormatter } from '../../utils/numberHelper';
import ProductOption from '../ProductOption';

interface IProps {
  product: IProductDetailed;
}

export const ProductForm = ({ product }: IProps) => {
  const allVariantOptions = product.variants.edges?.map((variant) => {
    const allOptions: { [key: string]: string } = {};
    variant.node.selectedOptions.map((option) => {
      allOptions[option.name] = option.value;
    });

    return {
      id: variant.node.id,
      title: variant.node.title,
      //   handle: variant.node.product.handle,
      image: variant.node.image,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.price.amount,
      variantQuantity: 1,
    };
  });

  const defaultValues: { [key: string]: IOptionValue } = {};
  product.options.forEach((option) => {
    defaultValues[option.name] = option.optionValues[0];
  });

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0]);
  const [selectedOptions, setSelectedOptions] = useState(defaultValues);
  const setOptions = (name: string, value: IOptionValue) => {
    setSelectedOptions((prevState) => ({ ...prevState, [name]: value }));
  };
  // TODO: remove hardcoded currency code
  return (<div className='rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3'>
    <h2 className='text-2xl font-bold'>{product.title}</h2>
    <span className='pb-6'>{getFormatter('UAH').format(Number(product.variants.edges[0].node.price.amount))}</span>
    {product.options.map((option) => {
        return (
          <ProductOption
            key={`${option.name}`}
            name={option.name}
            values={option.optionValues}
            selectedOption={selectedOptions}
            setOptions={setOptions}
          />
        );
    })}
    <button className='bg-black rounded-lg text-white px-2 py-3 hover:bg-gray-800'>Add to card</button>
  </div>);
};
