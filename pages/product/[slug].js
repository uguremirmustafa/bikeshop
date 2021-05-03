import client from '@lib/client';
import { GetProductSlugs, GetSingleProduct } from '@lib/queries/products';
import { urlForImage } from '@lib/sanity';
import React from 'react';
import Image from 'next/image';
import { useCart } from 'react-use-cart';
import Link from 'next/link';
export default function SingleProduct({ product }) {
  const { addItem, inCart } = useCart();
  const img = urlForImage(product.images[0].image);
  return (
    <div className="productPage">
      <Image
        src={img}
        className="productImage"
        width={400}
        height={300}
        objectFit="contain"
        alt={product.images[0].alt}
      />
      <div className="info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>price : {product.price} $</p>
        <p>frame size : {product.bikeSize?.size}</p>
        {!inCart(product._id) ? (
          <button
            className="btn"
            onClick={() =>
              addItem(
                {
                  id: product._id,
                  price: product.price,
                  name: product.name,
                  image: img,
                  slug: product.slug.current,
                },
                1
              )
            }
          >
            Add to Cart
          </button>
        ) : (
          <Link href={`/cart`}>
            <button className="btn">Already in the cart, go to cart</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { allProduct } = await client.request(GetSingleProduct, {
    slug: params.slug,
  });
  return {
    props: {
      product: allProduct[0],
    },
  };
}

export async function getStaticPaths() {
  const { allProduct: paths } = await client.request(GetProductSlugs);
  return {
    paths: paths.map((item) => ({ params: { slug: item.slug.current } })),
    fallback: true,
  };
}
