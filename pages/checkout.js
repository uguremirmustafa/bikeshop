import Stripe from 'stripe';
import { parseCookies, setCookie } from 'nookies';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@components/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = ({ paymentIntent }) => {
  if (!paymentIntent)
    return <div>Sorry, something went wrong! Don\'t worry you are not charged anything!</div>;
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm paymentIntent={paymentIntent} />
    </Elements>
  );
};

export default CheckoutPage;

export const getServerSideProps = async (ctx) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let paymentIntent;

  const { paymentIntentId } = await parseCookies(ctx);

  if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return {
      props: {
        paymentIntent,
      },
    };
  }

  paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'usd',
  });

  setCookie(ctx, 'paymentIntentId', paymentIntent.id);

  return {
    props: {
      paymentIntent,
    },
  };
};
