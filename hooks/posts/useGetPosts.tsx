import { posts, profiles } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getPosts } from '@/lib/getPosts';

export type Posts = {
  post: posts & {
    author: profiles;
  };
  postsCount: {
    _count: { id: number };
  };
};

export const useGetPosts = () => {
  return useInfiniteQuery(['posts'], ({ pageParam = 0 }) => getPosts(pageParam), {
    getNextPageParam: (oldPosts, allPosts) => {
      const postCount = allPosts[0].postsCount._count.id;

      if (postCount <= allPosts.indexOf(oldPosts) + 1) {
        return undefined;
      }

      return allPosts.indexOf(oldPosts) + 1;
    },

    refetchOnWindowFocus: false,
  });
};
