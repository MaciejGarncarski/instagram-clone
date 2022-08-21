import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';
import { QueryClient, QueryClientConfig, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MotionConfig } from 'framer-motion';
import type { AppProps } from 'next/app';
import { NextSeo } from 'next-seo';

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

  return (
    <Layout>
      <NextSeo titleTemplate='%s | GRAM-GRAM' defaultTitle='GRAM-GRAM' />

      <UserProvider supabaseClient={supabaseClient}>
        <QueryClientProvider client={queryClient}>
          <MotionConfig reducedMotion='user'>
            <div className='app-container'>
              <Component {...pageProps} />
              <ReactQueryDevtools />
            </div>
          </MotionConfig>
        </QueryClientProvider>
      </UserProvider>
    </Layout>
  );
}

export default MyApp;
