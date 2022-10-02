import { posts, Prisma, profiles } from '@prisma/client';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getPosts } from '@/lib/getPosts';
import { getPostsCount } from '@/lib/getPostsCount';

export type Posts = posts & {
  author: profiles;
};

export const useGetPosts = () => {
  const postsCount = useQuery<Prisma.AggregatePosts>(['posts count'], getPostsCount, {
    refetchOnWindowFocus: false,
  });

  return useInfiniteQuery(['posts'], ({ pageParam = 0 }) => getPosts(pageParam), {
    getNextPageParam: (oldPosts, allPosts) => {
      const postCount = postsCount.data?._count?.id;

      if (!postCount) {
        return undefined;
      }

      if (postCount <= allPosts.indexOf(oldPosts) + 1) {
        return undefined;
      }

      return allPosts.indexOf(oldPosts) + 1;
    },

    refetchOnWindowFocus: false,
  });
};
