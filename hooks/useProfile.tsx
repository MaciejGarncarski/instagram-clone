import { useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getProfile = async (id: string | undefined) => {
  const { data } = await axios.post('/api/profiles/getProfile', {
    id,
  });

  if (!data) {
    return;
  }
  return data;
};

export const useProfile = () => {
  const { user } = useUser();
  const profile = useQuery(['profile'], () => getProfile(user?.id));

  return { user, ...profile };
};
