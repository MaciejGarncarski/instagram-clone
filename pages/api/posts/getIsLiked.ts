import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST requests allowed');
    return;
  }

  try {
    const likes = await prisma.posts_likes.findMany({
      where: {
        id: req.body.post_id,
        user_id: req.body.user_id,
      },
    });

    res.status(200).send(likes);
  } catch (e) {
    res.status(400).send('400');
  }
};

export default handler;
