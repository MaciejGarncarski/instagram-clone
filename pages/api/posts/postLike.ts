import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body: { user_id, post_id },
  } = req;

  if (method === 'POST') {
    try {
      const likePost = await prisma.posts_likes.create({
        data: {
          user_id: user_id,
          post_id: post_id,
        },
      });
      res.status(200).send(likePost);
    } catch (e) {
      res.status(400).send('400');
    }
  }

  if (method === 'PATCH') {
    try {
      const dislikePost = await prisma.posts_likes.deleteMany({
        where: {
          post_id,
          user_id,
        },
      });
      res.status(200).send(dislikePost);
    } catch (e) {
      res.status(400).send('400');
    }
  }
};

export default handler;
