import { posts, Prisma, profiles } from '@prisma/client';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getCount, POSTS_COUNT_URL } from '@/lib/getCount';
import { getInfiniteData, POSTS_DATA_URL } from '@/lib/getInfiniteData';

export type Posts = posts & {
  author: profiles;
  _count: {
    posts_likes: number;
    posts_comments: number;
  };
};

export const POST_PER_SCROLL = 5;

export const useGetPosts = () => {
  const postsCount = useQuery<Prisma.AggregatePosts>(['posts count'], () =>
    getCount(POSTS_COUNT_URL)
  );

  return useInfiniteQuery(
    ['posts'],
    ({ pageParam = 0 }) =>
      getInfiniteData<Posts>({ url: POSTS_DATA_URL, pageParam, perScroll: POST_PER_SCROLL }),
    {
      getNextPageParam: (_, allPosts) => {
        const postCount = postsCount.data?._count?.id;

        if (!postCount) {
          return undefined;
        }

        if (postCount <= allPosts.length * POST_PER_SCROLL) {
          return undefined;
        }

        return allPosts.length * POST_PER_SCROLL;
      },
    }
  );
};
