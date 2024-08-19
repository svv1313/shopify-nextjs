import { getProductsInCollection } from '../../lib/shopify';
import ProductList from '../../components/ProductList';
import Hero from '../../components/Hero';

export default async function Home() {
  const products = await getProductsInCollection();

  return (
    <section>
      <Hero />
      <ProductList products={products} />
    </section>
  );
}
