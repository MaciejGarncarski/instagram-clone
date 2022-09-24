import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).send('Only GET requests allowed');
    return;
  }

  try {
    const posts = await prisma.posts.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        author: true,
      },
    });
    res.status(200).send(posts);
  } catch (e) {
    res.status(400).send('400');
  }
};

export default handler;
