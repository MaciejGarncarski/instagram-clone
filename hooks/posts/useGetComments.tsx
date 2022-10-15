import { posts_comments, Prisma, profiles } from '@prisma/client';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { COMMENTS_COUNT_URL, getCount } from '@/lib/getCount';
import { getInfiniteData } from '@/lib/getInfiniteData';

export type Comments = posts_comments & {
  user: profiles;
};

export const COMMENTS_PER_SCROLL = 8;

export const useGetComments = (id: number) => {
  const commentsCountData = useQuery<Prisma.AggregatePosts_comments>(['comments count'], () =>
    getCount(COMMENTS_COUNT_URL)
  );

  return useInfiniteQuery(
    ['comments', { post_id: id }],
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
      getNextPageParam: (_, allComments) => {
        const commentsCount = commentsCountData.data?._count?.id;

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
