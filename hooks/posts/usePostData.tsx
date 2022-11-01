import { posts_likes } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '@/lib/apiClient';
import { Posts } from '@/hooks/posts/useGetPosts';

export type SinglePostData = {
  post: Posts;
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
  return useQuery<SinglePostData, AxiosError>(['single post', id], () =>
    fetchSinglePost(id, user?.id)
  );
};
