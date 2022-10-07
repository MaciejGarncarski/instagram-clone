import { posts, Prisma, profiles } from '@prisma/client';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getPosts } from '@/lib/getPosts';
import { getPostsCount } from '@/lib/getPostsCount';

export type Posts = posts & {
  author: profiles;
};

export const useGetPosts = () => {
  const postsCount = useQuery<Prisma.AggregatePosts>(['posts count'], getPostsCount);

  return useInfiniteQuery(['posts'], ({ pageParam = 0 }) => getPosts(pageParam), {
    getNextPageParam: (oldPosts, allPosts) => {
      const postCount = postsCount.data?._count?.id;

      if (!postCount) {
        return undefined;
      }

      if (postCount <= allPosts.length * 2) {
        return undefined;
      }

      return allPosts.length * 2;
    },
  });
};
