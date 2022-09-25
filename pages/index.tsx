import { dehydrate, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

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

  await queryClient.prefetchQuery(['posts'], async () => {
    const { data } = await axios.get('/api/posts/getPosts');
    return data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
