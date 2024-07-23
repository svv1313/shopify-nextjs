import Image from "next/image";
import { IEdges } from "../../types";
import { IImage } from "../../types/products";
import Link from "next/link";
import { getFormatter } from '../../utils/numberHelper';

interface IProps {
  handle: string;
  title: string;
  images: IEdges<IImage>;
  priceRange: { maxVariantPrice: { amount: string; currencyCode: string;} };
}

export const ProductCard = ({ handle, title, images, priceRange }: IProps) => {

  return (
    <Link href={`/product/${handle}`}>
      <div className="group">
        <div className="w-full bg-gray-200 rounded-3xl overflow-hidden">
          <div className="relative group-hover:opacity-75 h-72">
            <Image
              src={images.edges[0].node.url}
              alt={images.edges[0].node.altText}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-700">
          {getFormatter(priceRange.maxVariantPrice.currencyCode).format(
            Number(priceRange.maxVariantPrice.amount)
          )}
        </p>
      </div>
    </Link>
  );
};
