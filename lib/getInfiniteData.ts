import { apiClient } from '@/lib/apiClient';

type GetInfiniteData = {
  pageParam: number;
  url: string;
  perScroll: number;
  additionalData?: Record<string, string | number>;
};

export const COMMENTS_DATA_URL = '/comments/getComments';
export const POSTS_DATA_URL = '/posts/getPosts';

export const getInfiniteData = async <T>({
  url,
  pageParam,
  perScroll,
  additionalData,
}: GetInfiniteData): Promise<T> => {
  const { data } = await apiClient.post(url, {
    skip: pageParam,
    take: perScroll,
    additionalData,
  });
  return data;
};
