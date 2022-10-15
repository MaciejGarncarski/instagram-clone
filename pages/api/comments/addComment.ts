import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    res.status(405).send('Only PUT requests allowed');
    return;
  }

  const { text, post_id, user_id } = req.body;

  try {
    await prisma.posts_comments.create({
      data: {
        comment_text: text,
        post_id,
        user_id,
      },
      select: {
        created_at: true,
        id: true,
      },
    });
    res.status(200).send('200');
  } catch (e) {
    res.status(400).send('400');
  }
});

export default handler;
