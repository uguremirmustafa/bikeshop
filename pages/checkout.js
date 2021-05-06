import React from 'react';
import { getAccessToken, getSession, useUser } from '@auth0/nextjs-auth0';
import { hasuraUserClient } from '@lib/user-client';
import { gql } from '@lib/client';
import useSWR from 'swr';
import { useCart } from 'react-use-cart';

const GetUserCart = gql`
  query GetUserCart($userId: String!) {
    users_by_pk(id: $userId) {
      carts {
        id
      }
    }
  }
`;

const CreateCart = gql`
  mutation CreateCart {
    insert_carts_one(object: {}) {
      id
    }
  }
`;
const InsertCartItems = gql`
  mutation InsertCartItems($objects: [cartItems_insert_input!]!) {
    insert_cartItems(objects: $objects) {
      affected_rows
      returning {
        cart_id
      }
    }
  }
`;
export default function checkout({ token, cart }) {
  const { items } = useCart();
  // console.log();
  const client = hasuraUserClient(token);

  // const { user } = useUser();
  // const userId = user?.sub;

  // const { data } = useSWR(GetUserCart, (query) => client.request(query, { userId }), {
  //   revalidateOnMount: true,
  //   initialData: userCart,
  // });
  if (!cart) return <div>loading</div>;
  return (
    <div>
      <div>{token}</div>
      {cart && <pre>{JSON.stringify(cart, null, 2)}</pre>}
      {items && <pre>{JSON.stringify(items, null, 2)}</pre>}
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const { accessToken } = await getAccessToken(req, res);
  const session = await getSession(req, res);
  const userId = await session.user?.sub;

  const client = hasuraUserClient(accessToken);

  const {
    users_by_pk: { carts },
  } = await client.request(GetUserCart, { userId });

  // const insertedItems = await client.request(InsertCartItems,{})
  if (!carts.length > 0) {
    const { insert_carts_one } = await client.request(CreateCart);
    return {
      props: {
        token: accessToken,
        cart: insert_carts_one,
      },
    };
  }

  return {
    props: {
      token: accessToken,
      cart: carts[0],
    },
  };
}
