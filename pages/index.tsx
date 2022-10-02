import type { NextPage } from 'next';

import { HomePage } from '@/components/homePage/HomePage';

const Home: NextPage = () => {
  const url = process.env.NEXT_PUBLIC_VERCEL_URL;
  console.log(url);

  return <HomePage />;
};

// export const getServerSideProps = async () => {
//   const queryClient = new QueryClient();
//   await queryClient.fetchQuery(['posts'], () => getPosts(0));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

export default Home;
