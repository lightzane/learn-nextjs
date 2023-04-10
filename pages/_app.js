import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // Reference: https://next-auth.js.org/getting-started/client#sessionprovider
  // SessionProvider is required by next-auth@4
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
  // - see also auth-form.js
  // - see also main-navigation.js
}

export default MyApp;
