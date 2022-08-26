import { QueryClient, QueryClientConfig, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MotionConfig } from 'framer-motion';
import type { AppProps } from 'next/app';
import { NextSeo } from 'next-seo';

import '../styles/globals.scss';

import { supabase } from '@/lib/supabase';

import { Layout } from '@/components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const queryOptions: QueryClientConfig = {
    defaultOptions: {
      queries: {
        retry: 2,
        refetchOnWindowFocus: false,
      },
    },
  };
  const queryClient = new QueryClient(queryOptions);

  supabase.auth.onAuthStateChange((event, session) => {
    fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });
  });

  return (
    <Layout>
      <NextSeo titleTemplate='%s | GRAM-GRAM' defaultTitle='GRAM-GRAM' />
      <QueryClientProvider client={queryClient}>
        <MotionConfig reducedMotion='user'>
          <div className='app-container'>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </div>
        </MotionConfig>
      </QueryClientProvider>
    </Layout>
  );
}

export default MyApp;
