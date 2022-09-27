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

export default Home;
