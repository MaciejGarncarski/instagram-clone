import { profiles } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { supabase } from '@/lib/supabase';

export const useUser = () => {
  const sessionUser = supabase.auth.user();
  const router = useRouter();

  const getProfile: () => Promise<profiles> = async () => {
    const response = await axios.post('/api/profiles/getProfile', {
      id: sessionUser?.id,
    });
    return response.data;
  };

  const profile = useQuery(['profile'], getProfile);

  useEffect(() => {
    if (profile.data?.username === null) {
      router.push('/account/edit');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.data?.username]);

  return { user: sessionUser, ...profile };
};
