import { QueryClient, QueryClientConfig, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import { MotionConfig } from 'framer-motion';
import type { AppProps } from 'next/app';
import { NextSeo } from 'next-seo';

import { supabase } from '@/lib/supabase';

import '../styles/globals.scss';

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
    axios.post('/api/auth/', {
      event,
      session,
    });
  });

  return (
    <Layout>
      <NextSeo titleTemplate='%s | Fake Instagram' defaultTitle='Fake Instagram' />
      <QueryClientProvider client={queryClient}>
        <MotionConfig reducedMotion='user'>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </MotionConfig>
      </QueryClientProvider>
    </Layout>
  );
}

export default MyApp;
