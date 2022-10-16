import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '@/lib/apiClient';
import { Posts } from '@/hooks/posts/useGetPosts';

const fetchPost = async (id: number): Promise<Posts> => {
  const { data } = await apiClient.post('/posts/getSinglePost', {
    id,
  });
  return data;
};

export const usePostData = (id: number) => {
  return useQuery<Posts, AxiosError>(['single post', id], () => fetchPost(id));
};
