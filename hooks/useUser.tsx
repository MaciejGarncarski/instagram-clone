import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { supabase } from '@/lib/supabase';

export const getProfile = async (id: string | undefined) => {
  const response = await axios.post('/api/profiles/getProfile', {
    id: id,
  });
  return response.data;
};

export const useUser = () => {
  const sessionUser = supabase.auth.user();
  const router = useRouter();

  const profile = useQuery(['profile'], () => getProfile(sessionUser?.id));

  useEffect(() => {
    if (profile.data?.username === null) {
      router.push('/account/edit');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.data?.username]);

  return { user: sessionUser, ...profile };
};
