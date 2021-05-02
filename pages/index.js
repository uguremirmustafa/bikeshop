import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import client from '@lib/client';
import { GetAllProducts } from '@lib/queries';

export default function Home({ products }) {
  console.log(products);
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
        <div>
          <Link href="/api/auth/login">login</Link>
        </div>
      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>;
}

export async function getStaticProps() {
  const products = await client.request(GetAllProducts);
  return {
    props: {
      products,
    },
  };
}
