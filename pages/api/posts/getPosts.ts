import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST requests allowed');
    return;
  }

  const { skip, take } = req.body;

  try {
    const posts = await prisma.posts.findMany({
      skip,
      take,

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

    res.status(200).send(posts);
  } catch (e) {
    res.status(400).send('400');
  }
};

export default handler;
