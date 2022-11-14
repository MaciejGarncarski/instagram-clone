import { profiles } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';

export type Following = boolean | null;

type ProfileByUsername = {
  profile: profiles & {
    _count: {
      posts: number;
      fromUser: number;
      toUser: number;
    };
  };
  isFollowing: Following;
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
