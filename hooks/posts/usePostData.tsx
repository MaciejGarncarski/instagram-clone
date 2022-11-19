import { posts, posts_likes, profiles } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '@/lib/apiClient';

export type SinglePostData = {
  post: posts & {
    author: profiles;
    _count: {
      posts_likes: number;
      posts_comments: number;
    };
  };
  likesData: posts_likes;
};

export const fetchSinglePost = async (postID: number, userID?: string): Promise<SinglePostData> => {
  const { data } = await apiClient.post('/posts/getSinglePost', {
    postID,
    userID,
  });
  return data;
};

export const usePostData = (id: number) => {
  const user = useUser();
  return useQuery<SinglePostData, AxiosError>(['post', id], () => fetchSinglePost(id, user?.id));
};
