import { posts, posts_likes, profiles } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';

export type Profile = profiles & {
  posts: posts[];
  posts_likes: posts_likes[];
  _count: {
    posts: number;
    posts_likes: number;
    posts_comments: number;
  };
};

export const useProfile = (userID?: string) => {
  const user = useUser();
  console.log(user);

  const userIDguard = userID ?? user?.id;

  const profile = useQuery<Profile | undefined>(
    ['profile', { id: userIDguard }],
    async () => {
      const { data } = await apiClient.post('/accounts/getProfile', {
        id: userIDguard,
      });

      return data;
    },
    {
      enabled: Boolean(userIDguard),
    }
  );

  return { ...profile };
};
