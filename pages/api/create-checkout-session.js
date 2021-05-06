import client, { gql } from '@lib/client';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { cart } = req.body;
  const idList = cart.map((i) => i.id);

  //fetch the product from hasura
  const GetCartItems = gql`
    query GetVariantPrice($variantIds: [ID!]!) {
      allVariantSize(where: { _id: { in: $variantIds } }) {
        _id
        price
        bike {
          name
        }
      }
    }
  `;
  const { allVariantSize } = await client.request(GetCartItems, { variantIds: idList });
  const cartFromServer = cart.map((p) => {
    const currentP = allVariantSize.filter((i) => i._id === p.id)[0];
    return {
      id: p.id,
      quantity: p.quantity,
      name: p.name,
      price: currentP.price,
    };
  });
  const onProd = process.env.NODE_ENV === 'production';
  try {
    const session = await stripe.checkout.sessions.create({
      // success_url: 'http://localhost:3000/?id={CHECKOUT_SESSION_ID}',
      success_url: onProd
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/cart/?success=true`
        : `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/cart/?success=true`,
      cancel_url: onProd
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/cart/?canceled=true`
        : `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/cart/?canceled=true`,
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: cartFromServer.map((item) => ({
        price_data: {
          unit_amount: item.price * 100,
          currency: 'USD',
          product_data: {
            name: item.name,
          },
        },
        quantity: item.quantity,
      })),
      shipping_rates: ['shr_1IneOpGBNca2ekHmNNQhzZPX'],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'TR'],
      },
    });
    res.status(200).json(session);
    return;
  } catch (error) {
    res.status(400).json({ error: { message: error } });
    return;
  }
};
