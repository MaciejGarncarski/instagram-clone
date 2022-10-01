import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MotionConfig } from 'framer-motion';
import type { AppProps } from 'next/app';
import NextProgress from 'next-progress';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

import '../styles/globals.scss';

import { Layout } from '@/components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
  const queryOptions: QueryClientConfig = {
    defaultOptions: {
      queries: {
        retry: 1,
      },
    },
  };
  const [queryClient] = useState(() => new QueryClient(queryOptions));

  return (
    <UserProvider supabaseClient={supabaseClient}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <NextSeo titleTemplate='%s | Delaygram' defaultTitle='Delaygram' />
          <NextProgress options={{ showSpinner: false }} height={4} color='#009999' />
          <MotionConfig reducedMotion='user'>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </MotionConfig>
        </Layout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;
