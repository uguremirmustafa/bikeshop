import client, { gql } from '@lib/client';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { cart, cartTotal } = req.body;
  console.log(cart);
  //fetch the product from hasura
  // const queries = cart.map((item) => {
  //   console.log();
  //   return {};
  // });
  // const GetCartItems = gql`

  // `
  // try {
  //   const session = await stripe.checkout.sessions.create({
  //     success_url: 'http://localhost:3000/?id={CHECKOUT_SESSION_ID}',
  //     cancel_url: `http://localhost:3000/`,
  //     mode: 'payment',
  //     payment_method_types: ['card'],
  //     line_items: [{}],
  //   });
  //   res.status(200).json(session);
  //   return;
  // } catch (error) {
  //   console.log(error);
  //   return;
  // }
};
