import { useInfiniteQuery } from '@tanstack/react-query';

import { getInfiniteData } from '@/lib/getInfiniteData';
import { Posts } from '@/hooks/posts/useGetPosts';

const POSTS_PER_SCROLL = 7;

export const useAccountPosts = (id: string) => {
  return useInfiniteQuery(
    ['account posts', id],
    ({ pageParam = 0 }) =>
      getInfiniteData<Posts>({
        url: '/accounts/getUserPosts',
        pageParam,
        perScroll: POSTS_PER_SCROLL,
        additionalData: {
          id,
        },
      }),
    {
      getNextPageParam: (prevPosts, allPosts) => {
        const postCount = prevPosts.postsCount._count.id;

        if (!postCount) {
          return undefined;
        }

        if (postCount < allPosts.length * POSTS_PER_SCROLL) {
          return undefined;
        }

        return allPosts.length * POSTS_PER_SCROLL;
      },
    }
  );
};
