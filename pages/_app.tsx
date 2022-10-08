import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { namedComponent } from '@/lib/namedComponent';

import '../styles/globals.scss';

import { Layout } from '@/components/layout/Layout';

const UserProvider = dynamic(() =>
  namedComponent(import('@supabase/auth-helpers-react'), 'UserProvider')
);
const NextProgress = dynamic(() => import('next-progress'));
const MotionConfig = dynamic(() => namedComponent(import('framer-motion'), 'MotionConfig'));

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
  const queryOptions: QueryClientConfig = {
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  };
  const [queryClient] = useState(() => new QueryClient(queryOptions));

  return (
    <UserProvider supabaseClient={supabaseClient}>
      <QueryClientProvider client={queryClient}>
        <MotionConfig reducedMotion='user'>
          <NextProgress options={{ showSpinner: false }} height={4} color='#009999' />
          <Hydrate state={pageProps.dehydratedState}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Hydrate>
        </MotionConfig>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;
