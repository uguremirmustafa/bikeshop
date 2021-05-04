import CartItem from '@components/CartItem';
import { useCart } from 'react-use-cart';

export default function Cart() {
  const { items, emptyCart, cartTotal, totalItems } = useCart();
  console.log(totalItems);
  return (
    <div className="cart">
      <div className="items">
        <div className="itemsHeader">
          <h2>Cart</h2>
          <button className="btn" onClick={() => emptyCart()}>
            Remove All Items
          </button>
        </div>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="checkout">
        <div>Cart Total: {cartTotal}$</div>
        <button className="btn">checkout</button>
      </div>
    </div>
  );
}
