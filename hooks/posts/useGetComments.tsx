import { posts_comments, profiles } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getInfiniteData } from '@/lib/getInfiniteData';

export type Comments = {
  comments: Array<
    posts_comments & {
      user: profiles;
    }
  >;
  commentsCount: {
    _count: {
      id: number;
    };
  };
};

export const COMMENTS_PER_SCROLL = 8;

export const useGetComments = (id: number) => {
  return useInfiniteQuery(
    ['comments', id],
    ({ pageParam = 0 }) =>
      getInfiniteData<Comments>({
        url: '/comments/getComments',
        pageParam,
        perScroll: COMMENTS_PER_SCROLL,
        additionalData: {
          post_id: id,
        },
      }),
    {
      getNextPageParam: (prevComment, allComments) => {
        const commentsCount = prevComment.commentsCount._count.id;
        if (!commentsCount) {
          return undefined;
        }
        if (commentsCount <= allComments.length * COMMENTS_PER_SCROLL) {
          return undefined;
        }

        return allComments.length * COMMENTS_PER_SCROLL;
      },
    }
  );
};
