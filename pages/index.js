import client from '@lib/client';
import { GetAllProducts } from '@lib/queries';
import ProductPreviewCard from '@components/ProductPreviewCart';
export default function Home({ products }) {
  return (
    <div className="home">
      {products.map((item) => (
        <ProductPreviewCard product={item} key={item._id} />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const products = await client.request(GetAllProducts);
  return {
    props: {
      products: products.allProduct,
    },
  };
}
