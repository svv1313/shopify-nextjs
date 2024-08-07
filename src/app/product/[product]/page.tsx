import Image from "next/image";
import { getAllProducts, getProductByHandle } from "../../../../lib/shopify";
import ProductPageContent from '../../../../components/ProductPageContent';

interface IProps {
  params: {
    product: string;
  };
}

export default async function ProductPage({ params }: IProps) {
  const product = await getProductByHandle(params.product);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <ProductPageContent product={product} />
    </div>
  );
}

export async function generateStaticParams() {
  const products = await getAllProducts();

  const paths = products.map((item) => {
    return { product: item.node.handle };
  });

  return paths;
}
