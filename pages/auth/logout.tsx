import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Loader } from '@/components/atoms/loader/Loader';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await supabaseClient.auth.signOut();
      router.push('/');
    };
    logout();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader />;
};

export default Logout;
