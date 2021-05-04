import CartItem from '@components/CartItem';
import { useCart } from 'react-use-cart';

export default function Cart() {
  const { items, emptyCart, cartTotal, totalItems } = useCart();
  const PayBtn = () => {
    const handleCheckout = async (e) => {
      e.preventDefault();
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart: items,
          cartTotal,
        }),
      }).then((res) => res.json());
      alert(JSON.stringify(response, null, 2));
    };
    return (
      <button className="btn" onClick={handleCheckout}>
        checkout
      </button>
    );
  };
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
        {/* <button className="btn" onClick={handleCheckout}>
          checkout
        </button> */}
        <PayBtn />
      </div>
    </div>
  );
}
