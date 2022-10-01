import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST requests allowed');
    return;
  }

  try {
    const dislikePost = await prisma.posts_likes.delete({
      where: {
        id: req.body.post_like_id,
      },
    });
    res.status(200).send(dislikePost);
  } catch (e) {
    res.status(400).send('400');
  }
};

export default handler;