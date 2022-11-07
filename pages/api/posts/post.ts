import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

const handler = withApiAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body: { description, location, postID },
  } = req;

  if (method === 'PATCH') {
    try {
      await prisma.posts.update({
        where: {
          id: postID,
        },
        data: {
          description,
          location,
        },
      });
      res.status(200).send('200');
    } catch (e) {
      res.status(400).send('400');
    }
  }
});

export default handler;
