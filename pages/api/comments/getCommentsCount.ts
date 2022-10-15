import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).send('Only GET requests allowed');
    return;
  }

  try {
    const postsCount = await prisma.posts_comments.aggregate({
      _count: {
        id: true,
      },
    });

    res.status(200).send(postsCount);
  } catch (e) {
    res.status(400).send('400');
  }
};

export default handler;
