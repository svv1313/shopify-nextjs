import Image from "next/image";
import { getAllProducts, getProductByHandle } from "../../../../lib/shopify";

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
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div>{product.title}</div>
        <p>{product.description}</p>
        <div className="max-w-48 max-h-32">
          <Image
            src={product.images.edges[0].node.url}
            alt={product.images.edges[0].node.altText}
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const products = await getAllProducts();

  const paths = products.map((item) => {
    return {
      params: { product: item.node.handle },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
