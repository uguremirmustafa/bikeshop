import CartItem from '@components/CartItem';
import { useCart } from 'react-use-cart';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Cart() {
  const { items, emptyCart, cartTotal, totalItems } = useCart();
  const PayBtn = () => {
    const handleCheckout = async (e) => {
      e.preventDefault();
      //we resolve stripe in the handle function in order to prevent unnecessary load
      const stripe = await stripePromise;

      const session = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart: items,
        }),
      }).then((res) => res.json());

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
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
        <PayBtn />
      </div>
    </div>
  );
}
