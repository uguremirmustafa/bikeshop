import '../styles/main.scss';
import { UserProvider } from '@auth0/nextjs-auth0';
import Layout from '@components/Layout';
import ShopProvider from '@context/shopContext';
import { CartProvider } from 'react-use-cart';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ShopProvider>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </ShopProvider>
    </UserProvider>
  );
}

export default MyApp;
