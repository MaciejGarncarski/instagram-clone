import { posts, profiles } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';

export type Post = posts & {
  author: profiles;
  _count: {
    posts_likes: number;
    posts_comments: number;
  };
};

export type Posts = {
  posts: (posts & {
    _count: {
      posts_likes: number;
      posts_comments: number;
    };
    author: profiles;
  })[];
  postsCount: {
    _count: {
      id: number;
    };
  };
  cursor: number | null;
};

export const POST_PER_SCROLL = 4;

export const useGetPosts = () => {
  return useInfiniteQuery(
    ['homepage posts'],
    async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<Posts>(`/posts/getPosts?skip=${pageParam}`);
      return data;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (prevPosts) => {
        return prevPosts.cursor ?? undefined;
      },
    }
  );
};
