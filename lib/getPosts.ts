import { apiClient } from '@/lib/apiClient';
import { Posts } from '@/hooks/posts/useGetPosts';

export const getPosts = async (pageParam: number): Promise<Posts> => {
  const { data } = await apiClient.post('/posts/getPosts', {
    skip: pageParam,
    take: 2,
  });
  return data;
};
