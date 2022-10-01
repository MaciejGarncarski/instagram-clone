import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { getPosts } from '@/lib/getPosts';

import { HomePage } from '@/components/homePage/HomePage';

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title='Home' />
      <HomePage />
    </>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery(['posts'], () => getPosts(0));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
