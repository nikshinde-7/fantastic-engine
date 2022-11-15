import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import type { AppProps } from 'next/app';
import { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';


import { AuthProvider } from '../context/state';
import Layout from '../components/layout';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
