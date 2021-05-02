import React, { useContext, useEffect } from 'react';
import { ShopContext } from 'context/shopContext';
import CartItem from './CartItem';

export default function Cart() {
  const {
    state: { isCartOpen },
    dispatch,
  } = useContext(ShopContext);
  const toggleCart = () => {
    if (!isCartOpen) {
      dispatch({ type: 'OPEN_CART' });
    } else {
      dispatch({ type: 'CLOSE_CART' });
    }
  };

  // const lineItems = cart?.map((item) => ({ variantId: item.id, quantity: item.quantity }));

  return (
    <div className={`cart ${isCartOpen ? 'cartOpen' : 'cartClose'}`}>
      <div className="titleBar">
        <div className="closeButton" onClick={toggleCart}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
          </svg>
        </div>
        <h3>Your Cart</h3>
      </div>
      <div className="checkout">
        <button className="btn">checkout</button>
      </div>
    </div>
  );
}
