import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST requests allowed');
    return;
  }

  const { post_id } = req.body;

  try {
    await prisma.posts_likes.deleteMany({
      where: {
        post: {
          id: post_id,
        },
      },
    });
    await prisma.posts.delete({
      where: {
        id: post_id,
      },
    });
    res.status(200).send('200');
  } catch (e) {
    console.log('post del', e);
    res.status(400).send('400');
  }
});

export default handler;
