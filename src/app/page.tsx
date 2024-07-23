import { getProductsInCollection } from '../../lib/shopify';
import ProductList from '../../components/ProductList';

export default async function Home() {
  const products = await getProductsInCollection();

  return (
    <section>
      <ProductList products={products} />
    </section>
  );
}
