import { apiClient } from '@/lib/apiClient';

export const getPostsCount = async () => {
  const { data } = await apiClient.get('/posts/getPostsCount');
  return data;
};
