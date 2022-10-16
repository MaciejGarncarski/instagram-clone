import { posts, Prisma, profiles } from '@prisma/client';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getCount, POSTS_COUNT_URL } from '@/lib/getCount';
import { getInfiniteData } from '@/lib/getInfiniteData';

export type Posts = posts & {
  author: profiles;
  _count: {
    posts_likes: number;
    posts_comments: number;
  };
};

const POSTS_PER_SCROLL = 9;

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
      getNextPageParam: (oldPosts, allPosts) => {
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
