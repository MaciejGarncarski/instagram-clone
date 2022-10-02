import { posts, posts_likes, profiles } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type Profile = profiles & {
  posts: posts[];
  posts_likes: posts_likes[];
  _count: {
    posts_likes: number;
    posts: number;
  };
};

export const useProfile = (userID?: string) => {
  const profile = useQuery<Profile | undefined>(
    ['profile', { id: userID }],
    async () => {
      const { data } = await axios.post('/api/profiles/getProfile', {
        id: userID,
      });

      return data;
    },
    {
      enabled: Boolean(userID),
      refetchOnWindowFocus: false,
    }
  );

  return { ...profile };
};
