import { posts, Prisma, profiles } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getInfiniteData, POSTS_DATA_URL } from '@/lib/getInfiniteData';

export type Post = posts & {
  author: profiles;
  _count: {
    posts_likes: number;
    posts_comments: number;
  };
};

export type Posts = {
  posts: Array<Post>;
  postsCount: Prisma.GetPostsAggregateType<{
    _count: {
      id: true;
    };
  }>;
};

export const POST_PER_SCROLL = 4;

export const useGetPosts = () => {
  return useInfiniteQuery(
    ['homepage posts'],
    ({ pageParam = 0 }) =>
      getInfiniteData<Posts>({ url: POSTS_DATA_URL, pageParam, perScroll: POST_PER_SCROLL }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (prevPosts, allPosts) => {
        const postCount = prevPosts.postsCount._count.id;

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
