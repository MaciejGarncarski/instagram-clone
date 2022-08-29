import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { supabase } from '@/lib/supabase';

import { Loader } from '@/components/loader/Loader';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      router.push('/');
    };
    logout();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader text='logging out' />;
};

export default Logout;
