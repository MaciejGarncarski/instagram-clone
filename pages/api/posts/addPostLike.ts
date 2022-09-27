import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST requests allowed');
    return;
  }

  try {
    const likePost = await prisma.posts_likes.create({
      data: {
        user_id: req.body.user_id,
        post_id: req.body.post_id,
      },
    });
    res.status(200).send(likePost);
  } catch (e) {
    console.log('like', e);
    res.status(400).send('400');
  }
};

export default handler;
