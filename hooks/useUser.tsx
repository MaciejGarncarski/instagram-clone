import { profiles } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { supabase } from '@/lib/supabase';

export const useUser = () => {
  const sessionUser = supabase.auth.user();

  const getProfile: () => Promise<profiles> = async () => {
    const response = await axios.post('/api/profiles/getProfile', {
      id: sessionUser?.id,
    });
    return response.data;
  };

  const profile = useQuery(['profile'], getProfile);

  return { user: sessionUser, ...profile };
};
