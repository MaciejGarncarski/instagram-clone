import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetStaticProps } from 'next';

import { getInfiniteData, POSTS_DATA_URL } from '@/lib/getInfiniteData';
import { POST_PER_SCROLL, Posts } from '@/hooks/posts/useGetPosts';
import { fetchSinglePost } from '@/hooks/posts/usePostData';

import { HomePage } from '@/components/pages/homePage/HomePage';

const Home = () => {
  return <HomePage />;
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const initialPosts = await getInfiniteData<Posts>({
    url: POSTS_DATA_URL,
    perScroll: POST_PER_SCROLL,
    pageParam: 0,
  });

  if (initialPosts.posts) {
    initialPosts.posts.forEach(async (post) => {
      await queryClient.fetchQuery(['post', post.id], () => fetchSinglePost(post.id));
    });
  }

  await queryClient.fetchQuery(['homepage posts'], () =>
    getInfiniteData({ url: POSTS_DATA_URL, pageParam: 0, perScroll: 20 })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidate: 120,
    },
  };
};

export default Home;
