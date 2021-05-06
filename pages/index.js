import client from '@lib/client';
import { getAccessToken, getSession } from '@auth0/nextjs-auth0';
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

export async function getStaticProps(req, res) {
  const products = await client.request(GetAllProducts);
  return {
    props: {
      products: products.allProduct,
    },
  };
}
