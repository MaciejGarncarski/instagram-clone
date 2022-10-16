import { apiClient } from '@/lib/apiClient';

export const COMMENTS_COUNT_URL = '/comments/getCommentsCount';
export const POSTS_COUNT_URL = '/posts/getPostsCount';

export const getCount = async (url: string, id?: number) => {
  if (id) {
    const { data } = await apiClient.post(url, {
      id,
    });
    return data;
  }
  const { data } = await apiClient.post(url);
  return data;
};
