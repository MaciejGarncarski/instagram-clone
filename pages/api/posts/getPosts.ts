import type { NextApiRequest, NextApiResponse } from 'next';

import { POST_PER_SCROLL } from '@/hooks/posts/useGetPosts';
import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { skip },
    method,
  } = req;

  const skipNumber = Number(skip);
  const takeNumber = POST_PER_SCROLL;

  if (method !== 'GET') {
    res.status(405).send('Only GET requests allowed');
    return;
  }

  try {
    const posts = await prisma.posts.findMany({
      skip: skipNumber * takeNumber,
      take: takeNumber,

      include: {
        author: true,
        _count: {
          select: {
            posts_likes: true,
            posts_comments: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    const { _count } = await prisma.posts.aggregate({
      _count: {
        id: true,
      },
    });

    const postsCount = _count.id;

    const canLoadMore = postsCount > (skipNumber + 1) * POST_PER_SCROLL;

    const nextCursor = canLoadMore ? skipNumber + 1 : null;

    res.status(200).send({ posts, postsCount, cursor: nextCursor });
  } catch (e) {
    res.status(400).send('400');
  }
};

export default handler;
