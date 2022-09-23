import { posts, profiles } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Profile = profiles & {
  posts: posts[];
  _count: {
    posts: number;
  };
};

export const useProfile = () => {
  const { user } = useUser();

  const profile = useQuery<Profile | undefined>(
    ['profile'],
    async () => {
      const { data } = await axios.post('/api/profiles/getProfile', {
        id: user?.id,
      });

      return data;
    },
    { enabled: Boolean(user?.id), refetchOnWindowFocus: false }
  );

  return { user, ...profile };
};
