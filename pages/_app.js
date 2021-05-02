import { UserProvider } from '@auth0/nextjs-auth0';
import Layout from '@components/Layout';
import ShopProvider from '@context/shopContext';
import '../styles/main.scss';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ShopProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ShopProvider>
    </UserProvider>
  );
}

export default MyApp;
