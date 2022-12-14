import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST requests allowed');
    return;
  }

  const { skip, take, additionalData } = req.body;

  try {
    const comments = await prisma.posts_comments.findMany({
      skip,
      take,
      where: {
        post_id: additionalData.post_id,
      },
      include: {
        user: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

    const commentsCount = await prisma.posts_comments.aggregate({
      where: {
        post_id: additionalData.post_id,
      },
      _count: {
        id: true,
      },
    });

    res.status(200).send({ comments, commentsCount });
  } catch (e) {
    res.status(400).send('400');
  }
};

export default handler;
