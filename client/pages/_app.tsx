import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';

import { AuthProvider } from '../context/state';
import Layout from '../components/layout';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>();
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
    setToken(undefined);
  };
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) setToken(localToken);
  }, []);
  return (
    <AuthProvider>
      <Layout token={token} logout={logout}>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
