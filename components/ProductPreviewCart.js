import { ShopContext } from 'context/shopContext';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { urlForImage } from '@lib/sanity';

export default function ProductPreviewCard({ product }) {
  const img = urlForImage(product.images[0].image);
  const { dispatch } = useContext(ShopContext);
  return (
    <div className="productPreviewCard">
      <Link href={`/product/${product.slug.current}`}>
        <a>
          <h2 className="cardTitle">{product.name}</h2>
        </a>
      </Link>
      <Image
        src={img}
        className="productImage"
        width={400}
        height={300}
        objectFit="contain"
        alt={product.images[0].alt}
      />
      <div className="flex">
        <button className="btn" onClick={() => dispatch({ type: 'OPEN_CART' })}>
          &hearts;
        </button>
        <span className="priceTag">{product.price}</span>
        <button className="btn" onClick={() => setShouldFetch(true)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
