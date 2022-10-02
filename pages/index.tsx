import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { NextPage } from 'next';

import { getPosts } from '@/lib/getPosts';

import { HomePage } from '@/components/homePage/HomePage';

const Home: NextPage = () => {
  return <HomePage />;
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(['posts'], () => getPosts(0));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
