import { followers, posts, profiles } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';
import { Following } from '@/hooks/useProfileByUsername';

export type Profile = {
  profile: profiles & {
    posts: posts[];
    fromUser: followers[];
    toUser: followers[];
    _count: {
      posts: number;
      posts_likes: number;
      posts_comments: number;
      toUser: number;
      fromUser: number;
    };
  };
  isFollowing: Following;
};

export const useProfile = (userID?: string) => {
  const user = useUser();

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

  const profileData = profile.data?.profile;
  const isFollowing = profile.data?.isFollowing;

  return { ...profile, data: profileData, isFollowing };
};
