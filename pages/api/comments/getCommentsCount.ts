import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST requests allowed');
    return;
  }

  const { id } = req.body;

  try {
    const commentsCount = await prisma.posts_comments.aggregate({
      _count: {
        id: true,
      },
      where: {
        post_id: id,
      },
    });

    res.status(200).send(commentsCount);
  } catch (e) {
    res.status(400).send('400');
  }
};

export default handler;
