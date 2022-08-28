import type { NextPage } from 'next';

import { supabase } from '@/lib/supabase';

const Home: NextPage = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <div>
      <main>
        {/* <Link href='api/auth/logout'>log out</Link> */}
        <button type='button' onClick={handleLogout}>
          logout
        </button>
        <h1>eloelo</h1>
      </main>
    </div>
  );
};

export default Home;
