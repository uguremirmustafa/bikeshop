import { ShopContext } from 'context/shopContext';
import React, { useContext } from 'react';

export default function CartItem({ item }) {
  const { dispatch } = useContext(ShopContext);
  const handleCart = () => {
    dispatch({ type: 'REMOVE_ITEM_FROM_CART', payload: { id: item.id } });
  };
  return (
    <div className="cartItem">
      <div>
        <h3>{item.title}</h3>
        <img src={item.image} className="cartItemImage" />
        <span>{item.price}</span>
      </div>
      <div className="trashIcon" onClick={handleCart}>
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" />
        </svg>
      </div>
    </div>
  );
}
