import { IProductDetailed } from "../../types/products";
import ProductForm from "../ProductForm";
import ProductSlider from '../ProductSlider';

interface IProps {
  product: IProductDetailed;
}

export const ProductPageContent = ({ product }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg-space-x-8 max-w-6xl w-11/12 mx-auto">
      <div className="w-full max-w-md border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2">
        <ProductSlider product={product} />
      </div>
      <ProductForm product={product} />
    </div>
  );
};
