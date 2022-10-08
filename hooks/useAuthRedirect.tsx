import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuthRedirect = () => {
  const router = useRouter();
  const { user } = useUser();
  console.log(user?.id);
  useEffect(() => {
    if (user?.id) {
      return;
    }
    router.replace('/auth/login');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);
};
