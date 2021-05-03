import client from '@lib/client';
import { GetProductSlugs, GetSingleProduct } from '@lib/queries/products';
import { urlForImage } from '@lib/sanity';
import React from 'react';
import Image from 'next/image';
export default function SingleProduct({ product }) {
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
        <button className="btn">Add to Cart</button>
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
