import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST requests allowed');
    return;
  }

  const { userID, postID } = req.body;

  try {
    const post = await prisma.posts.findFirst({
      where: {
        id: postID,
      },
      include: {
        author: true,
        _count: {
          select: {
            posts_likes: true,
            posts_comments: true,
          },
        },
      },
    });

    const likesData = await prisma.posts_likes.findFirst({
      where: {
        post_id: postID,
        user_id: userID,
      },
    });

    res.status(200).send({ post, likesData });
  } catch (e) {
    res.status(400).send('400');
  }
};

export default handler;
