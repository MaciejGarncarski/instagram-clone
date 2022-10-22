import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Loader } from '@/components/atoms/loader/Loader';

const Logout = () => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

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
