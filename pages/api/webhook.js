import { sanityMutationClient } from '@lib/sanity.server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const event = req.body;
  //   console.log({ event });
  const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
    expand: ['line_items.data.price.product', 'customer'],
  });
  const line_items = session.line_items.data;
  const customer = session.customer;
  //   console.log({ line_items });
  try {
    await sanityMutationClient.create({
      _type: 'order',
      email: customer.email,
      total: session.amount_total,
    });
    res.send({ message: 'success' });
  } catch (error) {
    res.send({ message: 'error' });
  }
};
