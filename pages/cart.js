import CartItem from '@components/CartItem';
import { useCart } from 'react-use-cart';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Cart() {
  const { items, emptyCart, cartTotal, totalItems } = useCart();
  const [message, setMessage] = useState('');
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.');
      emptyCart();
    }
    if (query.get('canceled')) {
      setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
    }
  }, []);
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

      if (result.error) {
        setMessage(result.error.message);
      }
    };
    return (
      <button className="btn" onClick={handleCheckout}>
        checkout
      </button>
    );
  };

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );
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
      {message ? <Message message={message} /> : ''}
    </div>
  );
}
