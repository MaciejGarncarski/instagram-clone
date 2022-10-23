import { createBrowserSupabaseClient, Session } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
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
import dynamic from 'next/dynamic';
import { DefaultSeo } from 'next-seo';
import { useState } from 'react';

import { namedComponent } from '@/lib/namedComponent';

import '../styles/globals.scss';
import 'react-image-crop/src/ReactCrop.scss';

import { SEO } from '../next-seo.config';

const NextProgress = dynamic(() => import('next-progress'));
const Layout = dynamic(() => namedComponent(import('@/components/layout/Layout'), 'Layout'));

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState; initialSession: Session }>) {
  const queryOptions: QueryClientConfig = {
    defaultOptions: {
      queries: {
        retry: 2,
      },
    },
  };
  const [queryClient] = useState(() => new QueryClient(queryOptions));
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <MotionConfig reducedMotion='user'>
          <NextProgress options={{ showSpinner: false }} height={4} color='#05daa5' delay={500} />
          <Hydrate state={pageProps.dehydratedState}>
            <DefaultSeo {...SEO} />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Hydrate>
        </MotionConfig>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
