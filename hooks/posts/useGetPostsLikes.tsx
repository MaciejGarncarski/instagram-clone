import { posts_likes } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export type Likes = {
  likes: number;
  likesData: posts_likes | null;
};

export const useGetPostsLikes = (post_id: number) => {
  const { user } = useUser();

  const likes = useQuery<Likes | undefined, AxiosError>(
    ['post', { post_id: post_id }],
    async () => {
      const { data } = await axios.post('/api/posts/getLikes', { post_id, user_id: user?.id });
      return data;
    }
  );

  return { user, ...likes };
};
