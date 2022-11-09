import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetStaticProps } from 'next';

import { getCount, POSTS_COUNT_URL } from '@/lib/getCount';
import { getInfiniteData, POSTS_DATA_URL } from '@/lib/getInfiniteData';
import { POST_PER_SCROLL, Posts } from '@/hooks/posts/useGetPosts';
import { fetchSinglePost } from '@/hooks/posts/usePostData';

import { HomePage } from '@/components/pages/homePage/HomePage';

const Home = () => {
  return <HomePage />;
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const initialPosts = await getInfiniteData<Array<Posts>>({
    url: POSTS_DATA_URL,
    perScroll: POST_PER_SCROLL,
    pageParam: 0,
  });

  initialPosts.forEach(async (post) => {
    await queryClient.fetchQuery(['single post', post.id], () => fetchSinglePost(post.id));
  });

  await queryClient.fetchQuery(['posts'], () =>
    getInfiniteData({ url: POSTS_DATA_URL, pageParam: 0, perScroll: 20 })
  );
  await queryClient.fetchQuery(['posts count'], () => getCount(POSTS_COUNT_URL));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidate: 120,
    },
  };
};

export default Home;
