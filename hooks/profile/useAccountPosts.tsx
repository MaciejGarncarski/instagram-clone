import { Prisma } from '@prisma/client';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getCount, POSTS_COUNT_URL } from '@/lib/getCount';
import { getInfiniteData } from '@/lib/getInfiniteData';
import { Posts } from '@/hooks/posts/useGetPosts';

const POSTS_PER_SCROLL = 7;

export const useAccountPosts = (id: string) => {
  const postsCount = useQuery<Prisma.AggregatePosts>(['account posts count', { id: id }], () =>
    getCount(POSTS_COUNT_URL)
  );

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
      getNextPageParam: (_, allPosts) => {
        const postCount = postsCount.data?._count?.id;

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
