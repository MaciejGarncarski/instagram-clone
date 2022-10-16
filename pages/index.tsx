import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetStaticProps, NextPage } from 'next';

import { getCount, POSTS_COUNT_URL } from '@/lib/getCount';
import { getInfiniteData, POSTS_DATA_URL } from '@/lib/getInfiniteData';
import { POST_PER_SCROLL } from '@/hooks/posts/useGetPosts';

import { HomePage } from '@/components/pages/homePage/HomePage';

const Home: NextPage = () => {
  return <HomePage />;
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery(['posts'], () =>
    getInfiniteData({ url: POSTS_DATA_URL, pageParam: 0, perScroll: POST_PER_SCROLL })
  );
  await queryClient.fetchQuery(['posts count'], () => getCount(POSTS_COUNT_URL));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};

export default Home;
