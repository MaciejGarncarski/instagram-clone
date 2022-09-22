import { profiles } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useProfile = () => {
  const { user } = useUser();

  const profile = useQuery<profiles | undefined>(
    ['profile'],
    async () => {
      const { data } = await axios.post('/api/profiles/getProfile', {
        id: user?.id,
      });

      return data;
    },
    { enabled: Boolean(user?.id) }
  );

  return { user, ...profile };
};
