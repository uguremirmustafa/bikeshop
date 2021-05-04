import client from '@lib/client';
import { GetProductSlugs, GetSingleProduct } from '@lib/queries/products';
import { urlForImage } from '@lib/sanity';
import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from 'react-use-cart';
import Link from 'next/link';
export default function SingleProduct({ product }) {
  const { addItem, inCart } = useCart();
  const img = urlForImage(product.images[0].image);
  const [qty, setQty] = useState(1);
  const [selectValue, setSelectValue] = useState('');
  const productVariants = product.bikeSize;
  const [selectedVariant, setSelectedVariant] = useState(productVariants[0]._id);

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
    setSelectedVariant(e.target[e.target.selectedIndex].id);
  };
  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const currentItem = productVariants.filter((item) => item._id == selectedVariant)[0];

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
        <label htmlFor="size">Select product size:</label>
        <select name="size" id="size" onChange={handleSelect} value={selectValue}>
          {product.bikeSize.map((item) => (
            <option key={item._id} value={item.size} id={item._id}>
              {item.size}
            </option>
          ))}
        </select>
        <div>
          <div>price: {currentItem.price}$</div>
          <div>frame size: {currentItem.size}</div>
        </div>
        <label htmlFor="qty">Quantity:</label>
        <select name="qt" id="qty" value={qty} onChange={handleQty}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {!inCart(currentItem._id) ? (
          <button
            className="btn"
            onClick={() =>
              addItem(
                {
                  id: currentItem._id,
                  price: currentItem.price,
                  name: product.name,
                  image: img,
                  slug: product.slug.current,
                  variant: currentItem.size,
                },
                parseInt(qty)
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
