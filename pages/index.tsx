import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { NextPage } from 'next';

import { getPosts } from '@/lib/getPosts';
import { getPostsCount } from '@/lib/getPostsCount';

import { HomePage } from '@/components/pages/homePage/HomePage';

const Home: NextPage = () => {
  return <HomePage />;
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery(['posts'], () => getPosts(0));
  await queryClient.fetchQuery(['posts count'], getPostsCount);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};

export default Home;
