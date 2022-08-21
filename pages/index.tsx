import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div>
      <main>
        <h1>eloelo</h1>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = withPageAuth({ redirectTo: '/login' });
