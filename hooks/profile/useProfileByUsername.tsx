import { profiles } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';

export type Following = boolean | null;

type ProfileByUsername = {
  profile: profiles;
  isFollowing: Following;
  count: {
    following: number;
    followers: number;
    posts: number;
  };
};

export const useProfileByUsername = (username: string) => {
  const profile = useQuery<ProfileByUsername | undefined>(
    ['profile', { username }],
    async () => {
      const { data } = await apiClient.post('/accounts/getProfileByUsername', {
        username,
      });

      return data;
    },

    {
      enabled: username.trim() !== '',
    }
  );

  return { ...profile };
};
