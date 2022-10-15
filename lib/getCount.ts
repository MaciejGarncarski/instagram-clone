import { apiClient } from '@/lib/apiClient';

export const COMMENTS_COUNT_URL = '/comments/getCommentsCount';
export const POSTS_COUNT_URL = '/posts/getPostsCount';

export const getCount = async (url: string) => {
  const { data } = await apiClient.get(url);
  return data;
};
